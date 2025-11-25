import { cn } from "@/shared/lib";
import { Phone, Video, Clock, Calendar, PlayCircle } from "lucide-react";

export default function HistoryPage() {
  const calls = [
    {
      id: 1,
      type: "video",
      title: "Team Standup",
      participants: ["Sarah Chen", "Mike Ross"],
      date: "Today, 10:30 AM",
      duration: "15 min",
      hasRecording: true,
    },
    {
      id: 2,
      type: "voice",
      title: "Quick Check-in",
      participants: ["Emma Wilson"],
      date: "Yesterday, 3:45 PM",
      duration: "8 min",
      hasRecording: false,
    },
    {
      id: 3,
      type: "video",
      title: "Client Meeting",
      participants: ["Sarah Chen", "Mike Ross", "Alex Johnson"],
      date: "Nov 23, 2:00 PM",
      duration: "45 min",
      hasRecording: true,
    },
    {
      id: 4,
      type: "voice",
      title: "Design Discussion",
      participants: ["Mike Ross"],
      date: "Nov 22, 11:20 AM",
      duration: "22 min",
      hasRecording: false,
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">Call History</h1>
          <p className="text-text-secondary">
            Review your past calls and access recordings
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <FilterButton active>All</FilterButton>
          <FilterButton>Video</FilterButton>
          <FilterButton>Voice</FilterButton>
          <FilterButton>Recorded</FilterButton>
        </div>

        {/* Call List */}
        <div className="space-y-3">
          {calls.map((call) => (
            <CallCard key={call.id} call={call} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-primary text-white"
          : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      )}
    >
      {children}
    </button>
  );
}

function CallCard({
  call,
}: {
  call: {
    type: string;
    title: string;
    participants: string[];
    date: string;
    duration: string;
    hasRecording: boolean;
  };
}) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-lg p-4",
        "hover:border-primary/50 transition-colors cursor-pointer"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
            call.type === "video"
              ? "bg-blue-500/10 text-blue-500"
              : "bg-green-500/10 text-green-500"
          )}
        >
          {call.type === "video" ? (
            <Video className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </div>

        {/* Call Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">{call.title}</h3>
            {call.hasRecording && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                Recorded
              </span>
            )}
          </div>
          <p className="text-sm text-text-muted mt-1">
            {call.participants.join(", ")}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{call.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{call.duration}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {call.hasRecording && (
          <button
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-primary hover:bg-primary/90",
              "text-white text-sm font-medium",
              "transition-colors flex items-center gap-2"
            )}
          >
            <PlayCircle className="w-4 h-4" />
            Play
          </button>
        )}
      </div>
    </div>
  );
}
