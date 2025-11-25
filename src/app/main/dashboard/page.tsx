import { cn } from "@/shared/lib";
import {
  FileText,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Download,
} from "lucide-react";

export default function DashboardPage() {
  const meetings = [
    {
      id: 1,
      title: "Design Review - Q4 2024",
      date: "Nov 20, 2024",
      duration: "45 min",
      participants: ["Sarah", "Mike", "Emma"],
      status: "completed",
    },
    {
      id: 2,
      title: "Sprint Planning Meeting",
      date: "Nov 22, 2024",
      duration: "1h 15min",
      participants: ["Sarah", "Mike", "Emma", "You"],
      status: "completed",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "Nov 24, 2024",
      duration: "30 min",
      participants: ["Mike", "You"],
      status: "completed",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">
            Meeting Transcripts
          </h1>
          <p className="text-text-secondary">
            Review past meetings and generate AI summaries
          </p>
        </div>

        {/* Meeting List */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MeetingCard({
  meeting,
}: {
  meeting: {
    title: string;
    date: string;
    duration: string;
    participants: string[];
    status: string;
  };
}) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-lg p-6",
        "hover:border-primary/50 transition-colors"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-background-elevated rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {meeting.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meeting.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{meeting.participants.length} participants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 ml-11">
            {meeting.participants.map((name, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-xs font-medium text-white flex items-center justify-center"
              >
                {name[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-primary hover:bg-primary/90",
              "text-white text-sm font-medium",
              "transition-colors flex items-center gap-2"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Generate Summary
          </button>
          <button
            className={cn(
              "p-2 rounded-lg",
              "border border-border hover:bg-surface-hover",
              "text-text-muted hover:text-text-primary",
              "transition-colors"
            )}
            aria-label="Download transcript"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
