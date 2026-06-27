const baseStyle = {
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.34)",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08))",
  boxShadow:
    "0 24px 70px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.48)",
  backdropFilter: "blur(26px) saturate(170%)",
  WebkitBackdropFilter: "blur(26px) saturate(170%)",
};

const shineStyle = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.42), transparent 28%)",
};

export default function GlassPanel({
  children,
  style,
  padding = "24px",
  as: Component = "section",
  ...props
}) {
  return (
    <Component style={{ ...baseStyle, padding, ...style }} {...props}>
      <span aria-hidden="true" style={shineStyle} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </Component>
  );
}
