const variants = {
  primary: {
    color: "#061018",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(168, 235, 255, 0.76))",
    border: "1px solid rgba(255, 255, 255, 0.72)",
    boxShadow:
      "0 14px 32px rgba(88, 214, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  },
  secondary: {
    color: "#f8fbff",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    boxShadow:
      "0 12px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.42)",
  },
};

const baseStyle = {
  appearance: "none",
  borderRadius: "999px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  minHeight: "44px",
  padding: "0 18px",
  font: "600 14px/1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: 0,
  backdropFilter: "blur(18px) saturate(170%)",
  WebkitBackdropFilter: "blur(18px) saturate(170%)",
  transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
};

export default function LiquidButton({
  children,
  variant = "primary",
  style,
  type = "button",
  ...props
}) {
  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      style={{ ...baseStyle, ...variantStyle, ...style }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
      }}
      {...props}
    >
      {children}
    </button>
  );
}
