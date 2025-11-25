import { cn } from "@/shared/lib";
import { User, Bell, Video, Mic, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Section */}
        <SettingSection
          icon={User}
          title="Profile"
          description="Update your personal information"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="You"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-surface border border-border",
                  "text-text-primary",
                  "focus:border-primary focus:outline-none"
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="you@example.com"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-surface border border-border",
                  "text-text-primary",
                  "focus:border-primary focus:outline-none"
                )}
              />
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          icon={Bell}
          title="Notifications"
          description="Control how you receive notifications"
        >
          <div className="space-y-3">
            <ToggleOption label="Desktop notifications" defaultChecked />
            <ToggleOption label="Sound for messages" defaultChecked />
            <ToggleOption label="Email notifications" />
          </div>
        </SettingSection>

        {/* Audio & Video */}
        <SettingSection
          icon={Video}
          title="Audio & Video"
          description="Configure your call settings"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Microphone
                </div>
              </label>
              <select
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-surface border border-border",
                  "text-text-primary",
                  "focus:border-primary focus:outline-none"
                )}
              >
                <option>Default Microphone</option>
                <option>Built-in Microphone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Camera
                </div>
              </label>
              <select
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-surface border border-border",
                  "text-text-primary",
                  "focus:border-primary focus:outline-none"
                )}
              >
                <option>Default Camera</option>
                <option>Built-in Camera</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className={cn(
              "px-6 py-2.5 rounded-lg",
              "bg-primary hover:bg-primary/90",
              "text-white font-medium",
              "transition-colors"
            )}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof User;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-lg p-6",
        "space-y-4"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-background-elevated rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-muted mt-1">{description}</p>
        </div>
      </div>
      <div className="pl-12">{children}</div>
    </div>
  );
}

function ToggleOption({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-text-primary">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-5 h-5 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
      />
    </label>
  );
}
