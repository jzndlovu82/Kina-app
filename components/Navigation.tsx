"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-[#1A1A2E] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold text-white tracking-wide">
              Kina
            </span>
            <span className="text-xs text-[#C9A84C] font-medium hidden sm:block opacity-80">
              by Arkina Studios
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-[#E94560] transition-colors">
              Stories
            </Link>
            <Link href="/genre/fiction" className="text-gray-300 hover:text-[#E94560] transition-colors">
              Fiction
            </Link>
            <Link href="/genre/poetry" className="text-gray-300 hover:text-[#E94560] transition-colors">
              Poetry
            </Link>
            <Link href="/genre/personal-essay" className="text-gray-300 hover:text-[#E94560] transition-colors">
              Essays
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-[#E94560] transition-colors">
              About
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <Search size={18} />
            </button>
            <Link
              href="/submit"
              className="bg-[#E94560] hover:bg-[#d13a52] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Submit Your Story
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3">
            <form action="/search" method="GET">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, authors, genres…"
                className="w-full bg-white/10 text-white placeholder-gray-400 rounded-full px-4 py-2 text-sm outline-none border border-white/20 focus:border-[#E94560]"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1A1A2E] px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-300 hover:text-white py-1" onClick={() => setMobileOpen(false)}>Stories</Link>
          <Link href="/genre/fiction" className="block text-gray-300 hover:text-white py-1" onClick={() => setMobileOpen(false)}>Fiction</Link>
          <Link href="/genre/poetry" className="block text-gray-300 hover:text-white py-1" onClick={() => setMobileOpen(false)}>Poetry</Link>
          <Link href="/genre/personal-essay" className="block text-gray-300 hover:text-white py-1" onClick={() => setMobileOpen(false)}>Essays</Link>
          <Link href="/about" className="block text-gray-300 hover:text-white py-1" onClick={() => setMobileOpen(false)}>About</Link>
          <hr className="border-white/10" />
          <Link href="/submit" className="block bg-[#E94560] text-white text-center py-2 rounded-full font-semibold text-sm" onClick={() => setMobileOpen(false)}>
            Submit Your Story
          </Link>
          <Link href="/auth/login" className="block text-center text-gray-300 text-sm py-1" onClick={() => setMobileOpen(false)}>Sign In</Link>
        </div>
      )}
    </nav>
  );
}
