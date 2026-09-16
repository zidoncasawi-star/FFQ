// src/pages/legal/ContactPage.tsx
import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setFeedback({
          type: 'success',
          text: result.message || 'Your message has been sent successfully!',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFeedback({
          type: 'error',
          text: result.error || 'Failed to submit the contact form. Please try again.',
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        text: 'A network connection error occurred while sending your message. Please reach out to us directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page-container" className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Mail size={16} />
          <span>Support & Inquiries</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Contact QB Gig Finder</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Have a question about a listed QuickBooks gig, want to report an outdated price, or submit your own Fiverr service for directory consideration? Fill out the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information & Plain Text Email */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail size={16} className="text-emerald-600" />
              Direct Email
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prefer writing directly from your email client? You can reach our editorial team directly at:
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-emerald-800 break-all select-all">
                [PLACEHOLDER: contact email]
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock size={16} className="text-slate-500" />
              Response Time
            </div>
            <p className="leading-relaxed">
              We respond to inquiries Monday through Friday, usually within 24 to 48 hours.
            </p>

            <div className="pt-3 border-t border-slate-200/80">
              <span className="font-semibold text-slate-800 block mb-1">Notice regarding orders:</span>
              <p className="text-slate-500">
                If you need help with an active order or transaction, please contact Fiverr Customer Support directly via Fiverr.com, as we cannot access private account or order details.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-600" />
              Send a Message
            </h2>

            {feedback && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-name">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alex Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you like to ask or suggest regarding our QuickBooks directory?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  id="submit-contact-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
