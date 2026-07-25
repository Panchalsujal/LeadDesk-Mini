// LeadCapturePage — Full SaaS Landing Page
// Sections: Navbar · Hero · Features · Why Us · Testimonials · FAQ · Contact · Footer
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ArrowRight, CheckCircle, Send,
  BarChart2, Users, Shield, Bell, Smartphone, Globe,
  Star, ChevronDown, ChevronUp, Mail, Phone, MapPin,
  Share2, MessageSquare, TrendingUp, Target, Clock, Award,
} from 'lucide-react';
import { useLeadForm } from '../hooks/useLeadForm';

const BUDGET_OPTIONS = [
  { value: '', label: 'Select your budget range' },
  { value: 'Under $1k',   label: 'Under $1,000' },
  { value: '$1k-$5k',     label: '$1,000 – $5,000' },
  { value: '$5k-$10k',    label: '$5,000 – $10,000' },
  { value: '$10k-$25k',   label: '$10,000 – $25,000' },
  { value: '$25k+',       label: '$25,000+' },
  { value: 'Custom',      label: "Let's discuss custom" },
];

const NAV_LINKS = [
  { href: '#features',     label: 'Features' },
  { href: '#why-us',       label: 'Why Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq',          label: 'FAQ' },
  { href: '#contact',      label: 'Contact' },
];

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Real-time Analytics',
    desc: 'Track lead performance with live dashboards, KPI cards, and visual charts.',
    color: '#4f46e5', bg: '#eef2ff',
  },
  {
    icon: Users,
    title: 'Team Management',
    desc: 'Create roles, assign leads, and collaborate across your entire sales team.',
    color: '#0891b2', bg: '#ecfeff',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    desc: 'Fine-grained permissions so every team member sees exactly what they need.',
    color: '#16a34a', bg: '#f0fdf4',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    desc: 'Get notified the moment a lead arrives, status changes, or a deal closes.',
    color: '#d97706', bg: '#fffbeb',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    desc: 'Works flawlessly on desktop, tablet, and mobile. Manage leads anywhere.',
    color: '#7c3aed', bg: '#faf5ff',
  },
  {
    icon: Globe,
    title: 'Custom Lead Forms',
    desc: 'Embed your branded lead capture form anywhere with a single line of code.',
    color: '#db2777', bg: '#fdf2f8',
  },
];

const WHY_US = [
  { icon: TrendingUp, stat: '3x',    label: 'Faster lead response' },
  { icon: Target,     stat: '87%',   label: 'Customer satisfaction' },
  { icon: Clock,      stat: '< 24h', label: 'Average setup time' },
  { icon: Award,      stat: '500+',  label: 'Teams using LeadDesk' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Kim',
    role: 'Head of Sales, NovaBrand',
    initials: 'SK',
    bg: '#eef2ff', color: '#4338ca',
    stars: 5,
    text: "LeadDesk cut our lead response time by 60%. The dashboard is beautiful and the team onboarded in minutes. Best CRM we've used.",
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, PixelForge',
    initials: 'MJ',
    bg: '#f0fdf4', color: '#166534',
    stars: 5,
    text: 'The role-based access is exactly what we needed. Our sales team sees what matters, and managers get the full picture.',
  },
  {
    name: 'Priya Sharma',
    role: 'Growth Lead, TechFlow',
    initials: 'PS',
    bg: '#faf5ff', color: '#6d28d9',
    stars: 5,
    text: 'Setup was under an hour. The charts and KPI cards make reporting to stakeholders effortless. Highly recommended.',
  },
];

const FAQS = [
  {
    q: 'How quickly can I get started with LeadDesk?',
    a: 'Most teams are up and running in under 24 hours. Our setup wizard guides you through creating your super admin account, configuring your team, and embedding your lead capture form.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Yes — LeadDesk offers a 14-day free trial with full access to all features. No credit card required to start.',
  },
  {
    q: 'Can I customize the lead capture form?',
    a: 'Absolutely. You can customize fields, branding, and embed the form on any website or landing page with a simple script tag.',
  },
  {
    q: 'What roles and permissions does LeadDesk support?',
    a: 'LeadDesk has four roles: Super Admin, Admin, Manager, and Employee — each with progressively scoped access to keep your data secure.',
  },
  {
    q: 'How is my data kept secure?',
    a: 'All data is encrypted in transit and at rest. We use JWT authentication, role-based access control, and follow industry-standard security practices.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={() => setOpen((p) => !p)}>
        <span>{q}</span>
        {open ? <ChevronUp size={18} className="text-indigo-600 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-600 leading-relaxed animate-fade-in-up">
          {a}
        </div>
      )}
    </div>
  );
}

