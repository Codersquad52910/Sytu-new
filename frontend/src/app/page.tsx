'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { OttRow } from '@/components/ui/OttRow';
import { WorkspaceCard } from '@/components/cards/WorkspaceCard';
import { PortfolioCard } from '@/components/cards/PortfolioCard';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { JourneyCard } from '@/components/cards/JourneyCard';
import { CollabCard } from '@/components/cards/CollabCard';
import { mockWorkspaces, mockPortfolios, mockProjects, mockJourney, mockCollab } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f1115] selection:bg-[#B4D2ED] selection:text-[#0f1115]">
      <Navbar />
      
      <HeroSection />

      {/* SECTION 4 - Continue Your Journey (Logged-in state preview) */}
      <section className="py-12 bg-gradient-to-b from-transparent to-[#161920]/30 border-t border-white/5">
        <OttRow 
          title="Continue Your Journey" 
          subtitle="Resume your unfinished creations."
        >
          {mockJourney.map(journey => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </OttRow>
      </section>

      {/* SECTION 1 - Workspace */}
      <section className="py-12">
        <OttRow 
          title="Create Your Workspace" 
          subtitle="Design a personalized workspace to organize your work and ideas."
        >
          {mockWorkspaces.map(ws => (
            <WorkspaceCard key={ws.id} workspace={ws} />
          ))}
        </OttRow>
      </section>

      {/* SECTION 2 - Portfolio */}
      <section className="py-12 bg-[#161920]/20">
        <OttRow 
          title="Build Your Portfolio" 
          subtitle="Turn your skills, achievements, and projects into your digital identity."
        >
          {mockPortfolios.map(port => (
            <PortfolioCard key={port.id} portfolio={port} />
          ))}
        </OttRow>
      </section>

      {/* SECTION 3 - Discover Projects (Visual Highlight) */}
      <section className="py-20 relative">
        {/* Glow effect behind the row */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#9CCEEE]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <OttRow 
          title="Discover Top Projects" 
          subtitle="Explore what builders across the platform are creating."
        >
          {mockProjects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </OttRow>
      </section>

      {/* SECTION 5 - Collaboration Hub */}
      <section className="py-12 bg-[#161920]/20">
        <OttRow 
          title="Collaboration Hub" 
          subtitle="Find teammates. Join ideas. Build together."
        >
          {mockCollab.map(collab => (
            <CollabCard key={collab.id} collab={collab} />
          ))}
        </OttRow>
      </section>

      {/* SECTION 6 - Community Metrics */}
      <section className="py-32 relative border-t border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          <motion.div whileInView={{ y: [20, 0], opacity: [0, 1] }} viewport={{ once: true }}>
            <div className="text-5xl font-bold text-white mb-2">10K+</div>
            <div className="text-[#9CCEEE] font-medium tracking-widest uppercase text-sm">Builders</div>
          </motion.div>
          <motion.div whileInView={{ y: [20, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-[#9CCEEE] font-medium tracking-widest uppercase text-sm">Projects</div>
          </motion.div>
          <motion.div whileInView={{ y: [20, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="text-5xl font-bold text-white mb-2">100K+</div>
            <div className="text-[#9CCEEE] font-medium tracking-widest uppercase text-sm">Connections</div>
          </motion.div>
          <motion.div whileInView={{ y: [20, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="text-5xl font-bold text-white mb-2">1M+</div>
            <div className="text-[#9CCEEE] font-medium tracking-widest uppercase text-sm">Portfolio Views</div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-[#B4D2ED]/5 to-transparent blur-[100px] pointer-events-none rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
            Your next opportunity starts with what you build.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#0f1115] rounded-full font-semibold text-lg hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Start Creating
            </button>
            <button className="px-8 py-4 glass-panel rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
