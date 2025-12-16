export const AVATAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-lime-200",
  "bg-lime-400",
  "bg-lime-600",
  "bg-lime-800",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-fuchsia-200",
  "bg-fuchsia-400",
  "bg-fuchsia-600",
  "bg-fuchsia-800",
  "bg-pink-500",
  "bg-pink-200",
  "bg-pink-400",
  "bg-pink-600",
  "bg-pink-800",
  "bg-rose-500",
  "bg-rose-200",
  "bg-rose-400",
  "bg-rose-600",
  "bg-rose-800",
];

export function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}
