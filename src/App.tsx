// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ServiceDetailPage } from './pages/ServiceDetailPage.tsx';
import { TermsPage } from './pages/legal/TermsPage.tsx';
import { PrivacyPage } from './pages/legal/PrivacyPage.tsx';
import { AffiliateDisclosurePage } from './pages/legal/AffiliateDisclosurePage.tsx';
import { DisclaimerPage } from './pages/legal/DisclaimerPage.tsx';
import { ContactPage } from './pages/legal/ContactPage.tsx';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.tsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminAddServicePage } from './pages/admin/AdminAddServicePage.tsx';
import { AdminEditServicePage } from './pages/admin/AdminEditServicePage.tsx';
import { Service } from './types.ts';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('qb_admin_session') === 'true';
  });

  // Fetch all services from Express API
  const fetchServices = useCallback(async () => {
    try {
      setIsLoadingServices(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data && data.services) {
        setServices(data.services);

        // If currently viewing a single service, refresh selectedService
        if (selectedService) {
          const fresh = data.services.find((s: Service) => s.id === selectedService.id || s.slug === selectedService.slug);
          if (fresh) setSelectedService(fresh);
        }
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setIsLoadingServices(false);
    }
  }, [selectedService]);

  useEffect(() => {
    fetchServices();
  }, []);

  // Listen to popstate for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper
  const navigate = (path: string, pushHistory = true) => {
    setCurrentPath(path);
    if (pushHistory && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check route matching for service detail
  useEffect(() => {
    if (currentPath.startsWith('/service/')) {
      const slug = currentPath.replace('/service/', '');
      const found = services.find((s) => s.slug === slug);
      if (found) {
        setSelectedService(found);
      }
    }
  }, [currentPath, services]);

  // Admin status toggle
  const handleToggleStatus = async (id: string, newStatus: 'draft' | 'published') => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  // Admin delete service
  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const handleAdminLogin = (user: { username: string }) => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('qb_admin_session', 'true');
    navigate('/admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('qb_admin_session');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* PUBLIC: HOME */}
        {currentPath === '/' && (
          <HomePage
            services={services}
            onSelectService={(srv) => {
              setSelectedService(srv);
              navigate(`/service/${srv.slug}`);
            }}
            onNavigate={navigate}
          />
        )}

        {/* PUBLIC: SERVICE DETAIL */}
        {currentPath.startsWith('/service/') && (
          selectedService ? (
            <ServiceDetailPage
              service={selectedService}
              onBack={() => navigate('/')}
              onNavigate={navigate}
            />
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold text-slate-800">QuickBooks Gig Not Found</h2>
              <p className="text-xs text-slate-500 mt-2 mb-4">
                The requested service listing may have been unlisted or removed.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Back to Directory
              </button>
            </div>
          )
        )}

        {/* PUBLIC: LEGAL PAGES */}
        {currentPath === '/terms' && <TermsPage />}
        {currentPath === '/privacy' && <PrivacyPage />}
        {currentPath === '/affiliate-disclosure' && <AffiliateDisclosurePage />}
        {currentPath === '/disclaimer' && <DisclaimerPage />}
        {currentPath === '/contact' && <ContactPage />}

        {/* ADMIN: LOGIN */}
        {currentPath === '/admin/login' && (
          <AdminLoginPage
            onLoginSuccess={handleAdminLogin}
            onNavigateHome={() => navigate('/')}
          />
        )}

        {/* ADMIN: DASHBOARD */}
        {currentPath === '/admin' && (
          !isAdminLoggedIn ? (
            <AdminLoginPage
              onLoginSuccess={handleAdminLogin}
              onNavigateHome={() => navigate('/')}
            />
          ) : (
            <AdminDashboardPage
              services={services}
              onAddNew={() => navigate('/admin/services/new')}
              onEdit={(srv) => {
                setEditingService(srv);
                navigate(`/admin/services/${srv.id}/edit`);
              }}
              onPreview={(srv) => {
                setSelectedService(srv);
                navigate(`/service/${srv.slug}`);
              }}
              onDelete={handleDeleteService}
              onToggleStatus={handleToggleStatus}
              onLogout={handleAdminLogout}
            />
          )
        )}

        {/* ADMIN: ADD NEW SERVICE */}
        {currentPath === '/admin/services/new' && (
          !isAdminLoggedIn ? (
            <AdminLoginPage
              onLoginSuccess={handleAdminLogin}
              onNavigateHome={() => navigate('/')}
            />
          ) : (
            <AdminAddServicePage
              onBack={() => navigate('/admin')}
              onServiceCreated={() => {
                fetchServices();
                navigate('/admin');
              }}
            />
          )
        )}

        {/* ADMIN: EDIT SERVICE */}
        {currentPath.startsWith('/admin/services/') && currentPath.endsWith('/edit') && (
          !isAdminLoggedIn ? (
            <AdminLoginPage
              onLoginSuccess={handleAdminLogin}
              onNavigateHome={() => navigate('/')}
            />
          ) : (
            editingService ? (
              <AdminEditServicePage
                service={editingService}
                onBack={() => navigate('/admin')}
                onServiceUpdated={() => {
                  fetchServices();
                  navigate('/admin');
                }}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-xs text-slate-500 mb-4">Please select a service from the dashboard to edit.</p>
                <button
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            )
          )
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
