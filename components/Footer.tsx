import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#C9A84C]/15 text-[#555555] mt-0">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-white text-2xl font-bold mb-1">Kina</h3>
            <p className="text-xs text-[#C9A84C] mb-4 tracking-wide">by Arkina Studios</p>
            <p className="text-sm leading-relaxed text-[#555555]">
              Where stories live. A home for powerful writing from Africa and beyond — fiction, poetry, essays, and more.
            </p>
          </div>
          {/* Explore */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/genre/fiction" className="hover:text-[#C9A84C] transition-colors">Fiction</Link></li>
              <li><Link href="/genre/poetry" className="hover:text-[#C9A84C] transition-colors">Poetry</Link></li>
              <li><Link href="/genre/personal-essay" className="hover:text-[#C9A84C] transition-colors">Personal Essays</Link></li>
              <li><Link href="/genre/folklore" className="hover:text-[#C9A84C] transition-colors">Folklore</Link></li>
              <li><Link href="/genre/flash-fiction" className="hover:text-[#C9A84C] transition-colors">Flash Fiction</Link></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Kina</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#C9A84C] transition-colors">About Kina</Link></li>
              <li><Link href="/submit" className="hover:text-[#C9A84C] transition-colors">Submit a Story</Link></li>
              <li><Link href="/auth/signup" className="hover:text-[#C9A84C] transition-colors">Create Account</Link></li>
              <li>
                <a href="https://instagram.com/kinaapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/kinaapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C9A84C]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#444444]">
          <p>© {new Date().getFullYear()} Kina · An Arkina Studios product · Arkina Holdings Limited</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C9A84C] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
