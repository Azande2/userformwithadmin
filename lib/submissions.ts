import { kv } from '@vercel/kv';
import type { Submission } from './types';

const SUBMISSIONS_KEY = 'submissions:ids'; // sorted set of submission IDs by timestamp

// Helper to get all submissions from KV
async function getAllSubmissions(): Promise<Submission[]> {
  const ids = await kv.zrange(SUBMISSIONS_KEY, 0, -1, { rev: true });
  // ids is string[] (or unknown[]) – cast it safely
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  if (!idsArray.length) return [];

  const submissions = await Promise.all(
    idsArray.map(async (id) => {
      const data = await kv.get(`submission:${id}`);
      return data as Submission | null;
    })
  );

  return submissions.filter((s): s is Submission => s !== null);
}

// Initialize – no persistent in‑memory array needed.

export async function getSubmissions(): Promise<Submission[]> {
  return getAllSubmissions();
}

export async function addSubmission(submission: Submission): Promise<void> {
  const newSubmission = {
    ...submission,
    isRead: false, // new submissions start as unread
  };

  // Store submission data
  await kv.set(`submission:${submission.id}`, newSubmission);

  // Add ID to sorted set with timestamp as score
  await kv.zadd(SUBMISSIONS_KEY, {
    score: new Date(submission.submittedAt).getTime(),
    member: submission.id,
  });

  console.log(`🔔 New submission from ${submission.submittedBy}: ${submission.formTitle}`);
}

export async function getSubmissionById(id: string): Promise<Submission | undefined> {
  const data = await kv.get(`submission:${id}`);
  return data as Submission | undefined;
}

