type TextureVariant = "arcs" | "grid" | "waves" | "field";
type TextureTone = "paper" | "night";

type TextureProps = {
  variant?: TextureVariant;
  tone?: TextureTone;
  label?: string;
  className?: string;
};

const palettes: Record<TextureTone, { bg: string; stroke: string; accent: string }> = {
  paper: { bg: "#DCD8CD", stroke: "#101A1F", accent: "#8A5A32" },
  night: { bg: "#17252B", stroke: "#E8E6DE", accent: "#C08B57" },
};

function Pattern({ variant, stroke, accent }: { variant: TextureVariant; stroke: string; accent: string }) {
  if (variant === "grid") {
    const lines = Array.from({ length: 21 }, (_, i) => i * 20);
    return (
      <g stroke={stroke} strokeWidth="0.6" opacity="0.5">
        {lines.map((n) => (
          <line key={`v${n}`} x1={n} y1="0" x2={n} y2="500" />
        ))}
        {lines.map((n) => (
          <line key={`h${n}`} x1="0" y1={n} x2="400" y2={n} />
        ))}
        <line x1="0" y1="0" x2="400" y2="500" stroke={accent} strokeWidth="1.4" opacity="0.9" />
      </g>
    );
  }

  if (variant === "arcs") {
    return (
      <g fill="none" stroke={stroke} strokeWidth="1">
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((r, i) => (
          <circle key={r} cx="330" cy="392" r={r} opacity={0.6 - i * 0.04} />
        ))}
        <circle cx="330" cy="392" r="10" fill={accent} stroke="none" />
      </g>
    );
  }

  if (variant === "waves") {
    return (
      <g fill="none" stroke={stroke} strokeWidth="1" opacity="0.6">
        {Array.from({ length: 12 }, (_, i) => {
          const offset = i * 42;
          return (
            <path
              key={i}
              d={`M-20 ${120 + offset} C 80 ${60 + offset}, 160 ${180 + offset}, 260 ${120 + offset} S 380 ${60 + offset}, 440 ${140 + offset}`}
            />
          );
        })}
        <path
          d="M-20 300 C 80 240, 160 360, 260 300 S 380 240, 440 320"
          stroke={accent}
          strokeWidth="1.6"
          opacity="1"
        />
      </g>
    );
  }

  return (
    <g stroke={stroke} strokeWidth="0.8" opacity="0.55">
      {Array.from({ length: 40 }, (_, i) => {
        const n = i * 16;
        return <line key={i} x1={n - 400} y1="500" x2={n} y2="0" />;
      })}
      <line x1="-40" y1="500" x2="360" y2="0" stroke={accent} strokeWidth="1.6" opacity="1" />
    </g>
  );
}

/**
 * Stand-in for photography until real images exist. Deliberately abstract so it
 * never suggests it depicts the owner.
 */
export function Texture({ variant = "arcs", tone = "paper", label, className = "" }: TextureProps) {
  const palette = palettes[tone];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette.bg }}
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <Pattern variant={variant} stroke={palette.stroke} accent={palette.accent} />
      </svg>
      {label ? (
        <span className="eyebrow absolute bottom-3 left-3 bg-paper px-2 py-1 text-ink">
          {label}
        </span>
      ) : null}
    </div>
  );
}
