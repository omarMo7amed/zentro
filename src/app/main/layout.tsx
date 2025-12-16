import { cn } from "@/shared/lib";
import { SocketContextProvider } from "@/shared/providers/useSocket";
import { CallProvider, CallDemo } from "@/features/video-call";
import { AppSidebar } from "@/widgets/app-sidebar";
import { AppTopBar } from "@/widgets/app-topbar";
import CallModal from "@/features/video-call/ui/CallModal";

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

        <main className="flex-1 overflow-y-auto">
          <SocketContextProvider>
            <CallProvider>
              {children}
              <CallModal type="incoming" />
              <CallModal type="outgoing" />
              {/* Demo button - remove in production */}
              <CallDemo />
            </CallProvider>
          </SocketContextProvider>
        </main>
      </div>
    </div>
  );
}
