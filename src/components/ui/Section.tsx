import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  alt?: boolean; // alternate background
}

export default function Section({ children, className, id, alt }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 px-5",
        alt ? "bg-slate-50 dark:bg-slate-800/40" : "bg-white dark:bg-slate-900",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
