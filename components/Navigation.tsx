"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-[#0D0D0D] border-b border-[#C9A84C]/20 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold text-white tracking-wide group-hover:text-[#C9A84C] transition-colors">
              Kina
            </span>
            <span className="text-xs text-[#C9A84C]/70 font-medium hidden sm:block tracking-wide">
              by Arkina Studios
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-[#888888] hover:text-[#C9A84C] transition-colors">
              Stories
            </Link>
            <Link href="/genre/fiction" className="text-[#888888] hover:text-[#C9A84C] transition-colors">
              Fiction
            </Link>
            <Link href="/genre/poetry" className="text-[#888888] hover:text-[#C9A84C] transition-colors">
              Poetry
            </Link>
            <Link href="/genre/personal-essay" className="text-[#888888] hover:text-[#C9A84C] transition-colors">
              Essays
            </Link>
            <Link href="/about" className="text-[#888888] hover:text-[#C9A84C] transition-colors">
              About
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#888888] hover:text-[#C9A84C] transition-colors"
            >
              <Search size={18} />
            </button>
            <Link
              href="/submit"
              className="bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] text-sm font-bold px-4 py-2 rounded-full transition-colors tracking-wide"
            >
              Submit Your Story
            </Link>
            <Link
              href="/auth/login"
              className="text-[#888888] hover:text-white text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#888888] hover:text-[#C9A84C]"
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
                className="w-full bg-[#1C1C1C] text-white placeholder-[#444444] rounded-full px-4 py-2 text-sm outline-none border border-[#C9A84C]/30 focus:border-[#C9A84C]"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#C9A84C]/20 bg-[#0D0D0D] px-4 py-4 space-y-3">
          <Link href="/" className="block text-[#888888] hover:text-[#C9A84C] py-1 transition-colors" onClick={() => setMobileOpen(false)}>Stories</Link>
          <Link href="/genre/fiction" className="block text-[#888888] hover:text-[#C9A84C] py-1 transition-colors" onClick={() => setMobileOpen(false)}>Fiction</Link>
          <Link href="/genre/poetry" className="block text-[#888888] hover:text-[#C9A84C] py-1 transition-colors" onClick={() => setMobileOpen(false)}>Poetry</Link>
          <Link href="/genre/personal-essay" className="block text-[#888888] hover:text-[#C9A84C] py-1 transition-colors" onClick={() => setMobileOpen(false)}>Essays</Link>
          <Link href="/about" className="block text-[#888888] hover:text-[#C9A84C] py-1 transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
          <hr className="border-[#C9A84C]/20" />
          <Link href="/submit" className="block bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] text-center py-2 rounded-full font-bold text-sm tracking-wide transition-colors" onClick={() => setMobileOpen(false)}>
            Submit Your Story
          </Link>
          <Link href="/auth/login" className="block text-center text-[#888888] hover:text-white text-sm py-1 transition-colors" onClick={() => setMobileOpen(false)}>Sign In</Link>
        </div>
      )}
    </nav>
  );
}