export default function LeadCapturePage() {
  const { form, loading, submitted, handleChange, handleSubmit, resetForm } = useLeadForm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Sticky Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap size={16} color="white" />
              </div>
              <span className="font-bold text-gray-900 text-lg tracking-tight">LeadDesk</span>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:inline-flex btn-outline h-9 text-sm">
                Sign In
              </Link>
              <a href="#contact" className="btn-primary h-9 text-sm">
                Get Started <ArrowRight size={14} />
              </a>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden btn-ghost p-2"
                onClick={() => setMobileMenuOpen((p) => !p)}
              >
                <div className="space-y-1">
                  <span className="block w-5 h-0.5 bg-gray-600" />
                  <span className="block w-5 h-0.5 bg-gray-600" />
                  <span className="block w-5 h-0.5 bg-gray-600" />
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1 animate-fade-in-up">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  {label}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <Link to="/login" className="btn-outline w-full justify-center h-9 mt-2">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <a href="#features" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 mb-6 hover:bg-indigo-100 transition-colors">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse-dot" />
              Trusted by 500+ growing teams
              <ArrowRight size={12} />
            </a>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 animate-fade-in-up">
              The CRM built for{' '}
              <span className="text-indigo-600">modern teams</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-1 opacity-0">
              Capture, track, and close leads faster with LeadDesk — the clean, powerful CRM that your whole team will actually use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up stagger-2 opacity-0">
              <a href="#contact" className="btn-primary h-11 px-6 text-base w-full sm:w-auto justify-center">
                Start Free Trial
                <ArrowRight size={16} />
              </a>
              <a href="#features" className="btn-outline h-11 px-6 text-base w-full sm:w-auto justify-center">
                See Features
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 animate-fade-in-up stagger-3 opacity-0">
              {[
                { icon: CheckCircle, text: '14-day free trial' },
                { icon: CheckCircle, text: 'No credit card' },
                { icon: CheckCircle, text: 'Cancel anytime' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
                  <Icon size={14} className="text-emerald-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-14 max-w-5xl mx-auto animate-fade-in-up stagger-4 opacity-0">
            <div className="card overflow-hidden shadow-xl">
              {/* Mock browser bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="flex-1 mx-3 bg-white border border-gray-200 rounded text-xs text-gray-400 px-2 py-1 text-center max-w-xs mx-auto truncate">
                  https://lead-desk-mini-gold.vercel.app/admin/dashboard
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="bg-gray-50 p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
                  {[
                    { label: 'Total Leads', val: '247', color: '#eef2ff', accent: '#4f46e5' },
                    { label: 'New',         val: '42',  color: '#ede9fe', accent: '#7c3aed' },
                    { label: 'Contacted',   val: '118', color: '#fef3c7', accent: '#d97706' },
                    { label: 'Closed',      val: '87',  color: '#dcfce7', accent: '#16a34a' },
                  ].map(({ label, val, color, accent }) => (
                    <div key={label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                      <div className="w-6 h-6 rounded-lg mb-2" style={{ background: color }} />
                      <p className="text-lg font-bold text-gray-800">{val}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 bg-white rounded-xl p-3 border border-gray-100 shadow-xs h-24 flex items-center justify-center">
                    <div className="flex items-end gap-1.5 h-14">
                      {[30,50,40,70,55,80,65].map((h, i) => (
                        <div key={i} className="w-4 sm:w-5 rounded-t" style={{ height: `${h}%`, background: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#fb923c' : '#4ade80' }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs h-24 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge badge-indigo mb-4">Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything your team needs to close more deals
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From real-time analytics to role-based access — LeadDesk has every feature your sales team needs in one clean workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={title} className="feature-card animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section id="why-us" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="badge badge-indigo mb-4">Why LeadDesk</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                Built for speed, designed for teams
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Most CRMs are bloated and complex. LeadDesk is the opposite — fast to set up, intuitive to use, and powerful enough to scale with your team.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Zero learning curve', desc: 'Your team is productive on day one. No training required.' },
                  { title: 'Built-in reporting', desc: 'Beautiful charts and KPI cards out of the box, no setup needed.' },
                  { title: 'Scales with you', desc: 'From solo operators to 100-person sales teams — LeadDesk grows with you.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle size={12} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{title}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {WHY_US.map(({ icon: Icon, stat, label }, i) => (
                <div key={label} className="card p-6 text-center animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat}</p>
                  <p className="text-sm text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge badge-indigo mb-4">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by sales teams everywhere
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Don't take our word for it — here's what our customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, initials, bg, color, stars, text }, i) => (
              <div key={name} className="testimonial-card animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(stars)].map((_, j) => (
                    <Star key={j} size={14} fill="#fbbf24" stroke="none" />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: bg, color }}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge badge-indigo mb-4">FAQ</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-500 text-lg">
              Can't find what you're looking for? <a href="#contact" className="text-indigo-600 hover:underline">Reach out to us.</a>
            </p>
          </div>

          <div className="card p-1">
            <div className="px-5">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact / Lead Capture ─── */}
      <section id="contact" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — info */}
            <div>
              <span className="badge badge-indigo mb-4">Get in Touch</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                Ready to transform your lead management?
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Tell us about your team and goals. We'll reach back within 24 hours with a tailored plan.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail,    label: 'Sujalpanchal249@gail.com' },
                  { icon: Phone,   label: '+91 7877554558' },
                  { icon: MapPin,  label: 'Ahmedabad (Gujarat) , India' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-400 mb-3">We reply within 24 hours, guaranteed.</p>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" stroke="none" />)}
                  <span className="text-xs text-gray-400 ml-1">4.9/5 from 200+ reviews</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="card p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Thanks for reaching out. Our team will review your request and get back to you within 24 hours.
                  </p>
                  <button onClick={resetForm} className="btn-primary justify-center gap-1.5">
                    Send Another Message <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Tell us about your project</h3>

                  {/* Name */}
                  <div>
                    <label htmlFor="lead-name" className="form-label">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="form-input h-10"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lead-email" className="form-label">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="form-input h-10"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="lead-budget" className="form-label">
                      Budget Range <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="lead-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="form-input h-10"
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
                    <label htmlFor="lead-message" className="form-label">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={4}
                      className="form-input resize-none"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center h-10"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    By submitting, you agree to be contacted. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} color="white" />
                </div>
                <span className="font-bold text-white text-lg">LeadDesk</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-5">
                The modern CRM for growing teams. Capture, manage, and close leads faster.
              </p>
              <div className="flex items-center gap-2">
                {[Globe, Share2, MessageSquare].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <Icon size={15} className="text-gray-400 hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                {['Features', 'Pricing', 'Changelog', 'Roadmap'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {['About', 'Blog', 'Careers', 'Contact'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} LeadDesk. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
