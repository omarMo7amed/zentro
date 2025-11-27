import { ReactNode } from "react";

export default function Actions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
