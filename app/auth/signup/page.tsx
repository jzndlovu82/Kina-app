"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: name } }
    });
    if (err) { setError(err.message); setLoading(false); return; }
    setSuccess(true);
  }

  if (success) return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <CheckCircle className="w-14 h-14 text-[#C9A84C] mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-[#888888] text-sm">We&apos;ve sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account.</p>
        <Link href="/" className="text-[#C9A84C] hover:text-[#E5C97A] text-sm mt-5 block transition-colors">← Back to Kina</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-bold text-white hover:text-[#C9A84C] transition-colors">Kina</Link>
          <p className="text-[#555555] text-xs mt-1 tracking-wide uppercase">by Arkina Studios</p>
          <p className="text-[#888888] text-sm mt-3">Create your writer account</p>
        </div>
        <form onSubmit={handleSignup} className="bg-[#141414] rounded-2xl p-8 border border-[#C9A84C]/15 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Display Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#0D0D0D] text-white placeholder-[#444444]"
              placeholder="Your name on Kina" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#0D0D0D] text-white placeholder-[#444444]"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#0D0D0D] text-white placeholder-[#444444]"
              placeholder="At least 6 characters" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 tracking-wide">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-[#555555] mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#C9A84C] font-semibold hover:text-[#E5C97A] transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
