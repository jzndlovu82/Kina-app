"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [success, setSuccess]     = useState(false);

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
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-[#1A1A2E] mb-2">Check your email</h2>
        <p className="text-gray-500 text-sm">We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
        <Link href="/" className="text-[#E94560] text-sm mt-4 block hover:underline">← Back to Kina</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-bold text-[#1A1A2E]">Kina</Link>
          <p className="text-gray-500 text-sm mt-1">Create your writer account</p>
        </div>
        <form onSubmit={handleSignup} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Display Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E94560]"
              placeholder="Your name on Kina" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E94560]"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E94560]"
              placeholder="At least 6 characters" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#1A1A2E] hover:bg-[#E94560] text-white font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#E94560] font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
