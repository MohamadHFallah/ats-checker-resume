import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/app/components/dashboard/DashboardLayout';
import { DashboardFooter } from '@/app/components/dashboard/DashboardFooter';
import { auth } from '@/lib/auth';

export default async function Layout({ children }: LayoutProps<'/'>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/');

  return (
    <DashboardLayout>
      {children}
      <DashboardFooter />
    </DashboardLayout>
  );
}
