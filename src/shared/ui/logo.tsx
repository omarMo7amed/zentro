export function ZentroLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        }}
      >
        <span
          className="text-2xl font-bold"
          style={{
            color: "var(--color-primary-foreground)",
            fontFamily: "var(--font-orbitron)",
          }}
        >
          Z
        </span>
      </div>
      <span
        className="text-2xl font-bold tracking-tight"
        style={{
          fontFamily: "var(--font-orbitron)",
          color: "var(--color-text-primary)",
        }}
      >
        Zentro
      </span>
    </div>
  );
}
