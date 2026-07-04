import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Eye, Video, CheckCircle2, XCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full pt-28 pb-16 px-6 max-w-[1600px] mx-auto min-h-[85vh] flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {/* CARD 1: Build Your Portfolio */}
        <motion.div 
          whileHover={{ rotateX: 1, rotateY: -1 }}
          className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col relative overflow-hidden group border border-white/10 hover:border-[#B4D2ED]/30 transition-colors"
          style={{ perspective: 1000 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B4D2ED]/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Build Your Portfolio
            </h1>
            <p className="text-white/60 text-lg max-w-md mb-8">
              Turn your work, skills, achievements, and projects into your professional identity.
            </p>
            <button className="px-8 py-3 bg-white text-[#0f1115] font-semibold rounded-full hover:bg-white/90 transition-transform active:scale-95 shadow-lg shadow-white/10">
              Build Portfolio
            </button>
          </div>

          <div className="mt-auto relative z-10">
            {/* Live Portfolio Preview Visual */}
            <motion.div 
              className="w-full bg-[#161920]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transform origin-bottom transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B4D2ED] to-[#CBBDDD] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#161920] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80" alt="Avatar" className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Alex Developer</h3>
                  <p className="text-[#9CCEEE] text-sm font-medium">Full-Stack Engineer</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-white/40 text-sm bg-white/5 px-3 py-1 rounded-full">
                  <Eye size={14} /> 12.5k
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'System Design', 'TypeScript'].map(skill => (
                    <span key={skill} className="text-xs text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 p-3 flex flex-col justify-end">
                    <div className="text-xs text-white/40 mb-1">GitHub Activity</div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6,7].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-sm ${i%3===0 ? 'bg-[#9CCEEE]' : i%2===0 ? 'bg-[#A8C3E6]/60' : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="h-20 rounded-xl bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80')] bg-cover bg-center border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0f1115]/60"></div>
                    <div className="absolute bottom-2 left-2 text-xs font-bold text-white">Top Project</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-8 right-8 text-xs font-semibold tracking-widest text-white/30 uppercase flex gap-2">
            <span>Publish</span> &bull; <span>Share</span> &bull; <span className="text-[#B4D2ED]">Grow</span>
          </div>
        </motion.div>


        {/* CARD 2: Discover Someone New */}
        <motion.div 
          whileHover={{ rotateX: 1, rotateY: 1 }}
          className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col relative overflow-hidden border border-white/10 hover:border-[#CBBDDD]/30 transition-colors"
          style={{ perspective: 1000 }}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#CBBDDD]/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Discover Someone New
            </h1>
            <p className="text-white/60 text-lg max-w-md">
              Meet people based on interests, background, goals, and preferences.
            </p>
          </div>

          {/* Animated 3-Step Flow */}
          <div className="flex-1 relative z-10 w-full min-h-[280px] flex items-center justify-center">
            <DiscoverAnimationFlow />
          </div>

          {/* Security & Trust Indicators */}
          <div className="mt-8 relative z-10 pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
                <ShieldCheck size={14} className="text-green-400" /> Verified Profiles
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
                <UserCheck size={14} className="text-[#A8C3E6]" /> Mutual Consent
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70 font-medium bg-white/5 px-2 py-1 rounded">
                No Instant Anonymous Calls
              </div>
            </div>
            <p className="text-white/40 text-xs italic">
              You always review profiles before connecting. Preference-based matching only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function DiscoverAnimationFlow() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4500); // 4.5s per step
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto h-full flex items-center justify-center relative">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Create Profile */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="text-xs font-bold text-[#CBBDDD] mb-3 uppercase tracking-wider text-center">Step 1: Your Preferences</div>
            <div className="space-y-3">
              {[
                { label: 'Role', val: 'Product Designer' },
                { label: 'Status', val: 'Professional' },
                { label: 'Goals', val: 'Find Cofounder, Networking' }
              ].map((field, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  key={field.label} 
                  className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between"
                >
                  <span className="text-white/40 text-xs">{field.label}</span>
                  <span className="text-white/90 text-sm font-medium">{field.val}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Smart Matching */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full text-center"
          >
             <div className="text-xs font-bold text-[#9CCEEE] mb-6 uppercase tracking-wider">Step 2: Smart Matching</div>
             <div className="flex items-center justify-center gap-4 relative">
                <div className="w-16 h-16 rounded-full bg-white/10 p-1 z-10">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" className="w-full h-full rounded-full object-cover" />
                </div>
                
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: 60 }} 
                  className="h-1 bg-gradient-to-r from-transparent via-[#9CCEEE] to-transparent relative"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f1115] border border-[#9CCEEE]/50 text-[#9CCEEE] text-[10px] font-bold px-2 py-0.5 rounded-full"
                  >
                    92%
                  </motion.div>
                </motion.div>

                <div className="w-16 h-16 rounded-full bg-white/10 p-1 z-10">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80" className="w-full h-full rounded-full object-cover" />
                </div>
             </div>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="mt-6 flex flex-wrap justify-center gap-2"
             >
               <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">Shared: Startups</span>
               <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">Shared: UI/UX</span>
             </motion.div>
          </motion.div>
        )}

        {/* STEP 3: Preview & Connect */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-[#161920] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
          >
            <div className="text-xs font-bold text-[#A8C3E6] mb-4 uppercase tracking-wider text-center">Step 3: Review & Connect</div>
            
            <div className="flex items-center gap-4 mb-5">
               <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80" className="w-12 h-12 rounded-full object-cover" />
               <div>
                 <div className="text-white font-bold text-sm">David Founder</div>
                 <div className="text-white/50 text-xs">Building Fintech App</div>
               </div>
            </div>

            <div className="flex gap-2 mb-4">
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border border-white/5">
                <XCircle size={14} /> Pass
              </button>
              <button className="flex-1 py-2 bg-[#A8C3E6]/10 text-[#A8C3E6] hover:bg-[#A8C3E6]/20 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border border-[#A8C3E6]/20">
                <CheckCircle2 size={14} /> Connect
              </button>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="w-full py-2 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center gap-2 text-xs font-bold border border-green-500/20"
            >
              <Video size={14} /> Join Video Conversation
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
