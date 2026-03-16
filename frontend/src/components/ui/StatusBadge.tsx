interface StatusBadgeProps {
  readonly status: "Processed" | "Processing" | "Failed";
}

const styles = {
  Processed: {
    container: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    animate: false,
  },
  Processing: {
    container: "bg-primary/20 text-primary",
    dot: "bg-primary",
    animate: true,
  },
  Failed: {
    container: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    animate: false,
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = styles[status];
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.container}`}
    >
      <span
        className={`size-1.5 rounded-full ${style.dot} ${style.animate ? "animate-pulse" : ""}`}
      />
      {status}
    </div>
  );
}
