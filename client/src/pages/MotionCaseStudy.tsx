// Design: Dark editorial, copper accents, Cormorant Garamond display + Open Sans body
// Purpose: Dedicated case study page for each Ignite Digital Partners motion video

import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "wouter";

// ── Video case study data ─────────────────────────────────────────────────────
const motionCaseStudies: Record<string, {
  slug: string;
  version: string;
  title: string;
  subtitle: string;
  src: string;
  client: string;
  platform: string;
  format: string;
  year: string;
  brief: string;
  approach: string;
  outcome: string;
  tags: string[];
}> = {
  "the-curve": {
    slug: "the-curve",
    version: "V9",
    title: "The Curve",
    subtitle: "Growth trajectory narrative",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/kIKtJPrvXvmTLDFx.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Communicate IDP's core thesis: that brand credibility compounds over time, not linearly. The brief was to visualise the inflection point where consistent communication begins to accelerate results.",
    approach: "Used a kinetic typography approach with a slow curve reveal, building tension before the inflection point hits. The copper colour system reinforces warmth and authority. No voiceover — the motion and copy carry the message alone.",
    outcome: "Deployed as the opening asset in IDP's LinkedIn content engine. Anchored the 'compounding credibility' positioning that runs through the full campaign.",
    tags: ["Brand Positioning", "Motion Design", "LinkedIn", "Kinetic Typography"],
  },
  "stages": {
    slug: "stages",
    version: "V10",
    title: "Stages",
    subtitle: "Ignition Loop phase reveal",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/JTVZyflTHwqpdmHN.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Introduce the Ignition Loop — IDP's proprietary methodology — to a cold audience without overwhelming them. The goal was to make the framework feel intuitive and inevitable, not complex.",
    approach: "Sequential stage reveals with staggered timing create a sense of progression. Each phase name is introduced with a beat of silence before the next, giving the viewer time to absorb. The motion mirrors the loop concept: circular, continuous.",
    outcome: "Became the most-saved asset in the IDP campaign. Used as the primary methodology explainer in outbound sequences and proposal decks.",
    tags: ["Methodology", "Brand Education", "Motion Design", "IDP Framework"],
  },
  "noise": {
    slug: "noise",
    version: "V11",
    title: "Noise",
    subtitle: "Signal vs noise positioning",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/WxqfPgBSFiSWroZz.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Address the core objection IDP's target audience faces: the market is saturated with generic marketing content. Position IDP as the antidote — the signal in the noise.",
    approach: "Visual contrast technique: chaotic motion in the first half resolves into clean, deliberate typography. The transition is the message. Copy is minimal — three words do the work that a paragraph would dilute.",
    outcome: "High engagement from founders and operators who recognised the problem. Generated direct inbound from two qualified prospects within the first week of deployment.",
    tags: ["Positioning", "Competitor Contrast", "Motion Design", "B2B Marketing"],
  },
  "boards": {
    slug: "boards",
    version: "V12",
    title: "Boards",
    subtitle: "Capital markets communication",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/muPCzYLgyvPGlQgW.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Speak directly to listed companies and capital markets clients about the communication gap between management and shareholders. Position IDP as the specialist in this space.",
    approach: "Formal, measured motion pacing to match the boardroom register. Typography weight shifts from light to bold as the key message lands. The copper accent is used sparingly to signal authority without ostentation.",
    outcome: "Opened conversations with two ASX-listed companies. Became the anchor asset for IDP's capital markets service line positioning.",
    tags: ["Capital Markets", "ASX", "Investor Relations", "B2B"],
  },
  "trust": {
    slug: "trust",
    version: "V13",
    title: "Trust",
    subtitle: "Credibility infrastructure",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/dhVMrIZwPUHoPtJO.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Reframe trust from an abstract value to a structural output — something that is built deliberately through consistent communication, not earned passively over time.",
    approach: "The word 'Trust' is deconstructed and rebuilt letter by letter, mirroring the argument. Slow build, deliberate pace. The motion resists urgency — which is itself the message.",
    outcome: "Resonated strongly with professional services and advisory audiences. One of the highest save rates in the campaign series.",
    tags: ["Trust", "Brand Authority", "Professional Services", "Motion Design"],
  },
  "spark": {
    slug: "spark",
    version: "V14",
    title: "Spark",
    subtitle: "Brand activation moment",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/JGWcSETAzBVgKrVN.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Capture the moment a brand activates — the transition from invisible to visible, from passive to present. Designed as an awareness asset for founders who have not yet invested in brand.",
    approach: "Single ignition moment at the centre of the frame, expanding outward. The IDP flame motif is woven into the visual language. High contrast, fast reveal, then a slow hold on the outcome.",
    outcome: "Used as the top-of-funnel awareness asset in paid and organic distribution. Drove the highest click-through rate of any asset in the V9 to V18 series.",
    tags: ["Brand Activation", "Awareness", "Founders", "Top of Funnel"],
  },
  "industry": {
    slug: "industry",
    version: "V15",
    title: "Industry",
    subtitle: "Sector-specific positioning",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/AQJkMjlKtqtTLwqi.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Demonstrate IDP's depth across specific industries — mining, capital markets, SaaS, hospitality, and industrial. Counter the perception that marketing agencies are generalists.",
    approach: "Rapid sector name reveals with distinct visual weight for each. The pace accelerates as more sectors appear, building a sense of breadth without losing precision. Ends on a hold that invites the viewer to self-identify.",
    outcome: "Triggered direct messages from sector-specific prospects who recognised their industry in the list. Shortened the qualification conversation in follow-up calls.",
    tags: ["Sector Positioning", "Mining", "SaaS", "Capital Markets", "B2B"],
  },
  "refusal": {
    slug: "refusal",
    version: "V16",
    title: "Refusal",
    subtitle: "Against generic marketing",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/ceexXtWiCjURHzzJ.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Make a direct, unambiguous statement about what IDP refuses to do — generic templates, vanity metrics, disconnected tactics. A manifesto asset for the brand.",
    approach: "Strike-through typography as the primary visual device. Each refused item appears and is crossed out before the positive alternative is revealed. The motion is deliberate and unapologetic — no softening.",
    outcome: "Highest comment rate in the series. Polarising by design — attracted exactly the clients IDP wants and filtered out those who want cheap, fast, and generic.",
    tags: ["Brand Manifesto", "Positioning", "Anti-Generic", "Thought Leadership"],
  },
  "operating-system": {
    slug: "operating-system",
    version: "V17",
    title: "Operating System",
    subtitle: "The IDP methodology",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/dIaeLneQjRdcjNLc.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Introduce the concept of marketing as an operating system — not a campaign, not a tactic, but a permanent infrastructure layer that runs the business's communication. Reframe the buyer's mental model.",
    approach: "OS boot sequence visual metaphor. Text loads line by line as if initialising a system. The metaphor is technical enough to resonate with founders and operators, but accessible enough for non-technical audiences.",
    outcome: "Became the primary conceptual anchor for IDP's sales conversations. Prospects began using 'operating system' language in discovery calls, indicating the framing had landed.",
    tags: ["Methodology", "Brand Strategy", "Operating System", "Founder Audience"],
  },
  "iq": {
    slug: "iq",
    version: "V18",
    title: "IQ",
    subtitle: "Intelligence-led growth",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/NMIsEyfHJEINEWWy.mp4",
    client: "Ignite Digital Partners",
    platform: "LinkedIn",
    format: "Vertical motion asset · 9:16",
    year: "2026",
    brief: "Close the V9 to V18 series with a statement about intelligence — the idea that the best marketing is not louder, it is smarter. Introduce the Ignite IQ concept as the intelligence layer of the IDP system.",
    approach: "Minimalist. Single word, maximum weight. The motion is the slowest in the series — a deliberate contrast to the noise of the feed. The copper accent is used at full intensity for the first time in the series.",
    outcome: "Closed the campaign series and seeded the Ignite IQ product concept. Generated the most direct enquiries of any single asset, with prospects asking specifically about the intelligence layer.",
    tags: ["Intelligence", "Ignite IQ", "Campaign Closer", "Product Seeding"],
  },
};

