import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    // Simulate JWT login
    setTimeout(() => {
      if (form.email === 'admin@dashio.ai' && form.password === 'admin123') {
        localStorage.setItem('dashio_token', 'jwt_mock_token_admin');
        onLogin();
      } else {
        setError('Invalid credentials. Try admin@dashio.ai / admin123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, #0f172a 60%), #0f172a' }}>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(59,130,246,0.15)' }} />
        <motion.div animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(168,85,247,0.1)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        {/* Card */}
        <div className="glass-card p-8 border border-slate-700/60"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.1), 0 25px 50px rgba(0,0,0,0.5)' }}>

          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7)', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
            >
              AI
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Welcome to DashIO</h1>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}>AI-Powered E-commerce Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: '#94a3b8' }}>Email Address</label>
              <input
                type="email"
                placeholder="admin@dashio.ai"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: '#94a3b8' }}>Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#64748b' }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs px-3 py-2 rounded-lg border"
                style={{ color: '#f87171', backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}>
                {error}
              </motion.p>
            )}

            <div className="flex justify-end">
              <a href="#" className="text-xs hover:underline" style={{ color: '#3b82f6' }}>Forgot password?</a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Signing In...</>
              ) : (
                <><ShieldCheck size={18} /> Sign In Securely</>
              )}
            </motion.button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-lg border text-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <p className="text-xs flex items-center justify-center gap-1" style={{ color: '#60a5fa' }}>
              <Sparkles size={13} />
              Demo: <code className="font-mono font-bold">admin@dashio.ai</code> / <code className="font-mono font-bold">admin123</code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
