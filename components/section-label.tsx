export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {index} · {children}
    </p>
  );
}
