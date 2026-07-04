import { motion } from 'framer-motion';

export function WorkspaceCard({ workspace }: { workspace: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-panel rounded-2xl overflow-hidden min-w-[320px] max-w-[320px] md:min-w-[400px] md:max-w-[400px] snap-center cursor-pointer group"
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={workspace.img} 
          alt={workspace.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161920] to-transparent opacity-80"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
            {workspace.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{workspace.title}</h3>
        <p className="text-white/60 text-sm mb-6">{workspace.desc}</p>
        <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
          Create Workspace
        </button>
      </div>
    </motion.div>
  );
}
