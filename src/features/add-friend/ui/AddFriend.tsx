import { cn } from "@/shared/lib";
import { Plus } from "lucide-react";

export default function AddFriend() {
  return (
    <div className="p-5 flex justify-end w-full">
      <button
        className={cn(
          "p-2 rounded-lg",
          "bg-primary hover:bg-primary/90",
          "text-white",
          "transition-colors"
        )}
        title="add-friend"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
