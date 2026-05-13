/**
 * Charlotte Smith Portfolio 2026 — Case Study Page
 * Design: Cinematic Dark Luxury
 * Palette: Obsidian · Copper · Cream
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getCaseStudy } from "@/lib/data";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug ?? "");

  if (!cs) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Outfit'] text-[#F2EFEA]/40 mb-4">Case study not found.</p>
          <Link href="/">
            <span className="font-['Outfit'] text-sm text-[#C87941] hover:underline cursor-pointer">
              Back to portfolio
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <span className="font-['Outfit'] text-sm text-[#F2EFEA]/60 hover:text-[#C87941] transition-colors duration-200 cursor-pointer flex items-center gap-2">
              <ArrowLeft size={14} />
              Charlotte Smith / Portfolio
            </span>
          </Link>
          <Link href="/#work">
            <span className="font-['Outfit'] text-xs font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/40 hover:text-[#C87941] transition-colors duration-200 cursor-pointer">
              All Work
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative" style={{ minHeight: "70vh" }}>
          <img
            src={cs.heroImage}
            alt={cs.client}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/50 to-[#0A0A0A]" />
          <div className="relative z-10 container flex flex-col justify-end pb-16" style={{ minHeight: "70vh" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-[#C87941]" />
              <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
                Case Study No. {cs.number} · {cs.category}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] font-600 text-[#F2EFEA] leading-tight">
                  {cs.tagline.split(",")[0]}
                  {cs.tagline.includes(",") && (
                    <>
                      ,<br />
                      <em className="italic text-[#C87941]">{cs.tagline.split(",").slice(1).join(",").trim()}</em>
                    </>
                  )}
                </h1>
              </div>
              <div className="space-y-0">
                {[
                  { label: cs.slug === "gcg" ? "Exchange" : cs.slug === "multi-client" ? "Roster" : cs.slug === "social" ? "Channels" : cs.slug === "brand-systems" ? "Practice" : "Client", value: cs.client },
                  { label: "Period", value: cs.period },
                  { label: "Scope", value: cs.scope },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-baseline gap-4 py-3 border-b border-white/10">
                    <span className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#C87941] w-20 shrink-0">
                      {label}
                    </span>
                    <span className="font-['Outfit'] text-sm italic text-[#F2EFEA]/80">{value}</span>
                  </div>
                ))}
                {cs.websiteUrl && (
                  <div className="pt-4">
                    <a
                      href={cs.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-['Outfit'] text-xs font-600 tracking-[0.12em] uppercase text-[#C87941] hover:text-[#d4894e] transition-colors duration-200"
                    >
                      Visit Live Site
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <div className="max-w-3xl">
            <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941] mb-6">
              The Brief
            </div>
            <p className="font-['Cormorant_Garamond'] text-2xl font-400 text-[#F2EFEA]/80 leading-relaxed">
              {cs.brief}
            </p>
          </div>
        </div>
      </section>

      {/* Multi-client gallery */}
      {cs.slug === "multi-client" && (
        <section className="py-12 bg-[#080808]">
          <div className="container">
            <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941] mb-6">
              Live Client Brands
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: "/manus-storage/screenshot_vertui_4b93e974.png", label: "Vertui Horticulture" },
                { src: "/manus-storage/screenshot_rockon_2b3229e3.png", label: "Roc-Kon Concrete" },
                { src: "/manus-storage/screenshot_ezsy_6ae0a407.png", label: "Ezsy Webs" },
                { src: "/manus-storage/screenshot_quest_fb32b013.png", label: "Quest Critical Metals" },
                { src: "/manus-storage/screenshot_oroco_f7dc4187.png", label: "Oroco Resource Corp" },
                { src: "/manus-storage/screenshot_moovly_78fa99a2.png", label: "Moovly" },
              ].map(({ src, label }) => (
                <div key={label} className="relative overflow-hidden group" style={{ aspectRatio: "16/9" }}>
                  <img src={src} alt={label} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="font-['Outfit'] text-[0.55rem] font-600 tracking-[0.12em] uppercase text-[#C87941]">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      <section className="py-20 bg-[#080808]">
        <div className="container">
          <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941] mb-8">
            What Was Built
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {cs.deliverables.map((d, i) => (
              <div key={i} className="bg-[#080808] p-8 hover:bg-[#0f0f0f] transition-colors duration-200">
                <div className="font-['Cormorant_Garamond'] text-3xl text-[#C87941]/30 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-['Outfit'] text-sm font-600 text-[#F2EFEA] mb-3">{d.title}</h3>
                <p className="font-['Outfit'] text-sm text-[#F2EFEA]/45 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      {cs.outcomes && (
        <section className="py-20 bg-[#0A0A0A]">
          <div className="container">
            <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941] mb-8">
              Selected Artefacts
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5 max-w-2xl">
              {cs.outcomes.map((o) => (
                <div key={o.label} className="bg-[#0A0A0A] p-8 text-center">
                  <div className="font-['Cormorant_Garamond'] text-4xl font-600 text-[#C87941] mb-2">
                    {o.metric}
                  </div>
                  <div className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/35">
                    {o.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next case study */}
      {cs.nextSlug && (
        <section className="py-20 bg-[#080808] border-t border-white/5">
          <div className="container">
            <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#F2EFEA]/25 mb-4">
              Next Case Study
            </div>
            <Link href={`/work/${cs.nextSlug}`}>
              <div className="group flex items-center justify-between cursor-pointer">
                <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-600 text-[#F2EFEA] group-hover:text-[#C87941] transition-colors duration-300">
                  {cs.nextClient}
                </h2>
                <div className="w-12 h-12 border border-[#C87941]/30 flex items-center justify-center group-hover:bg-[#C87941] group-hover:border-[#C87941] transition-all duration-200">
                  <ArrowRight size={20} className="text-[#C87941] group-hover:text-[#0A0A0A] transition-colors duration-200" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 bg-[#080808] border-t border-white/5">
        <div className="container flex items-center justify-between">
          <span className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25">
            Charlotte Smith · Portfolio MMXXVI
          </span>
          <Link href="/">
            <span className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200 cursor-pointer">
              Back to Portfolio
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
