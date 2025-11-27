import { cn } from "@/shared/lib";
import { AppSidebar } from "@/widgets/app-sidebar";
import { AppTopBar } from "@/widgets/app-topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("h-screen flex bg-background overflow-hidden")}>
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <AppTopBar />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
