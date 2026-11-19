import { DashboardLayout } from '@/app/components/dashboard/DashboardLayout';
import { DashboardFooter } from '@/app/components/dashboard/DashboardFooter';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DashboardLayout>
      {children}
      <DashboardFooter />
    </DashboardLayout>
  );
}
