import { Component } from 'react';

/**
 * ErrorBoundary - Catches runtime errors in child components
 * and displays a graceful fallback UI instead of crashing.
 * 
 * @category Code Quality / Security
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, this would send to a logging service
    console.error('[ErrorBoundary] Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert"
          style={{ 
            maxWidth: '600px', margin: '4rem auto', padding: '3rem 2rem', 
            textAlign: 'center', background: 'white', borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '1.5rem', color: '#1E3A8A', marginBottom: '0.75rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.6 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem', borderRadius: '2rem', border: 'none',
              background: 'linear-gradient(135deg, #F97316, #EA580C)', color: 'white',
              fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
