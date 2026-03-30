import { useState, useEffect } from 'react';
import styles from './TokenShowcase.module.css';

// ─── Token data ───────────────────────────────────────────────────────────────
// These arrays mirror the CSS token file. When you add/remove tokens in
// tokens.css, add/remove the corresponding entry here.

const PRIMITIVES = [
  {
    group: 'Brand (Teal)',
    tokens: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
      name: `--primitive-brand-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Neutral (Warm Gray)',
    tokens: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
      name: `--primitive-neutral-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Green',
    tokens: [50, 100, 500, 600, 700].map((n) => ({
      name: `--primitive-green-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Amber',
    tokens: [50, 100, 400, 500, 600, 700].map((n) => ({
      name: `--primitive-amber-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Orange',
    tokens: [50, 100, 400, 500, 600].map((n) => ({
      name: `--primitive-orange-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Blue',
    tokens: [50, 100, 500, 600, 700].map((n) => ({
      name: `--primitive-blue-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Slate',
    tokens: [50, 100, 200, 500, 600, 700].map((n) => ({
      name: `--primitive-slate-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Red',
    tokens: [50, 100, 500, 600, 700].map((n) => ({
      name: `--primitive-red-${n}`,
      label: String(n),
    })),
  },
  {
    group: 'Olive (Navigation)',
    tokens: [50, 100, 500, 700, 900].map((n) => ({
      name: `--primitive-olive-${n}`,
      label: String(n),
    })),
  },
];

const SEMANTIC_SECTIONS = [
  {
    title: 'Surfaces',
    tokens: [
      { name: '--color-surface-app',          desc: 'Main page background (warm cream)' },
      { name: '--color-surface-panel',         desc: 'Sidebar, card, modal bg' },
      { name: '--color-surface-sunken',        desc: 'Input bg, inset areas' },
      { name: '--color-surface-brand',         desc: 'Filled CTA button bg' },
      { name: '--color-surface-brand-subtle',  desc: 'Active nav item, selected rows' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: '--color-text-heading',   desc: 'Page titles, column headers' },
      { name: '--color-text-primary',   desc: 'Main body copy' },
      { name: '--color-text-secondary', desc: 'Labels, metadata, helper text' },
      { name: '--color-text-tertiary',  desc: 'Placeholders, disabled states' },
      { name: '--color-text-brand',     desc: 'Active nav label, tinted text' },
      { name: '--color-text-on-brand',  desc: 'Text on brand-colored background' },
      { name: '--color-text-link',      desc: 'Inline links' },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { name: '--color-border-subtle',  desc: 'Row dividers, sidebar border' },
      { name: '--color-border-default', desc: 'Input outlines, card borders' },
      { name: '--color-border-strong',  desc: 'Emphasized separators' },
      { name: '--color-border-brand',   desc: 'Focused inputs, active tab indicator' },
    ],
  },
  {
    title: 'Interactive',
    tokens: [
      { name: '--color-interactive-primary',         desc: 'Primary button resting bg' },
      { name: '--color-interactive-primary-hover',   desc: 'Primary button hover bg' },
      { name: '--color-interactive-secondary',       desc: 'Outlined button bg' },
      { name: '--color-interactive-ghost-hover',     desc: 'Ghost button hover bg' },
      { name: '--color-interactive-danger',          desc: 'Destructive action bg' },
      { name: '--color-interactive-danger-hover',    desc: 'Destructive action hover bg' },
      { name: '--color-focus-ring',                  desc: 'Keyboard focus outline' },
    ],
  },
  {
    title: 'Navigation',
    tokens: [
      { name: '--color-nav-bg',               desc: 'Sidebar background' },
      { name: '--color-nav-item-text',         desc: 'Default item label' },
      { name: '--color-nav-item-icon',         desc: 'Default item icon' },
      { name: '--color-nav-item-hover-bg',     desc: 'Hovered item bg' },
      { name: '--color-nav-item-hover-text',   desc: 'Hovered item text' },
      { name: '--color-nav-item-active-bg',    desc: 'Currently active item bg' },
      { name: '--color-nav-item-active-text',  desc: 'Currently active item text' },
      { name: '--color-nav-item-active-icon',  desc: 'Currently active item icon' },
      { name: '--color-nav-border',            desc: 'Sidebar right border' },
    ],
  },
];

const STATUS_BADGES = [
  { label: 'Drafted',         bg: '--color-status-drafted-bg',         text: '--color-status-drafted-text' },
  { label: 'Drafting',        bg: '--color-status-drafting-bg',        text: '--color-status-drafting-text' },
  { label: 'Final draft',     bg: '--color-status-final-draft-bg',     text: '--color-status-final-draft-text' },
  { label: 'Pending issuing', bg: '--color-status-pending-issuing-bg', text: '--color-status-pending-issuing-text' },
];

const ACTION_STATUSES = [
  { label: 'Confirmed and signed',  icon: '✦', textToken: '--color-action-confirmed-text',  iconToken: '--color-action-confirmed-icon' },
  { label: 'Approved',              icon: '✓', textToken: '--color-action-approved-text',   iconToken: '--color-action-approved-icon' },
  { label: 'Pending confirmation',  icon: '○', textToken: '--color-action-pending-text',    iconToken: '--color-action-pending-icon' },
  { label: 'Delegated to me',       icon: '→', textToken: '--color-action-delegated-text',  iconToken: '--color-action-delegated-icon' },
];

const FONT_SIZES = [
  { token: '--font-size-xs',   label: 'xs   · 12px', sample: 'Caption / metadata' },
  { token: '--font-size-sm',   label: 'sm   · 13px', sample: 'Small UI labels' },
  { token: '--font-size-base', label: 'base · 14px', sample: 'Default body text' },
  { token: '--font-size-md',   label: 'md   · 16px', sample: 'Medium body text' },
  { token: '--font-size-lg',   label: 'lg   · 18px', sample: 'Large text' },
  { token: '--font-size-xl',   label: 'xl   · 20px', sample: 'Section heading' },
  { token: '--font-size-2xl',  label: '2xl  · 24px', sample: 'Page heading' },
  { token: '--font-size-3xl',  label: '3xl  · 30px', sample: 'Display heading' },
];

const FONT_WEIGHTS = [
  { token: '--font-weight-regular',   label: 'Regular  · 400', sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--font-weight-medium',    label: 'Medium   · 500', sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--font-weight-semibold',  label: 'Semibold · 600', sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--font-weight-bold',      label: 'Bold     · 700', sample: 'The quick brown fox jumps over the lazy dog' },
];

const SPACING = [
  { token: '--space-1',  label: 'space-1  · 4px',  px: '4px' },
  { token: '--space-2',  label: 'space-2  · 8px',  px: '8px' },
  { token: '--space-3',  label: 'space-3  · 12px', px: '12px' },
  { token: '--space-4',  label: 'space-4  · 16px', px: '16px' },
  { token: '--space-5',  label: 'space-5  · 20px', px: '20px' },
  { token: '--space-6',  label: 'space-6  · 24px', px: '24px' },
  { token: '--space-8',  label: 'space-8  · 32px', px: '32px' },
  { token: '--space-10', label: 'space-10 · 40px', px: '40px' },
  { token: '--space-12', label: 'space-12 · 48px', px: '48px' },
  { token: '--space-16', label: 'space-16 · 64px', px: '64px' },
];

const RADII = [
  { token: '--radius-sm',   label: 'sm · 4px' },
  { token: '--radius-md',   label: 'md · 6px' },
  { token: '--radius-lg',   label: 'lg · 8px' },
  { token: '--radius-xl',   label: 'xl · 12px' },
  { token: '--radius-full', label: 'full' },
];

const SHADOWS = [
  { token: '--shadow-xs', label: 'shadow-xs' },
  { token: '--shadow-sm', label: 'shadow-sm' },
  { token: '--shadow-md', label: 'shadow-md' },
  { token: '--shadow-lg', label: 'shadow-lg' },
  { token: '--shadow-xl', label: 'shadow-xl' },
];

const NAV_TOKENS = [
  // Colors
  { token: '--color-nav-bg',               value: '#F2F3EE', desc: 'Sidebar background' },
  { token: '--color-nav-item-text',        value: '#68695B', desc: 'Resting label & icon' },
  { token: '--color-nav-item-hover-bg',    value: 'rgba(82,84,52,0.08)', desc: 'Hovered item bg' },
  { token: '--color-nav-item-hover-text',  value: '#203209', desc: 'Hovered item text' },
  { token: '--color-nav-item-active-bg',   value: '#E7E9DD', desc: 'Active category bg' },
  { token: '--color-nav-item-active-text', value: '#203209', desc: 'Active category & selected item text' },
  // Layout
  { token: '--nav-inner-padding',          value: '8px',  desc: 'Sidebar inset from all edges' },
  { token: '--nav-item-height',            value: '40px', desc: 'Height of every row (category & item)' },
  { token: '--nav-item-gap',               value: '0px',  desc: 'Gap between rows inside a group' },
  { token: '--nav-item-icon-gap',          value: '12px', desc: 'Space between icon and label' },
  { token: '--nav-item-radius',            value: '8px',  desc: 'Corner radius for hover/active bg' },
  { token: '--nav-category-padding-left',  value: '12px', desc: 'Category row left padding' },
  { token: '--nav-category-padding-right', value: '12px', desc: 'Category row right padding' },
  { token: '--nav-menuitem-padding-left',  value: '40px', desc: 'Menu item left indent (under category)' },
  { token: '--nav-menuitem-padding-right', value: '16px', desc: 'Menu item right padding' },
  // Typography
  { token: '--nav-font-size',              value: '14px',    desc: 'Font size — both category and item' },
  { token: '--nav-line-height',            value: '1.4286',  desc: '≈ 20px / 14px from Figma spec' },
  { token: '--nav-letter-spacing',         value: '-0.15px', desc: 'Figma spec letter spacing' },
  { token: '--nav-font-weight-resting',    value: '400',     desc: 'Category (always) + item resting' },
  { token: '--nav-font-weight-selected',   value: '600',     desc: 'Selected menu item only' },
];

const NAV_PREVIEW = [
  { type: 'category', label: 'Transport Documents', icon: '📄', active: true },
  { type: 'item',     label: 'BIMCO eBL Congenbill', selected: true },
  { type: 'item',     label: 'ASBA Nograin BL 1989 UK' },
  { type: 'item',     label: 'Private Documents' },
  { type: 'category', label: 'Risk Management', icon: '⚠️', active: false },
  { type: 'item',     label: 'Overview' },
];

const MOTION = [
  { token: '--duration-fast',    value: '100ms',                        usage: 'Micro-interactions, hover state changes' },
  { token: '--duration-base',    value: '200ms',                        usage: 'Default: fades, button press response' },
  { token: '--duration-slow',    value: '300ms',                        usage: 'Sidebar collapse, modal enter/exit' },
  { token: '--duration-slower',  value: '500ms',                        usage: 'Complex layout transitions' },
  { token: '--easing-default',   value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Most transitions (ease-in-out)' },
  { token: '--easing-in',        value: 'cubic-bezier(0.4, 0, 1, 1)',   usage: 'Elements leaving the screen' },
  { token: '--easing-out',       value: 'cubic-bezier(0, 0, 0.2, 1)',   usage: 'Elements entering the screen' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Read all token values in one pass at mount time.
function useTokenValues(names) {
  const [values, setValues] = useState({});
  useEffect(() => {
    const computed = getComputedStyle(document.documentElement);
    const result = {};
    names.forEach((name) => {
      result[name] = computed.getPropertyValue(name).trim();
    });
    setValues(result);
  }, []); // intentionally run once on mount
  return values;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }) {
  return (
    <div>
      <h3 className={styles.subsectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TokenShowcase() {
  // Collect every token name upfront so we read computed styles in one pass.
  const allNames = [
    ...PRIMITIVES.flatMap((g) => g.tokens.map((t) => t.name)),
    ...SEMANTIC_SECTIONS.flatMap((s) => s.tokens.map((t) => t.name)),
    ...STATUS_BADGES.flatMap((b) => [b.bg, b.text]),
    ...ACTION_STATUSES.flatMap((a) => [a.textToken, a.iconToken]),
    ...NAV_TOKENS.map((t) => t.token),
  ];

  const tv = useTokenValues(allNames);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Design Tokens</h1>
        <p className={styles.pageDesc}>
          All design primitives and semantic aliases for the prototype.
          Primitives are raw values — the paint kit.
          Semantic tokens express intent and are the only ones component CSS should reference.
          Hex values are read live from the CSS file.
        </p>
      </div>

      {/* ── 1. Primitive Palette ── */}
      <Section title="1. Primitive Palette">
        {PRIMITIVES.map(({ group, tokens }) => (
          <div key={group} className={styles.paletteGroup}>
            <div className={styles.paletteGroupLabel}>{group}</div>
            <div className={styles.paletteRow}>
              {tokens.map(({ name, label }) => (
                <div key={name} className={styles.swatch} title={name}>
                  <div
                    className={styles.swatchColor}
                    style={{ background: `var(${name})` }}
                  />
                  <div className={styles.swatchMeta}>
                    <div className={styles.swatchStep}>{label}</div>
                    <div className={styles.swatchHex}>{tv[name]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* ── 2. Semantic Tokens — Color ── */}
      <Section title="2. Semantic Tokens — Color">
        {SEMANTIC_SECTIONS.map(({ title, tokens }) => (
          <Subsection key={title} title={title}>
            <div className={styles.semanticGrid}>
              {tokens.map(({ name, desc }) => (
                <div key={name} className={styles.semanticSwatch}>
                  <div
                    className={styles.semanticColor}
                    style={{ background: `var(${name})` }}
                    title={name}
                  />
                  <div>
                    <div className={styles.semanticName}>{name}</div>
                    <div className={styles.semanticHex}>{tv[name]}</div>
                    <div className={styles.semanticDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Subsection>
        ))}

        <Subsection title="Doc Status Badges">
          <div className={styles.badgeRow}>
            {STATUS_BADGES.map(({ label, bg, text }) => (
              <span
                key={label}
                className={styles.badge}
                style={{
                  background: `var(${bg})`,
                  color: `var(${text})`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </Subsection>

        <Subsection title="Action Status">
          <div className={styles.actionRow}>
            {ACTION_STATUSES.map(({ label, icon, textToken, iconToken }) => (
              <div key={label} className={styles.actionItem}>
                <span
                  className={styles.actionIcon}
                  style={{ color: `var(${iconToken})` }}
                >
                  {icon}
                </span>
                <span
                  className={styles.actionLabel}
                  style={{ color: `var(${textToken})` }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Subsection>
      </Section>

      {/* ── 3. Typography ── */}
      <Section title="3. Typography">
        <Subsection title="Font Size Scale">
          <div className={styles.typeSamples}>
            {FONT_SIZES.map(({ token, label, sample }) => (
              <div key={token} className={styles.typeSample}>
                <span className={styles.typeToken}>{label}</span>
                <span style={{ fontSize: `var(${token})`, lineHeight: 1.3 }}>
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </Subsection>

        <Subsection title="Font Weight Scale">
          <div className={styles.typeSamples}>
            {FONT_WEIGHTS.map(({ token, label, sample }) => (
              <div key={token} className={styles.typeSample}>
                <span className={styles.typeToken}>{label}</span>
                <span
                  style={{
                    fontWeight: `var(${token})`,
                    fontSize: 'var(--font-size-base)',
                  }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </Subsection>
      </Section>

      {/* ── 4. Spacing ── */}
      <Section title="4. Spacing">
        <div className={styles.spacingList}>
          {SPACING.map(({ token, label, px }) => (
            <div key={token} className={styles.spacingItem}>
              <span className={styles.spacingToken}>{label}</span>
              <div className={styles.spacingBar} style={{ width: px }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Border Radius ── */}
      <Section title="5. Border Radius">
        <div className={styles.radiusList}>
          {RADII.map(({ token, label }) => (
            <div key={token} className={styles.radiusItem}>
              <div
                className={styles.radiusBox}
                style={{ borderRadius: `var(${token})` }}
              />
              <div className={styles.radiusToken}>
                <div>{label}</div>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: '9px' }}>{token}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. Shadows ── */}
      <Section title="6. Shadows">
        <div className={styles.shadowList}>
          {SHADOWS.map(({ token, label }) => (
            <div
              key={token}
              className={styles.shadowCard}
              style={{ boxShadow: `var(${token})` }}
            >
              <span className={styles.shadowCardLabel}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Navigation Spec ── */}
      <Section title="7. Navigation Spec">
        <Subsection title="Token Reference">
          <table className={styles.motionTable}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Resolved value</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {NAV_TOKENS.map(({ token, desc }) => (
                <tr key={token}>
                  <td>{token}</td>
                  <td>{tv[token] || '—'}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Subsection>

        <Subsection title="Live Preview">
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            background: 'var(--color-nav-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-nav-border)',
            padding: 'var(--nav-inner-padding)',
            minWidth: '220px',
            gap: 'var(--nav-item-gap)',
          }}>
            {NAV_PREVIEW.map((row, i) => {
              const isCategory = row.type === 'category';
              const isSelected = !isCategory && row.selected;
              const isCategoryActive = isCategory && row.active;

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--nav-item-icon-gap)',
                    height: 'var(--nav-item-height)',
                    paddingLeft: isCategory
                      ? 'var(--nav-category-padding-left)'
                      : 'var(--nav-menuitem-padding-left)',
                    paddingRight: isCategory
                      ? 'var(--nav-category-padding-right)'
                      : 'var(--nav-menuitem-padding-right)',
                    borderRadius: 'var(--nav-item-radius)',
                    fontSize: 'var(--nav-font-size)',
                    fontWeight: isSelected
                      ? 'var(--nav-font-weight-selected)'
                      : 'var(--nav-font-weight-resting)',
                    lineHeight: 'var(--nav-line-height)',
                    letterSpacing: 'var(--nav-letter-spacing)',
                    background: isCategoryActive
                      ? 'var(--color-nav-item-active-bg)'
                      : 'transparent',
                    color: (isCategoryActive || isSelected)
                      ? 'var(--color-nav-item-active-text)'
                      : 'var(--color-nav-item-text)',
                    cursor: isCategory ? 'default' : 'pointer',
                  }}
                >
                  {isCategory && (
                    <span style={{ fontSize: '16px', lineHeight: 1 }}>{row.icon}</span>
                  )}
                  <span>{row.label}</span>
                </div>
              );
            })}
          </div>
        </Subsection>
      </Section>

      {/* ── 8. Motion ── */}
      <Section title="8. Motion">
        <table className={styles.motionTable}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>When to use</th>
            </tr>
          </thead>
          <tbody>
            {MOTION.map(({ token, value, usage }) => (
              <tr key={token}>
                <td>{token}</td>
                <td>{value}</td>
                <td>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
