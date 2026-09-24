import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

/* ==========================================================================
   Generated social card.

   Built in code rather than shipping a binary asset, so the brand, colours and
   positioning statement stay in sync with the site automatically. Uses only
   the default system font — no network fetch at build time.
   ========================================================================== */

export const alt = `${site.brand} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#4fd1ff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07080a",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid + accent light, echoing the site background. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 260,
            width: 760,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(79,209,255,0.20) 0%, rgba(79,209,255,0) 70%)",
            display: "flex",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: ACCENT,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {site.brandMark}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#eef1f4",
              fontWeight: 600,
              letterSpacing: -0.4,
            }}
          >
            {site.brand}
          </div>
        </div>

        {/* Statement */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 22,
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#eef1f4",
              maxWidth: 940,
            }}
          >
            Software products powered by modern AI
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#98a1ac",
              marginTop: 26,
              maxWidth: 900,
            }}
          >
            Web applications · Backend systems · AI applications · Automation
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 26,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#69727d" }}>
            From idea to production
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#eef1f4",
              fontWeight: 600,
            }}
          >
            Start a Project
          </div>
        </div>
      </div>
    ),
    size,
  );
}
