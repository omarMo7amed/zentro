import { cn } from "@/shared/lib";

export default function HeroSection() {
  return (
    <section
      className={cn("flex min-h-screen items-center justify-center px-8 py-20")}
    >
      <div className={cn("max-w-6xl w-full text-center space-y-8")}>
        <h1
          className={cn(
            "text-6xl md:text-7xl font-bold tracking-tight",
            "font-logo"
          )}
        >
          <span className={cn("gradient-text")}>Zentro</span>
        </h1>
        <p
          className={cn(
            "text-xl md:text-2xl max-w-3xl mx-auto",
            "text-foreground"
          )}
        >
          The future of team communication. Chat, video calls, and AI-powered
          collaboration in one beautiful platform.
        </p>
        <div className={cn("flex gap-4 justify-center pt-4")}>
          {/* Add buttons here */}
        </div>
      </div>
    </section>
  );
}
