import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Globe, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success = false;
      if (isSignUp) {
        success = await signup(formData.name, formData.email, formData.password);
        if (!success) setError('Account synthesis failed or identity already exists.');
      } else {
        success = await login(formData.email, formData.password);
        if (!success) setError('Authentication failed. Verify credentials.');
      }

      if (success) navigate('/places');
    } catch (err) {
      setError('System interruption. Please retry authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #16a34a 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-md mx-auto px-6 relative z-10">
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[3rem] p-10 border-border shadow-2xl bg-white/80 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div 
                key={isSignUp ? 'signup-icon' : 'login-icon'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-600/20"
              >
                {isSignUp ? <User className="w-8 h-8 text-white" /> : <Key className="w-8 h-8 text-white" />}
              </motion.div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                {isSignUp ? 'Create Profile' : 'Authenticate'}
              </h1>
              <p className="text-slate-500 font-medium italic">
                {isSignUp ? 'Establish your digital identity for Rwanda travel.' : 'Secure access to your professional itineraries.'}
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 font-bold text-xs italic"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Official Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Security Token</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Remember Session</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 group"
              >
                {loading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" 
                  />
                ) : (
                  <>
                    <span className="text-lg font-black uppercase tracking-tighter">
                      {isSignUp ? 'Initialize Profile' : 'Access Dashboard'}
                    </span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up/Login */}
            <div className="mt-10 text-center">
              <p className="text-slate-500 font-medium italic mb-4">
                {isSignUp ? 'Existing user?' : "New explorer?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-primary hover:text-green-700 font-black uppercase tracking-tighter border-b-2 border-primary/20 hover:border-primary transition-all"
                >
                  {isSignUp ? 'Sign In' : 'Register'}
                </button>
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                <Globe className="w-4 h-4" />
                Return to Hub
              </Link>
            </div>
          </motion.div>

          {/* Verification Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Protocol</p>
              <p className="text-xs font-medium text-slate-600 italic">Encrypted local session management active.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

