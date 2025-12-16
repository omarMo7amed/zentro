import { format, isToday, isYesterday, isSameDay } from "date-fns";

export function formatMessageTime(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return format(date, "h:mm a");
}

export function formatChatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "MM/dd/yyyy");
}

export function isSameDayDate(
  dateString1: string,
  dateString2: string
): boolean {
  if (!dateString1 || !dateString2) return false;

  const d1 = new Date(dateString1);
  const d2 = new Date(dateString2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return isSameDay(d1, d2);
}

// -----------------------------
// Date Divider between messages
// - Today → "Today"
// - Yesterday → "Yesterday"
// - Otherwise → "Wednesday, December 4"
// -----------------------------
export function formatDateDivider(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  // Example: Wednesday, December 4
  return format(date, "EEEE, MMMM d");
}
