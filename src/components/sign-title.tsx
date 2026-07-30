export function SignTitle({
  title,
  label,
  kana = false,
}: {
  title: React.ReactNode;
  label?: string;
  kana?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="relative isolate block max-w-full px-5 py-2">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-2 -z-10 h-5 -rotate-1 rounded-sm bg-accent"
        />
        <span
          className={
            kana
              ? "font-kana text-6xl leading-none text-ink sm:text-7xl"
              : "block text-4xl font-semibold leading-[1.05] text-ink text-balance sm:text-5xl"
          }
        >
          {title}
        </span>
      </span>
      {label && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </span>
      )}
    </div>
  );
}
