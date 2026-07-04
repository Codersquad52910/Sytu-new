import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function JourneyCard({ journey }: { journey: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-panel p-6 rounded-2xl min-w-[280px] max-w-[280px] md:min-w-[340px] md:max-w-[340px] snap-center cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-xs font-medium text-[#9CCEEE] bg-[#9CCEEE]/10 px-3 py-1 rounded-full border border-[#9CCEEE]/20">
          {journey.type}
        </span>
        <span className="text-xs text-white/40">{journey.time}</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-6">{journey.title}</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/60 mb-2">
          <span>Progress</span>
          <span>{journey.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#B4D2ED] to-[#A8C3E6] rounded-full"
            style={{ width: `${journey.progress}%` }}
          ></div>
        </div>
      </div>

      <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10 group-hover:border-[#A8C3E6]/30">
        <span>Continue</span>
        <ArrowRight size={16} className="text-[#A8C3E6] transform group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
