// Verdant & Still — Banking App — Primitive Components
// Shared design tokens + low-level UI elements

const VS_TOKENS = {
  cream: '#fafcf9',
  white: '#ffffff',
  moss50: '#f2f7f0',
  moss100: '#ddebd8',
  moss200: '#b8d4af',
  moss400: '#6fa05e',
  moss600: '#4a7a38',
  moss800: '#2d5422',
  moss900: '#1a3314',
  emerald50: '#eaf7f1',
  emerald100: '#c0ebd7',
  emerald200: '#80d5af',
  emerald400: '#2db37a',
  emerald600: '#1a8a5a',
  emerald800: '#0e5c3a',
  textPrimary: '#1a2e1a',
  textSecondary: '#4a6347',
  textMuted: '#7a9a78',
  borderLight: 'rgba(74,122,56,0.12)',
  borderMid: 'rgba(74,122,56,0.22)',
};

// ─── Button ─────────────────────────────────────────────────
function Button({ variant = 'primary', size = 'md', children, onClick, style, disabled }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 6,
    transition: 'background 0.15s, transform 0.1s',
    letterSpacing: '0.01em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    opacity: disabled ? 0.55 : 1,
  };
  const sizes = {
    md: { fontSize: 13, padding: '8px 18px' },
    sm: { fontSize: 12, padding: '5px 12px' },
    lg: { fontSize: 15, padding: '11px 24px' },
  };
  const variants = {
    primary: { background: VS_TOKENS.moss600, color: '#fff' },
    secondary: { background: VS_TOKENS.moss50, color: VS_TOKENS.moss800, border: `0.5px solid ${VS_TOKENS.borderMid}` },
    ghost: { background: 'transparent', color: VS_TOKENS.moss600, border: `0.5px solid ${VS_TOKENS.borderMid}` },
    danger: { background: '#c0392b', color: '#fff' },
  };
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const hoverBg = { primary: VS_TOKENS.moss800, secondary: VS_TOKENS.moss100, ghost: VS_TOKENS.moss50, danger: '#a93226' };
  const variantStyle = { ...variants[variant] };
  if (hovered && !disabled) variantStyle.background = hoverBg[variant];

  return (
    <button
      style={{ ...base, ...sizes[size], ...variantStyle, transform: pressed ? 'scale(0.97)' : 'scale(1)', ...style }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >{children}</button>
  );
}

// ─── Badge ───────────────────────────────────────────────────
function Badge({ variant = 'moss', children }) {
  const variants = {
    moss:    { background: VS_TOKENS.moss100,    color: VS_TOKENS.moss800 },
    emerald: { background: VS_TOKENS.emerald100, color: VS_TOKENS.emerald800 },
    neutral: { background: VS_TOKENS.white, color: VS_TOKENS.textSecondary, border: `0.5px solid ${VS_TOKENS.borderMid}` },
    deep:    { background: VS_TOKENS.moss800,    color: '#fff' },
  };
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 500,
      padding: '3px 10px', borderRadius: 6, letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif",
      ...variants[variant],
    }}>{children}</span>
  );
}

// ─── Input ───────────────────────────────────────────────────
function Input({ placeholder, value, onChange, label, hint, error, type = 'text' }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 11, fontWeight: 500, color: VS_TOKENS.textSecondary, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: "'DM Sans', sans-serif" }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          padding: '9px 12px',
          borderRadius: 6,
          border: `0.5px solid ${error ? '#c0392b' : focused ? VS_TOKENS.moss400 : VS_TOKENS.borderMid}`,
          background: VS_TOKENS.white,
          color: VS_TOKENS.textPrimary,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: focused ? `0 0 0 3px rgba(74,122,56,0.10)` : (error ? '0 0 0 3px rgba(192,57,43,0.08)' : 'none'),
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      />
      {(hint || error) && <div style={{ fontSize: 11, color: error ? '#c0392b' : VS_TOKENS.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{error || hint}</div>}
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────
function Card({ children, style, padding = 16 }) {
  return (
    <div style={{
      background: VS_TOKENS.white,
      border: `0.5px solid ${VS_TOKENS.borderLight}`,
      borderRadius: 6,
      padding,
      ...style,
    }}>{children}</div>
  );
}

// ─── Alert ───────────────────────────────────────────────────
function Alert({ variant = 'neutral', title, children }) {
  const variants = {
    success: { bg: VS_TOKENS.moss50,     border: VS_TOKENS.moss400,    text: VS_TOKENS.moss800 },
    info:    { bg: VS_TOKENS.emerald50,  border: VS_TOKENS.emerald400, text: VS_TOKENS.emerald800 },
    neutral: { bg: '#f7f8f6',            border: VS_TOKENS.borderMid,  text: VS_TOKENS.textSecondary },
  };
  const v = variants[variant];
  return (
    <div style={{
      padding: '10px 14px',
      borderRadius: 0,
      background: v.bg,
      borderLeft: `2.5px solid ${v.border}`,
      color: v.text,
      fontSize: 13,
      lineHeight: 1.5,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {title && <strong style={{ fontWeight: 500 }}>{title}</strong>}
      {title && ' — '}
      {children}
    </div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────
function Avatar({ initials, color = VS_TOKENS.moss400, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 500,
      fontFamily: "'DM Sans', sans-serif",
      flexShrink: 0,
      border: `2px solid ${VS_TOKENS.white}`,
    }}>{initials}</div>
  );
}

// ─── Section Label ───────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
      letterSpacing: '0.10em', color: VS_TOKENS.textMuted,
      paddingBottom: 8, borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`,
      marginBottom: 12, fontFamily: "'DM Sans', sans-serif",
    }}>{children}</div>
  );
}

// ─── Divider ─────────────────────────────────────────────────
function Divider({ style }) {
  return <div style={{ height: '0.5px', background: VS_TOKENS.borderLight, ...style }} />;
}

Object.assign(window, { Button, Badge, Input, Card, Alert, Avatar, SectionLabel, Divider, VS_TOKENS });
