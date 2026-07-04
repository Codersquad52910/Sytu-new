import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0f1115] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="text-2xl font-bold text-white mb-6">SYTU</div>
          <p className="text-white/60 text-sm leading-relaxed">
            Create. Showcase. Connect. Built for students, developers, designers, and founders to organize work and build professional identity.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="#" className="hover:text-white transition">Marketplace</Link></li>
            <li><Link href="#" className="hover:text-white transition">Projects</Link></li>
            <li><Link href="#" className="hover:text-white transition">Portfolio</Link></li>
            <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="#" className="hover:text-white transition">Docs</Link></li>
            <li><Link href="#" className="hover:text-white transition">Community</Link></li>
            <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="#" className="hover:text-white transition">About</Link></li>
            <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-sm text-white/40">
        &copy; {new Date().getFullYear()} SYTU. All rights reserved.
      </div>
    </footer>
  );
}
