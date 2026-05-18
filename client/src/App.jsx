import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles/global.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
    <h2>Loading...</h2>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: 'var(--font-body)' } }} />
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <WhatsAppButton />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
