/**
 * Signature brand background: dot-grid texture + faint terracotta arcs
 * curving in from the edges. Fixed behind every page.
 */
export function BrandBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="dot-grid absolute inset-0" />

      {/* Top-right arcs */}
      <svg
        className="absolute -right-[28vw] -top-[38vw] h-auto w-[90vw] text-terracotta opacity-[0.09] md:-right-[18vw] md:-top-[30vw] md:w-[64vw]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="398" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="330" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="262" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="194" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Bottom-left arcs */}
      <svg
        className="absolute -bottom-[40vw] -left-[30vw] h-auto w-[90vw] text-terracotta opacity-[0.07] md:-bottom-[28vw] md:-left-[16vw] md:w-[58vw]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="398" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="318" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="238" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
