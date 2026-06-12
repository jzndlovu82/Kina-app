import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#F5F0EB] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A2E] text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">An Arkina Studios Platform</p>
          <h1 className="font-display text-5xl font-bold mb-4">About Kina</h1>
          <p className="text-gray-300 text-lg italic font-display">"Where Stories Live"</p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="story-body space-y-6 text-[#333]">
          <p className="text-xl font-display font-semibold text-[#1A1A2E] leading-relaxed">
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
          <p className="font-semibold text-[#1A1A2E] font-display text-lg">
            Kina is a product of Arkina Studios — a creative technology studio founded on family, legacy, and African rhythm.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
        <div className="bg-[#1A1A2E] text-white rounded-2xl p-10">
          <h2 className="font-display text-2xl font-bold mb-3">Ready to share your story?</h2>
          <p className="text-gray-300 text-sm mb-6">We read every submission. Every voice matters here.</p>
          <Link href="/submit" className="bg-[#E94560] hover:bg-[#d13a52] text-white font-bold px-8 py-3 rounded-full transition-colors inline-block">
            Submit Your Work
          </Link>
        </div>
      </section>

      {/* Arkina Studios credit */}
      <section className="border-t border-gray-200 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">A product of</p>
          <p className="font-display text-xl font-bold text-[#1A1A2E]">Arkina Studios</p>
          <p className="text-xs text-gray-400 mt-1">Arkina Holdings Limited</p>
        </div>
      </section>
    </div>
  );
}
