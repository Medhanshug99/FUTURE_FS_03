import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '2rem' }}>
          <AlertTriangle size={64} color="#e53e3e" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a202c' }}>Something went wrong.</h1>
          <p style={{ color: '#4a5568', marginBottom: '2rem', maxWidth: '500px' }}>
            We're sorry, an unexpected error occurred. Our team has been notified. Please try refreshing the page or navigating back home.
          </p>
          <a href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#319795', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            Return to Home
          </a>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
