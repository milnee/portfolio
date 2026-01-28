import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: "8px",
          border: "1px solid #1a1a1a",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 300, color: "#4ade80", fontFamily: "monospace" }}>
          /
        </span>
      </div>
    ),
    { ...size }
  );
}
