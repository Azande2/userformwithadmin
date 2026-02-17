import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { UserHomePage } from '@/components/user-home-page';

export default async function HomePage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect('/login');
  }
  return (
    <>
      <SiteHeader role={session.role === 'admin' ? 'admin' : 'user'} />
      <UserHomePage />
    </>
  );
}