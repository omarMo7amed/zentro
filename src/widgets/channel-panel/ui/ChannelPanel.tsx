import { cn } from "@/shared/lib";
import { FileText, Image, Link, Users } from "lucide-react";

export default function ChannelPanel({
  showPanel = true,
}: {
  showPanel?: boolean;
}) {
  if (!showPanel) return null;

  const members = [
    { name: "Sarah Chen", role: "Designer", status: "online" },
    { name: "Mike Ross", role: "Frontend Dev", status: "away" },
    { name: "Emma Wilson", role: "Backend Dev", status: "online" },
    { name: "You", role: "Full Stack", status: "online" },
  ];

  const files = [
    { name: "design-system.pdf", type: "pdf", size: "2.4 MB" },
    { name: "mockups.fig", type: "figma", size: "5.1 MB" },
    { name: "screenshot.png", type: "image", size: "1.2 MB" },
  ];

  return (
    <aside
      className={cn(
        "w-80 bg-surface border-l border-border",
        "flex flex-col h-full"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-text-primary">Channel Details</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* About Section */}
        <div className="p-4 border-b border-border space-y-2">
          <h3 className="text-xs font-semibold text-text-muted uppercase">
            About
          </h3>
          <p className="text-sm text-text-secondary">
            Development team collaboration channel. Share updates, ask
            questions, and coordinate on projects.
          </p>
        </div>

        {/* Members Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-text-muted" />
              <h3 className="text-xs font-semibold text-text-muted uppercase">
                Members
              </h3>
            </div>
            <span className="text-xs text-text-muted">{members.length}</span>
          </div>
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.name}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md",
                  "hover:bg-surface-hover transition-colors cursor-pointer"
                )}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500" />
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface",
                      member.status === "online" && "bg-green-500",
                      member.status === "away" && "bg-yellow-500"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Files */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-text-muted uppercase">
              Shared Files
            </h3>
            <span className="text-xs text-text-muted">{files.length}</span>
          </div>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md",
                  "hover:bg-surface-hover transition-colors cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-md",
                    "bg-background-elevated",
                    "flex items-center justify-center"
                  )}
                >
                  {file.type === "pdf" && (
                    <FileText className="w-5 h-5 text-red-500" />
                  )}
                  {file.type === "figma" && (
                    <Link className="w-5 h-5 text-purple-500" />
                  )}
                  {file.type === "image" && (
                    <Image className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-muted">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
