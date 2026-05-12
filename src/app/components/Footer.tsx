import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Globe, Sparkles, Send, X, Info, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const sections = [
    {
      title: 'Experience',
      links: [
        { label: 'Destinations', href: '/places' },
        { label: 'Cuisine Guide', href: '/food-guide' },
        { label: 'Trip Planner', href: '/trip-planner' },
        { label: 'My Itinerary', href: '/my-itinerary' },
        { label: 'Housing Intelligence', href: '/housing' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Guidance', href: '#' },
      ]
    }
  ];

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactMessage.trim()) {
      setIsSent(true);
      setContactMessage('');
      setTimeout(() => {
        setIsSent(false);
        setIsContactOpen(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-10 md:pt-16 pb-6 md:pb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 md:mb-6 group">
              <Logo />
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">
                Sura<span className="text-primary">Rwanda</span>
              </span>
            </Link>
            <p className="text-xs md:text-sm text-slate-400 font-medium italic mb-4 md:mb-6 leading-relaxed max-w-sm">
              The definitive digital companion for exploring the Land of a Thousand Hills. Powered by local insight and global technology.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#16a34a' }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-6">About SuraRwanda</h3>
            <article className="text-[11px] leading-relaxed text-slate-400 italic">
              <p className="mb-3">
                SuraRwanda is a premier travel intelligence platform dedicated to showcasing the breathtaking beauty and rich cultural heritage of Rwanda. From the mist-covered peaks of the Virunga Mountains to the vibrant streets of Kigali, we provide travelers with AI-powered tools to navigate the "Land of a Thousand Hills" with ease and sophistication.
              </p>
              <p>
                Our mission is to bridge the gap between traditional tourism and modern technology, offering real-time insights into weather, housing, and travel logistics, ensuring every journey is as seamless as it is unforgettable.
              </p>
            </article>
          </div>

          {/* Quick Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.label === 'Guidance' ? (
                      <button 
                        onClick={() => setIsGuidanceOpen(true)}
                        className="text-xs text-slate-400 hover:text-white transition-colors font-medium flex items-center group"
                      >
                        <div className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-1.5 transition-all" />
                        {link.label}
                      </button>
                    ) : (
                      <Link 
                        to={link.href}
                        className="text-xs text-slate-400 hover:text-white transition-colors font-medium flex items-center group"
                      >
                        <div className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-1.5 transition-all" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {section.title === 'Resources' && (
                  <li>
                    <button 
                      onClick={() => setIsContactOpen(true)}
                      className="text-xs text-slate-400 hover:text-white transition-colors font-medium flex items-center group"
                    >
                      <div className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-1.5 transition-all" />
                      Contact Us
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Floating Contact Area */}
        <AnimatePresence>
          {isGuidanceOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setIsGuidanceOpen(false)}
            >
              <motion.div 
                className="bg-slate-800 border border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 p-6 bg-slate-800/90 backdrop-blur flex items-center justify-between border-b border-white/5 z-10">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black uppercase tracking-widest text-white">SuraRwanda Roadmap</h2>
                  </div>
                  <button onClick={() => setIsGuidanceOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">01</span>
                      Exploration Phase
                    </h3>
                    <p className="text-sm text-slate-300 italic leading-relaxed pl-8">
                      Start at the <strong className="text-white">Destinations</strong> section to discover Rwanda's top attractions. Use the real-time weather indicators on each card to plan your visits according to local conditions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">02</span>
                      Strategic Planning
                    </h3>
                    <p className="text-sm text-slate-300 italic leading-relaxed pl-8">
                      Navigate to the <strong className="text-white">Trip Planner</strong>. Enter your budget, duration, and interests. Our AI will generate a personalized strategy report including accommodation, food, and activities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">03</span>
                      Smart Intelligence
                    </h3>
                    <p className="text-sm text-slate-300 italic leading-relaxed pl-8">
                      Use the <strong className="text-white">Housing Intelligence</strong> tool to predict real estate costs if you're planning a longer stay. Check the <strong className="text-white">Weather Widget</strong> on the home page for a broader view of regional conditions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">04</span>
                      Journey Management
                    </h3>
                    <p className="text-sm text-slate-300 italic leading-relaxed pl-8">
                      Save your AI-generated plans to <strong className="text-white">My Itinerary</strong>. You can manually add entries, track costs, and export your final roadmap as a tactical travel document.
                    </p>
                  </div>

                  <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                    <p className="text-xs text-primary font-bold italic text-center">
                      "Empowering your Rwandan expedition through data-driven discovery."
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 w-80 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[1001]"
            >
              <div className="p-4 bg-primary flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Message Us</span>
                </div>
                <button onClick={() => setIsContactOpen(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Request Received!</p>
                    <p className="text-[10px] text-slate-400 italic">Your request has been received, you will be responded soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendContact} className="space-y-4">
                    <textarea
                      placeholder="Type your message here..."
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all resize-none"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all group"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Send Message</span>
                      <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Visit Us</p>
              <p className="text-sm font-bold">Kigali, Rwanda</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Call Us</p>
              <p className="text-sm font-bold">+250 788 000 000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Email Us</p>
              <p className="text-sm font-bold text-xs md:text-sm">explore@surarwanda.rw</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] md:text-xs font-medium">
            © {currentYear} Sura Rwanda. All rights reserved. Made for the Rwanda Innovation Hackathon.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Proudly Rwandan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
