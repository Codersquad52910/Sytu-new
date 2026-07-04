import { motion } from 'framer-motion';

export function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-panel rounded-2xl overflow-hidden min-w-[300px] max-w-[300px] md:min-w-[450px] md:max-w-[450px] snap-center cursor-pointer group"
    >
      <div className="h-[280px] relative overflow-hidden">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-90"></div>
        
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-[#B4D2ED] to-[#9CCEEE] text-[#0f1115] rounded-full text-xs font-bold shadow-lg">
              TRENDING
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/60 text-sm mb-4">By {project.creator} • {project.tech}</p>
          
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-medium text-white/80">{project.views} views</span>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white transition border border-white/10">
              Quick View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
