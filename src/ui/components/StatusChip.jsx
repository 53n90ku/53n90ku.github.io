const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  minHeight: "30px",
  padding: "0 12px",
  border: "1px solid rgba(255, 255, 255, 0.32)",
  borderRadius: "999px",
  color: "rgba(255, 255, 255, 0.9)",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.07))",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.42)",
  backdropFilter: "blur(16px) saturate(165%)",
  WebkitBackdropFilter: "blur(16px) saturate(165%)",
  font: "600 12px/1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: 0,
};

const dotStyle = {
  width: "7px",
  height: "7px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #a7f3ff, #7cffc4)",
  boxShadow: "0 0 16px rgba(124, 255, 196, 0.72)",
};

export default function StatusChip({ children, showDot = true, style, ...props }) {
  return (
    <span style={{ ...chipStyle, ...style }} {...props}>
      {showDot && <span aria-hidden="true" style={dotStyle} />}
      {children}
    </span>
  );
}
