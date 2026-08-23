import { ImageResponse } from "next/og";

import meta from "@/content/generated/meta.json";

export const alt = "Hired.run — an analyst for your job search, not an apply-bot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0b0a",
          color: "#eeece7",
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft: "22px solid #4ade80",
            }}
          />
          <div style={{ fontSize: 36, fontWeight: 700 }}>hired.run</div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 24,
              color: "#a39f98",
              border: "1px solid #272421",
              borderRadius: 8,
              padding: "6px 16px",
            }}
          >
            {`v${meta.plugin.version}`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          <div>An analyst for your job search.</div>
          <div style={{ color: "#a39f98" }}>Not an apply-bot.</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: "#131211",
            border: "1px solid #272421",
            borderRadius: 12,
            padding: "28px 32px",
            fontSize: 28,
          }}
        >
          {meta.install.map((cmd) => (
            <div key={cmd} style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "#4ade80" }}>&gt;</span>
              <span>{cmd}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
