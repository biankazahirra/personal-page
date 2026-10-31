import type { ReactElement } from "react";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "A cream service-manual cover with a red band, the name Bianka Zahirra, and a REV 2026 stamp.";

type OgCardProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  meta?: string;
};

/**
 * One printed cover for every social card. Satori only supports a subset of
 * CSS, so this is deliberately built from flex rows, solid colours and
 * absolutely positioned rules instead of the site's gradients.
 */
export function OgCard({
  eyebrow = "section 0 · identification",
  title,
  subtitle,
  meta = "notes · films · songs · small systems · ukulele",
}: OgCardProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#efe6d0",
        color: "#2b2620",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#a6311c",
          color: "#f4ead3",
          padding: "0 56px",
          height: 92,
          borderBottom: "4px solid #f4ead3",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 27,
            fontWeight: 700,
            letterSpacing: 7,
            textTransform: "uppercase",
          }}
        >
          Service Manual
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Model BZ-2026 · Rev C
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "58px 64px 34px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 190,
            height: 1,
            backgroundColor: "rgba(43,38,32,0.22)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 236,
            height: 1,
            backgroundColor: "rgba(43,38,32,0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 282,
            height: 1,
            backgroundColor: "rgba(43,38,32,0.14)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#b83a22",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: title.length > 22 ? 68 : 88,
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: -1,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: title.length > 22 ? 28 : 34,
            lineHeight: 1.3,
            color: "#5a5145",
            maxWidth: 860,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "2px solid #2b2620",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5a5145",
              maxWidth: 720,
            }}
          >
            <div style={{ display: "flex" }}>{meta}</div>
            <div style={{ display: "flex", fontSize: 13, letterSpacing: 3 }}>
              biankazahirra.vercel.app
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #b83a22",
              color: "#b83a22",
              padding: "10px 18px",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              transform: "rotate(-4deg)",
            }}
          >
            Rev 2026
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#d9a441",
          color: "#2b2620",
          padding: "0 56px",
          height: 38,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex" }}>printed in english · indonesian edition in translation</div>
        <div style={{ display: "flex" }}>keep for reference</div>
      </div>
    </div>
  );
}
