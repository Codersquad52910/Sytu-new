import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f1115]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-white tracking-tight">
          SYTU
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Marketplace</Link>
          <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Projects</Link>
          <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Portfolio</Link>
          <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Workspace</Link>
          <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Collaboration</Link>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-white/80 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-medium text-white/80 hover:text-white transition-colors">Login</button>
            <button className="px-5 py-2.5 text-sm font-medium bg-white text-[#0f1115] rounded-full hover:bg-white/90 transition-colors">
              Get Started
            </button>
          </div>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
