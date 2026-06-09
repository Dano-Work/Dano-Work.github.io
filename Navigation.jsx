// Verdant & Still — Navigation components
// Top header bar + bottom tab navigation

const LOGO_SRC = '../../assets/logo.png';

function TopBar({ title, subtitle, onBack, action, useLogo }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px 12px',
      background: VS_TOKENS.cream,
      borderBottom: `0.5px solid ${VS_TOKENS.borderLight}`,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: VS_TOKENS.moss600, padding: '4px 6px 4px 0',
            fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center',
          }}>←</button>
        )}
        <div>
          {useLogo
            ? <img src={LOGO_SRC} alt="My Bank" style={{ height: 26, objectFit: 'contain', display: 'block', filter: `brightness(0) saturate(100%) invert(22%) sepia(28%) saturate(700%) hue-rotate(75deg) brightness(85%)` }} />
            : <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: VS_TOKENS.moss800, lineHeight: 1.2 }}>{title}</div>
          }
          {subtitle && <div style={{
            fontSize: 11, color: VS_TOKENS.textMuted, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 2,
          }}>{subtitle}</div>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

const NAV_ITEMS = [
  { id: 'home',    label: 'Home',    icon: '⌂' },
  { id: 'send',    label: 'Send',    icon: '↑' },
  { id: 'savings', label: 'Savings', icon: '◎' },
  { id: 'history', label: 'History', icon: '≡' },
  { id: 'profile', label: 'Profile', icon: '○' },
];

function BottomNav({ active, onSelect }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: VS_TOKENS.white,
      borderTop: `0.5px solid ${VS_TOKENS.borderLight}`,
      flexShrink: 0,
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 3, padding: '10px 4px 12px',
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color 0.15s',
              color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted,
            }}
          >
            <span style={{
              fontSize: 18, lineHeight: 1,
              color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted,
            }}>{item.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 500 : 400,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: isActive ? VS_TOKENS.moss600 : VS_TOKENS.textMuted,
            }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { TopBar, BottomNav, NAV_ITEMS });