// ── Page component ────────────────────────────────────────────────────────────
export default function MotionCaseStudy() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const study = motionCaseStudies[slug];

  if (!study) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/40 mb-4">Case study not found</p>
          <Link href="/#execution" className="font-['Open_Sans'] text-xs font-600 tracking-[0.12em] uppercase text-[#C87941] hover:text-[#d4894e] transition-colors">
            Back to Execution
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/90 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <Link
            href="/#execution"
            className="inline-flex items-center gap-2 font-['Open_Sans'] text-xs font-600 tracking-[0.1em] uppercase text-[#F2EFEA]/50 hover:text-[#C87941] transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/60">
            Charlotte Smith · Motion Work
          </span>
        </div>
      </nav>

      {/* Hero — video + title */}
      <section className="pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-3.5rem)]">
          {/* Video column */}
          <div className="relative bg-[#0A0A0A] flex items-center justify-center p-8 lg:p-16">
            <div
              className="relative w-full max-w-[320px] mx-auto shadow-2xl"
              style={{ aspectRatio: "9/16" }}
            >
              <video
                src={study.src}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Version badge */}
              <div className="absolute top-4 left-4 bg-[#080808]/80 backdrop-blur-sm px-3 py-1.5 border border-[#C87941]/30">
                <span className="font-['Open_Sans'] text-[0.6rem] font-700 tracking-[0.18em] uppercase text-[#C87941]">
                  {study.version}
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-center p-8 lg:p-16 border-l border-white/5">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-[#C87941]" />
              <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
                Motion Case Study
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(3rem,6vw,5rem)] font-600 text-[#F2EFEA] leading-none mb-3">
              {study.title}
            </h1>
            <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed mb-10">
              {study.subtitle}
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-px bg-white/5 mb-10">
              {[
                { label: "Client", value: study.client },
                { label: "Platform", value: study.platform },
                { label: "Format", value: study.format },
                { label: "Year", value: study.year },
              ].map((m) => (
                <div key={m.label} className="bg-[#0A0A0A] p-4">
                  <div className="font-['Open_Sans'] text-[0.55rem] font-600 tracking-[0.14em] uppercase text-[#F2EFEA]/30 mb-1">
                    {m.label}
                  </div>
                  <div className="font-['Open_Sans'] text-xs text-[#F2EFEA]/80">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.1em] uppercase text-[#C87941]/70 border border-[#C87941]/20 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case study body */}
      <section className="py-20 border-t border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5">
            {/* Brief */}
            <div className="bg-[#080808] p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-6 h-px bg-[#C87941]/50" />
                <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
                  The Brief
                </span>
              </div>
              <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/65 leading-relaxed">
                {study.brief}
              </p>
            </div>

            {/* Approach */}
            <div className="bg-[#080808] p-10 lg:p-14 border-t lg:border-t-0 border-l-0 lg:border-l border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-6 h-px bg-[#C87941]/50" />
                <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
                  The Approach
                </span>
              </div>
              <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/65 leading-relaxed">
                {study.approach}
              </p>
            </div>

            {/* Outcome */}
            <div className="bg-[#080808] p-10 lg:p-14 border-t lg:border-t-0 border-l-0 lg:border-l border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-6 h-px bg-[#C87941]/50" />
                <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
                  The Outcome
                </span>
              </div>
              <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/65 leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other videos in series */}
      <section className="py-20 border-t border-white/5">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              More from the Series
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {Object.values(motionCaseStudies)
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link key={s.slug} href={`/motion/${s.slug}`}>
                  <div
                    className="group relative overflow-hidden bg-[#111111] border border-white/5 hover:border-[#C87941]/40 transition-all duration-300 cursor-pointer"
                    style={{ aspectRatio: "9/16" }}
                  >
                    <video
                      src={s.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="font-['Open_Sans'] text-[0.55rem] font-600 tracking-[0.1em] uppercase text-[#C87941] mb-0.5">
                        {s.version}
                      </div>
                      <div className="font-['Open_Sans'] text-[0.65rem] font-500 text-[#F2EFEA] leading-tight">
                        {s.title}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-['Cormorant_Garamond'] text-[clamp(1.5rem,3vw,2.2rem)] font-600 text-[#F2EFEA] leading-tight mb-1">
              Want work like this?
            </p>
            <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/40">
              Get in touch to discuss your brand communication system.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#C87941] hover:bg-[#d4894e] text-[#0A0A0A] font-['Open_Sans'] text-sm font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch
            </Link>
            <Link
              href="/#execution"
              className="inline-flex items-center gap-2 font-['Open_Sans'] text-xs font-600 tracking-[0.1em] uppercase text-[#F2EFEA]/50 hover:text-[#C87941] transition-colors duration-200"
            >
              <ExternalLink size={12} />
              View All Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
