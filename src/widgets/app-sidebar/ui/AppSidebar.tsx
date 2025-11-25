"use client";
import { Header, Footer, Navigation, Channels } from "@/widgets/app-sidebar";
import { cn, useMediaQuery } from "@/shared/lib";
import { useState } from "react";

export default function AppSidebar() {
  const [isManuallyOpen, setIsManuallyOpen] = useState<boolean>(true);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const isOpen = isLargeScreen && isManuallyOpen;

  return (
    <aside
      className={cn(
        "bg-surface border-r border-border",
        "flex flex-col h-full  transition-all duration-200 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <Header isOpen={isOpen} setIsOpen={setIsManuallyOpen} />

      <div
        className={cn(
          "flex-1 overflow-y-auto space-y-6",
          isOpen ? "p-3" : "p-2"
        )}
      >
        <Navigation isOpen={isOpen} />

        <Channels isOpen={isOpen} />
      </div>

      <Footer />
    </aside>
  );
}
