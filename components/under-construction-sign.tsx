/**
 * The flat "under construction" sign, inlined so its lettering uses the loaded
 * Archivo Narrow face. Decorative: the drawn text is the label, the SVG carries
 * the same words for assistive tech. Colours stay fixed in both shifts.
 */
export function UnderConstructionSign({
  size,
  className = "",
}: {
  /** Base width in px; responsive overrides belong in `className`. */
  size: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Under construction"
      className={className}
      style={{ filter: "drop-shadow(4px 6px 0 rgb(43 38 32 / .25))" }}
    >
      <rect x="30" y="30" width="140" height="140" rx="14" transform="rotate(45 100 100)" fill="#2B2620" />
      <rect x="39" y="39" width="122" height="122" rx="9" transform="rotate(45 100 100)" fill="#D9A441" />
      <rect
        x="47"
        y="47"
        width="106"
        height="106"
        rx="5"
        transform="rotate(45 100 100)"
        fill="none"
        stroke="#2B2620"
        strokeWidth="2.5"
      />
      <g fill="#2B2620" fontFamily="'Archivo Narrow','Arial Narrow',Arial,sans-serif" fontWeight="700" textAnchor="middle">
        <text x="100" y="78" fontSize="22" textLength="76" lengthAdjust="spacingAndGlyphs">
          UNDER
        </text>
        <text x="100" y="94" fontSize="11" textLength="104" lengthAdjust="spacingAndGlyphs">
          CONSTRUCTION
        </text>
      </g>
      <g fill="#2B2620">
        <g transform="rotate(-45 100 130)">
          <rect x="97.5" y="112" width="5" height="36" rx="2" />
          <rect x="89" y="108" width="22" height="8" rx="2" />
        </g>
        <g transform="rotate(45 100 130)">
          <rect x="97.5" y="114" width="5" height="34" rx="2" />
          <circle cx="100" cy="112" r="8.5" />
          <rect x="96" y="102" width="8" height="9" fill="#D9A441" />
        </g>
        <circle cx="100" cy="58" r="2.2" />
        <circle cx="53" cy="100" r="2.2" />
        <circle cx="147" cy="100" r="2.2" />
      </g>
    </svg>
  );
}
