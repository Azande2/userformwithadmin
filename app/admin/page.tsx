import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { AdminDashboard } from "@/components/admin-dashboard";
import { SiteHeader } from "@/components/site-header";
import { getSubmissions } from '@/lib/submissions';
import type { Submission } from '@/lib/types';

export const metadata = {
  title: "Admin Dashboard | Ringomode HSE",
  description: "Review and manage HSE inspection submissions.",
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== 'admin') {
    redirect('/');
  }

  // Fetch submissions server-side
  let submissions: Submission[] = [];
  try {
    submissions = await getSubmissions();
    if (!Array.isArray(submissions)) submissions = [];
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    submissions = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="admin" />
      <AdminDashboard initialSubmissions={submissions} />
    </div>
  );
}