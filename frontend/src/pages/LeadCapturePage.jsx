// LeadCapturePage — public page where users submit lead info
import { Link } from 'react-router-dom';
import { Zap, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { useLeadForm } from '../hooks/useLeadForm';

const BUDGET_OPTIONS = [
  { value: '', label: 'Select your budget range' },
  { value: 'Under $1k', label: 'Under $1,000' },
  { value: '$1k-$5k', label: '$1,000 – $5,000' },
  { value: '$5k-$10k', label: '$5,000 – $10,000' },
  { value: '$10k-$25k', label: '$10,000 – $25,000' },
  { value: '$25k+', label: '$25,000+' },
  { value: 'Custom', label: 'Let\'s discuss custom' },
];

export default function LeadCapturePage() {
  const { form, loading, submitted, handleChange, handleSubmit, resetForm } = useLeadForm();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient background orbs */}
      <div className="orb orb-purple animate-pulse-glow"
        style={{ width: '600px', height: '600px', top: '-200px', left: '-150px', opacity: 0.4 }} />
      <div className="orb orb-magenta animate-pulse-glow"
        style={{ width: '500px', height: '500px', bottom: '-100px', right: '-100px', opacity: 0.3, animationDelay: '1.5s' }} />
      <div className="orb orb-blue"
        style={{ width: '300px', height: '300px', top: '40%', left: '60%', opacity: 0.2 }} />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
          }}>
            <Zap size={18} color="white" />
          </div>
          <span className="text-lg font-bold" style={{ color: '#e0e3e5' }}>LeadDesk</span>
        </div>
        <Link to="/login">
          <button className="btn-secondary text-sm py-2 px-5">
            Admin Login
          </button>
        </Link>
      </nav>

      {/* Hero + Form */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Hero text */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#a78bfa',
            }}>
            <Zap size={14} />
            We build digital products that matter
          </div>

          <h1 className="text-5xl font-extrabold mb-5 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>{' '}
            Together
          </h1>

          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#cbc3d7' }}>
            Tell us about your project, your vision, and your budget.
            Our team will reach out within 24 hours with a tailored proposal.
          </p>
        </div>

        {/* Form card */}
        {submitted ? (
          /* Success state */
          <div className="glass-card p-10 text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
            }}>
              <CheckCircle size={40} color="#4ade80" />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#e0e3e5' }}>
              Message Received!
            </h2>
            <p className="mb-8" style={{ color: '#cbc3d7' }}>
              Thanks for reaching out. Our team will review your request and
              get back to you within 24 hours.
            </p>
            <button onClick={resetForm} className="btn-primary inline-flex items-center gap-2">
              Submit Another Request
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* Form state */
          <form
            onSubmit={handleSubmit}
            className="glass-card p-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: '#e0e3e5' }}>
              Get in Touch
            </h2>

            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                  Full Name <span style={{ color: '#8b5cf6' }}>*</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="form-input"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                  Email Address <span style={{ color: '#8b5cf6' }}>*</span>
                </label>
                <input
                  id="lead-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                  Budget Range <span style={{ color: '#8b5cf6' }}>*</span>
                </label>
                <select
                  id="lead-budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={!opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#cbc3d7' }}>
                  Project Description <span style={{ color: '#8b5cf6' }}>*</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, timeline..."
                  rows={4}
                  className="form-input resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2 py-3 text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send My Request
                </>
              )}
            </button>

            <p className="text-xs text-center mt-4" style={{ color: '#958ea0' }}>
              By submitting, you agree to be contacted regarding your inquiry.
              No spam, ever.
            </p>
          </form>
        )}

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { label: '24h Response', sub: 'We reply fast' },
            { label: '100+ Projects', sub: 'Delivered successfully' },
            { label: 'No Commitment', sub: 'Free consultation' },
          ].map(({ label, sub }) => (
            <div key={label} className="glass-card-sm p-4 text-center">
              <p className="font-bold text-sm" style={{ color: '#e0e3e5' }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: '#958ea0' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
