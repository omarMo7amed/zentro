import { Loader2 } from "lucide-react";

export const Loading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader2 className="animate-spin text-primary" size={16} />
      <p className="text-sm text-text-secondary ml-2">{children}</p>
    </div>
  );
};
