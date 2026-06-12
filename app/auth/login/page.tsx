"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-bold text-white hover:text-[#C9A84C] transition-colors">Kina</Link>
          <p className="text-[#555555] text-xs mt-1 tracking-wide uppercase">by Arkina Studios</p>
          <p className="text-[#888888] text-sm mt-3">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="bg-[#141414] rounded-2xl p-8 border border-[#C9A84C]/15 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#0D0D0D] text-white placeholder-[#444444]"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#0D0D0D] text-white placeholder-[#444444]"
              placeholder="••••••••" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 tracking-wide">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-[#555555] mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#C9A84C] font-semibold hover:text-[#E5C97A] transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
