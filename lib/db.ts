import fs from 'fs';
import path from 'path';
import type { Submission } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'submissions.json');

// Ensure data directory exists
export function ensureDbDirectory() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read submissions from file
export function readSubmissions(): Submission[] {
  try {
    ensureDbDirectory();
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

// Write submissions to file
export function writeSubmissions(submissions: Submission[]): void {
  try {
    ensureDbDirectory();
    fs.writeFileSync(DB_PATH, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error writing submissions:', error);
  }
}

// Add submission
export function saveSubmission(submission: Submission): void {
  const submissions = readSubmissions();
  submissions.push({ ...submission, isRead: false });
  writeSubmissions(submissions);
}

// Get all submissions
export function getAllSubmissions(): Submission[] {
  return readSubmissions().sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

// Get submission by ID
export function getSubmission(id: string): Submission | undefined {
  const submissions = readSubmissions();
  return submissions.find(s => s.id === id);
}

// Update submission
export function updateSubmission(id: string, updates: Partial<Submission>): void {
  const submissions = readSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...updates };
    writeSubmissions(submissions);
  }
}

// Mark as read
export function markSubmissionAsRead(id: string): void {
  const submissions = readSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index !== -1) {
    submissions[index].isRead = true;
    submissions[index].viewedAt = new Date().toISOString();
    writeSubmissions(submissions);
  }
}

// Get unread count
export function getUnreadCount(): number {
  const submissions = readSubmissions();
  return submissions.filter(s => !s.isRead).length;
}