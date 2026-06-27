const navStyle = {
  position: "sticky",
  top: "16px",
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "18px",
  width: "min(100%, 1040px)",
  margin: "0 auto",
  padding: "10px 12px 10px 18px",
  border: "1px solid rgba(255, 255, 255, 0.34)",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.09))",
  boxShadow:
    "0 18px 50px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.44)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
};

const brandStyle = {
  color: "#ffffff",
  font: "700 15px/1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: 0,
};

const linksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: 0,
  padding: 0,
  listStyle: "none",
};

const linkStyle = {
  color: "rgba(255, 255, 255, 0.78)",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "9px 12px",
  font: "600 13px/1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export default function FloatingNav({ brand = "Liquid Site", links = [], action }) {
  return (
    <nav style={navStyle} aria-label="Primary navigation">
      <div style={brandStyle}>{brand}</div>
      <ul style={linksStyle}>
        {links.map((link) => (
          <li key={link.href || link.label}>
            <a href={link.href || "#"} style={linkStyle}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {action}
    </nav>
  );
}
