const shellStyle = {
  position: "relative",
  width: "100%",
  padding: "88px 20px",
};

const innerStyle = {
  width: "min(100%, 1120px)",
  margin: "0 auto",
};

const eyebrowStyle = {
  margin: "0 0 12px",
  color: "rgba(190, 246, 255, 0.92)",
  font: "700 12px/1.2 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: 0,
  textTransform: "uppercase",
};

const titleStyle = {
  margin: "0 0 18px",
  color: "#ffffff",
  font: "700 clamp(32px, 6vw, 76px)/0.95 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: 0,
};

export default function SectionShell({
  children,
  eyebrow,
  title,
  style,
  innerStyle: customInnerStyle,
  ...props
}) {
  return (
    <section style={{ ...shellStyle, ...style }} {...props}>
      <div style={{ ...innerStyle, ...customInnerStyle }}>
        {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
        {title && <h2 style={titleStyle}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
