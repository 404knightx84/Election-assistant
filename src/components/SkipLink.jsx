/**
 * SkipLink - Accessibility component for keyboard-only navigation.
 * Allows users to skip directly to main content.
 * 
 * @category Accessibility (WCAG 2.1 Level AA)
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100%',
        left: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--navy)',
        color: 'white',
        borderRadius: '0 0 0.5rem 0.5rem',
        zIndex: 9999,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'top 0.2s'
      }}
      onFocus={(e) => { e.target.style.top = '0'; }}
      onBlur={(e) => { e.target.style.top = '-100%'; }}
    >
      Skip to main content
    </a>
  );
}
