import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export function PortfolioCard({ portfolio }: { portfolio: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-panel rounded-2xl overflow-hidden min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] snap-center cursor-pointer group relative"
    >
      <div className="h-40 relative overflow-hidden">
        <img 
          src={portfolio.img} 
          alt={portfolio.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161920] to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/80 text-xs font-medium">
          <Eye size={14} />
          <span>{portfolio.views} views</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            portfolio.status === 'Featured' ? 'bg-[#A8C3E6]/20 text-[#A8C3E6] border-[#A8C3E6]/30' :
            portfolio.status === 'Published' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
            'bg-white/10 text-white/60 border-white/20'
          }`}>
            {portfolio.status}
          </span>
        </div>
      </div>
      <div className="p-6 relative">
        <div className="w-16 h-16 rounded-full border-4 border-[#161920] overflow-hidden absolute -top-8 left-6">
          <img src={portfolio.img} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold text-white mb-1">{portfolio.name}</h3>
          <p className="text-white/60 text-sm mb-6">{portfolio.category}</p>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl bg-white text-[#0f1115] font-medium hover:bg-white/90 transition-colors text-sm">
              Preview
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10 text-sm">
              Build
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
