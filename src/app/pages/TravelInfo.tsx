import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AlertTriangle, Globe, Info, Mail, MapPin as MapPinIcon, Phone, Plane, Shield, Wallet, Sparkles, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function TravelInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Essentials</h1>
              <p className="text-slate-500 font-medium italic mt-2">Comprehensive strategic data for your Rwandan expedition.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 glass rounded-[3rem] p-12 border-primary/10 bg-slate-50/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Zap className="w-48 h-48 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-10">Strategic Matrix</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { label: 'Administrative Hub', value: 'Kigali', icon: MapPinIcon },
              { label: 'Official Dialect', value: 'Kinyarwanda, English, French', icon: Globe },
              { label: 'Economic Token', value: 'Rwandan Franc (RWF)', icon: Wallet },
              { label: 'Temporal Node', value: 'CAT (UTC+2)', icon: Clock },
              { label: 'Power Grid', value: '230V, 50Hz (Type C, J)', icon: Zap },
              { label: 'Access Code', value: '+250', icon: Phone },
            ].map((fact, i) => (
              <div key={i} className="group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{fact.label}</p>
                <div className="flex items-center gap-3">
                  <fact.icon className="w-5 h-5 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xl font-black text-slate-900 tracking-tighter uppercase">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mb-16 grid gap-10 md:grid-cols-2">
          <motion.div variants={itemVariants} className="card-lift glass rounded-[3rem] p-10 border-border group">
            <div className="mb-8 flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Plane className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Border Protocol</h2>
            </div>
            <ul className="space-y-6 text-slate-600">
              {[
                { title: 'Universal Arrival Visa', desc: 'Available for all nationalities upon entry ($50 USD).' },
                { title: 'Digital Authorization', desc: 'Secure your e-visa via migration.gov.rw.' },
                { title: 'Identity Validity', desc: 'Passports must be active for 180+ days post-entry.' },
                { title: 'Regional Pass', desc: 'East Africa Tourist Visa covers Rwanda, Kenya, Uganda.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-black uppercase text-xs tracking-widest mb-1">{item.title}</strong>
                    <p className="text-sm font-medium italic">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="card-lift glass rounded-[3rem] p-10 border-border group">
            <div className="mb-8 flex items-center gap-4">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Safety Integrity</h2>
            </div>
            <ul className="space-y-6 text-slate-600">
              {[
                { title: 'Health Certification', desc: 'Yellow Fever immunization required for specific entry.' },
                { title: 'System Resilience', desc: 'Rwanda maintains peak security indices globally.' },
                { title: 'Biosafety', desc: 'Malaria prophylaxis suggested for specialized park zones.' },
                { title: 'Emergency Node', desc: 'Dial 112 for immediate tactical security response.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-black uppercase text-xs tracking-widest mb-1">{item.title}</strong>
                    <p className="text-sm font-medium italic">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-16 rounded-[3rem] border border-slate-100 bg-slate-50 p-12">
          <div className="mb-10 flex items-center gap-4">
            <Wallet className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">Capital Logistics</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Currency Matrix</h3>
              <p className="text-slate-600 font-medium italic leading-relaxed">Stable exchange nodes located at airports and urban bureaus. USD (2013+ series) widely utilized for premium services.</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Digital Banking</h3>
              <p className="text-slate-600 font-medium italic leading-relaxed">Visa/Mastercard integration is high in urban centers. Local mobile money protocols (MTN/Airtel) are the gold standard for micro-transactions.</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Gratuity Protocol</h3>
              <p className="text-slate-600 font-medium italic leading-relaxed">10% standard for dining nodes. Strategic tipping for guides ($15+) and hospitality staff ($5) is appreciated for elite service.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 rounded-[4rem] border-2 border-red-100 bg-red-50/50 p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <AlertTriangle className="w-40 h-40 text-red-600" />
          </div>
          <div className="mb-10 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Tactical Response</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
             {[
               { label: 'Security Forces', code: '112' },
               { label: 'Medical Response', code: '912' },
               { label: 'Tactical Fire Unit', code: '111' },
             ].map((node, i) => (
               <div key={i} className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{node.label}</p>
                 <p className="text-5xl font-black text-red-600 tracking-tighter">{node.code}</p>
               </div>
             ))}
          </div>
        </motion.div>

      </motion.div>

      <Footer />
    </div>
  );
}