export async function getSubmissionsByType(formType: string): Promise<Submission[]> {
  const all = await getAllSubmissions();
  return all
    .filter((s) => s.formType === formType)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function getDefectSubmissions(): Promise<Submission[]> {
  const all = await getAllSubmissions();
  return all
    .filter((s) => s.hasDefects)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function markAsRead(id: string): Promise<void> {
  const submission = await getSubmissionById(id);
  if (submission && !submission.isRead) {
    submission.isRead = true;
    submission.viewedAt = new Date().toISOString();
    await kv.set(`submission:${id}`, submission);
  }
}

export async function markMultipleAsRead(ids: string[]): Promise<void> {
  const pipeline = kv.pipeline(); // use pipeline for efficiency
  for (const id of ids) {
    const submission = await getSubmissionById(id);
    if (submission && !submission.isRead) {
      submission.isRead = true;
      submission.viewedAt = new Date().toISOString();
      pipeline.set(`submission:${id}`, submission);
    }
  }
  await pipeline.exec();
}

export async function getUnreadCount(): Promise<number> {
  const all = await getAllSubmissions();
  return all.filter((s) => !s.isRead).length;
}

export async function getUnreadSubmissions(): Promise<Submission[]> {
  const all = await getAllSubmissions();
  return all
    .filter((s) => !s.isRead)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function getFilteredSubmissions(options?: {
  formType?: string;
  hasDefects?: boolean;
  unreadOnly?: boolean;
  search?: string;
}): Promise<Submission[]> {
  let filtered = await getAllSubmissions();

  if (options?.formType && options.formType !== 'all') {
    filtered = filtered.filter((s) => s.formType === options.formType);
  }

  if (options?.hasDefects !== undefined) {
    filtered = filtered.filter((s) => s.hasDefects === options.hasDefects);
  }

  if (options?.unreadOnly) {
    filtered = filtered.filter((s) => !s.isRead);
  }

  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.submittedBy.toLowerCase().includes(searchLower) ||
        s.formTitle.toLowerCase().includes(searchLower) ||
        s.formType.toLowerCase().includes(searchLower)
    );
  }

  return filtered.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function getTodaysSubmissions(): Promise<Submission[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const ids = await kv.zrange(SUBMISSIONS_KEY, today.getTime(), tomorrow.getTime() - 1, {
    byScore: true,
  });
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  if (!idsArray.length) return [];

  const submissions = await Promise.all(
    idsArray.map(async (id) => {
      const data = await kv.get(`submission:${id}`);
      return data as Submission | null;
    })
  );
  return submissions.filter((s): s is Submission => s !== null);
}

export async function getWeeklySubmissions(): Promise<Submission[]> {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const now = Date.now();

  const ids = await kv.zrange(SUBMISSIONS_KEY, weekAgo.getTime(), now, { byScore: true });
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  if (!idsArray.length) return [];

  const submissions = await Promise.all(
    idsArray.map(async (id) => {
      const data = await kv.get(`submission:${id}`);
      return data as Submission | null;
    })
  );
  return submissions.filter((s): s is Submission => s !== null);
}

export async function getMonthlySubmissions(): Promise<Submission[]> {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const now = Date.now();

  const ids = await kv.zrange(SUBMISSIONS_KEY, monthAgo.getTime(), now, { byScore: true });
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  if (!idsArray.length) return [];

  const submissions = await Promise.all(
    idsArray.map(async (id) => {
      const data = await kv.get(`submission:${id}`);
      return data as Submission | null;
    })
  );
  return submissions.filter((s): s is Submission => s !== null);
}

export async function getSubmissionStats(): Promise<{
  total: number;
  unread: number;
  withDefects: number;
  clean: number;
  today: number;
  weekly: number;
  monthly: number;
  byType: Record<string, number>;
}> {
  const all = await getAllSubmissions();
  const today = await getTodaysSubmissions();
  const weekly = await getWeeklySubmissions();
  const monthly = await getMonthlySubmissions();
  const unread = all.filter((s) => !s.isRead).length;
  const withDefects = all.filter((s) => s.hasDefects).length;
  const clean = all.filter((s) => !s.hasDefects).length;

  const byType = all.reduce((acc, s) => {
    acc[s.formType] = (acc[s.formType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: all.length,
    unread,
    withDefects,
    clean,
    today: today.length,
    weekly: weekly.length,
    monthly: monthly.length,
    byType,
  };
}

export async function clearSubmissions(): Promise<void> {
  const ids = await kv.zrange(SUBMISSIONS_KEY, 0, -1);
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  const pipeline = kv.pipeline();
  for (const id of idsArray) {
    pipeline.del(`submission:${id}`);
  }
  pipeline.del(SUBMISSIONS_KEY);
  await pipeline.exec();
  console.log('🧹 All submissions cleared');
}

export async function refreshSubmissions(): Promise<void> {
  // No‑op: KV always gives latest data.
  return;
}

export async function getSubmissionsCount(): Promise<number> {
  return await kv.zcard(SUBMISSIONS_KEY);
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const existed = await kv.del(`submission:${id}`);
  await kv.zrem(SUBMISSIONS_KEY, id);
  if (existed) {
    console.log(`🗑️ Deleted submission: ${id}`);
    return true;
  }
  return false;
}

export async function updateSubmission(
  id: string,
  data: Partial<Submission>
): Promise<Submission | null> {
  const submission = await getSubmissionById(id);
  if (submission) {
    Object.assign(submission, data);
    await kv.set(`submission:${id}`, submission);
    console.log(`📝 Updated submission: ${id}`);
    return submission;
  }
  return null;
}

export async function getSubmissionsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<Submission[]> {
  const ids = await kv.zrange(SUBMISSIONS_KEY, startDate.getTime(), endDate.getTime(), {
    byScore: true,
  });
  const idsArray = (ids as string[]).filter(id => typeof id === 'string');
  if (!idsArray.length) return [];

  const submissions = await Promise.all(
    idsArray.map(async (id) => {
      const data = await kv.get(`submission:${id}`);
      return data as Submission | null;
    })
  );
  return submissions.filter((s): s is Submission => s !== null);
}

export async function addMultipleSubmissions(newSubmissions: Submission[]): Promise<void> {
  const pipeline = kv.pipeline();
  for (const sub of newSubmissions) {
    const newSub = { ...sub, isRead: false };
    pipeline.set(`submission:${sub.id}`, newSub);
    pipeline.zadd(SUBMISSIONS_KEY, {
      score: new Date(sub.submittedAt).getTime(),
      member: sub.id,
    });
  }
  await pipeline.exec();
  console.log(`📦 Added ${newSubmissions.length} submissions`);
}