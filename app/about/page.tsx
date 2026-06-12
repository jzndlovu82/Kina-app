import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#0D0D0D] text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)"
        }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-5">An Arkina Studios Platform</p>
          <h1 className="font-display text-5xl font-bold mb-5 text-white">About Kina</h1>
          <div className="gold-line max-w-xs mx-auto mb-5" />
          <p className="text-[#888888] text-lg italic font-display">"Where Stories Live"</p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="story-body space-y-6">
          <p className="text-xl font-display font-semibold text-white leading-relaxed">
            Kina was built on a simple belief: every person carries a story worth telling.
          </p>
          <p>
            The word <em>Kina</em> means many things across the world — it is currency in Papua New Guinea, representing value and worth. It is silk in Japanese, suggesting elegance and natural beauty. It is henna in Turkish — art drawn on skin, marking ceremony and identity.
          </p>
          <p>
            We chose this name because great stories do all of those things. They are currency — they hold value and get passed between people. They are silk — beautiful, carefully crafted. They are henna — they mark you, change you, stay with you long after you've read the last line.
          </p>
          <p>
            Kina is a platform for fiction, poetry, personal essays, folklore, flash fiction, drama, and every form in between. We don't have a narrow idea of what "good writing" looks like. We believe the best writing is the writing that is most true to itself.
          </p>
          <p>
            We are building this for the writer in a Lagos flat at 2am, the poet in Glasgow who has never shared a word publicly, the grandmother in Nairobi whose stories have only ever been told out loud. We are building this for every voice that deserves a platform.
          </p>
          <p className="font-semibold text-[#C9A84C] font-display text-lg">
            Kina is a product of Arkina Studios — a creative technology studio founded on family, legacy, and African rhythm.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
        <div className="bg-[#141414] border border-[#C9A84C]/20 text-white rounded-2xl p-10 hover:border-[#C9A84C]/40 transition-colors">
          <h2 className="font-display text-2xl font-bold mb-3">Ready to share your story?</h2>
          <p className="text-[#888888] text-sm mb-8">We read every submission. Every voice matters here.</p>
          <Link href="/submit" className="bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold px-8 py-3 rounded-full transition-colors inline-block tracking-wide">
            Submit Your Work
          </Link>
        </div>
      </section>

      {/* Arkina Studios credit */}
      <section className="border-t border-[#C9A84C]/10 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-[#555555] uppercase tracking-[0.2em] mb-2">A product of</p>
          <p className="font-display text-xl font-bold text-[#C9A84C]">Arkina Studios</p>
          <p className="text-xs text-[#444444] mt-1">Arkina Holdings Limited</p>
        </div>
      </section>
    </div>
  );
}
