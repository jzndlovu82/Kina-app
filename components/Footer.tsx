import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-white text-xl font-bold mb-2">Kina</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Where stories live. A home for powerful writing from Africa and beyond — fiction, poetry, essays, and more.
            </p>
            <p className="text-xs text-[#C9A84C] mt-3">An Arkina Studios product</p>
          </div>
          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/genre/fiction" className="hover:text-[#E94560] transition-colors">Fiction</Link></li>
              <li><Link href="/genre/poetry" className="hover:text-[#E94560] transition-colors">Poetry</Link></li>
              <li><Link href="/genre/personal-essay" className="hover:text-[#E94560] transition-colors">Personal Essays</Link></li>
              <li><Link href="/genre/folklore" className="hover:text-[#E94560] transition-colors">Folklore</Link></li>
              <li><Link href="/genre/flash-fiction" className="hover:text-[#E94560] transition-colors">Flash Fiction</Link></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Kina</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#E94560] transition-colors">About Kina</Link></li>
              <li><Link href="/submit" className="hover:text-[#E94560] transition-colors">Submit a Story</Link></li>
              <li><Link href="/auth/signup" className="hover:text-[#E94560] transition-colors">Create Account</Link></li>
              <li>
                <a href="https://instagram.com/kinaapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#E94560] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/kinaapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#E94560] transition-colors">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Kina. An Arkina Studios product. Arkina Holdings Limited.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
