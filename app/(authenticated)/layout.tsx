import { DashboardLayout } from "@/app/components/dashboard/DashboardLayout";

export default function Layout({ children }: LayoutProps<"/">) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
