const dockStyle = {
  position: "fixed",
  left: "50%",
  bottom: "22px",
  zIndex: 30,
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  border: "1px solid rgba(255, 255, 255, 0.34)",
  borderRadius: "28px",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08))",
  boxShadow:
    "0 22px 60px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.44)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
};

const itemStyle = {
  width: "46px",
  height: "46px",
  border: "1px solid rgba(255, 255, 255, 0.28)",
  borderRadius: "18px",
  color: "#ffffff",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.38)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 220ms ease, background 220ms ease",
};

export default function GlassDock({ items = [] }) {
  return (
    <div style={dockStyle} role="toolbar" aria-label="Quick actions">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-label={item.label}
          title={item.label}
          style={itemStyle}
          onClick={item.onClick}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "translateY(-4px) scale(1.04)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          {item.icon || item.label?.slice(0, 1)}
        </button>
      ))}
    </div>
  );
}
