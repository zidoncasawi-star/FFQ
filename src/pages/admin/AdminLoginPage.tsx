// src/pages/admin/AdminLoginPage.tsx
import React, { useState } from 'react';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck, Key } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: { username: string }) => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('QBAdminSecurePassword2026!');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Invalid credentials. Please verify your admin username and password.');
      }
    } catch {
      setError('Connection failure while attempting to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="admin-login-container" className="max-w-md mx-auto py-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Login</h1>
          <p className="text-xs text-slate-500">
            Sign in to manage QuickBooks Fiverr directory listings, scrape gigs, and publish services.
          </p>
        </div>

        {/* Demo credentials hint box */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Key size={14} className="text-emerald-700" />
            <span>Default Seed Credentials (Pre-filled):</span>
          </div>
          <p className="text-[11px] text-emerald-800">
            User: <code className="font-mono bg-emerald-100/80 px-1 py-0.5 rounded">admin</code> | Pass:{' '}
            <code className="font-mono bg-emerald-100/80 px-1 py-0.5 rounded">QBAdminSecurePassword2026!</code>
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="admin-user-input">
              Admin Username
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="admin-user-input"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="admin-pass-input">
              Admin Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="admin-pass-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          <button
            id="admin-login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-500 hover:text-slate-800 transition"
          >
            ← Return to public website
          </button>
        </div>
      </div>
    </div>
  );
};
