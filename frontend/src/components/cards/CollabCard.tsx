import { motion } from 'framer-motion';

export function CollabCard({ collab }: { collab: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-panel p-6 rounded-2xl min-w-[280px] max-w-[280px] md:min-w-[340px] md:max-w-[340px] snap-center cursor-pointer group"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-medium text-[#CBBDDD] bg-[#CBBDDD]/10 px-3 py-1 rounded-full border border-[#CBBDDD]/20">
          {collab.type}
        </span>
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4">{collab.title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {collab.tags.map((tag: string, i: number) => (
          <span key={i} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-md border border-white/10">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-2.5 rounded-xl bg-white text-[#0f1115] font-medium hover:bg-white/90 transition-colors text-sm">
          Apply
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10 text-sm">
          Save
        </button>
      </div>
    </motion.div>
  );
}
