/**
 * The mono uppercase label above a section heading.
 *
 * Replaces the old numbered rail ("01".."04" in a 3rem gutter). The
 * numbers collided with the 01–04 step numbering inside "How it works"
 * — two unrelated sequences counting at once — and a number never told
 * anyone what the section was. A word does.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </p>
  );
}
