import { DashboardLayout } from "@/app/components/dashboard/DashboardLayout";

export default function Layout({ children }: LayoutProps<"/dashboard">) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
