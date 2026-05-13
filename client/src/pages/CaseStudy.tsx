/**
 * Charlotte Smith Portfolio 2026 — Case Study Page
 * Design: Cinematic Dark Luxury
 * Palette: Obsidian · Copper · Cream
 * Each case study uses its own brand accent color from data.ts
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getCaseStudy } from "@/lib/data";
import { useState } from "react";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug ?? "");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

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

  const accent = cs.color;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Design preview"
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white font-['Outfit'] text-sm tracking-widest uppercase"
            onClick={() => setLightboxImg(null)}
          >
            Close
          </button>
        </div>
      )}

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

      {/* Hero — real Canva design as full-bleed background */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative" style={{ minHeight: "75vh" }}>
          <img
            src={cs.heroImage}
            alt={cs.client}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Gradient overlay using client accent color */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${accent}22 0%, #0A0A0A88 40%, #0A0A0A 100%)`,
            }}
          />
          <div className="relative z-10 container flex flex-col justify-end pb-16" style={{ minHeight: "75vh" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px" style={{ backgroundColor: accent }} />
              <span
                className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
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
                      <em className="italic" style={{ color: accent }}>
                        {cs.tagline.split(",").slice(1).join(",").trim()}
                      </em>
                    </>
                  )}
                </h1>
              </div>
              <div className="space-y-0">
                {[
                  { label: "Client", value: cs.client },
                  { label: "Period", value: cs.period },
                  { label: "Scope", value: cs.scope },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-baseline gap-4 py-3 border-b border-white/10">
                    <span
                      className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase w-20 shrink-0"
                      style={{ color: accent }}
                    >
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
                      className="inline-flex items-center gap-2 font-['Outfit'] text-xs font-600 tracking-[0.12em] uppercase transition-colors duration-200"
                      style={{ color: accent }}
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

      {/* Brand Color Swatches */}
      {cs.brandColors && cs.brandColors.length > 0 && (
        <section className="py-10 bg-[#0A0A0A] border-b border-white/5">
          <div className="container">
            <div
              className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-5"
              style={{ color: accent }}
            >
              Brand Palette
            </div>
            <div className="flex flex-wrap gap-4">
              {cs.brandColors.map((c) => (
                <div key={c.hex} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 border border-white/10 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <div className="font-['Outfit'] text-[0.65rem] font-600 text-[#F2EFEA]/70">{c.name}</div>
                    <div className="font-['Outfit'] text-[0.55rem] tracking-widest text-[#F2EFEA]/30 uppercase">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brief */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <div className="max-w-3xl">
            <div
              className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-6"
              style={{ color: accent }}
            >
              The Brief
            </div>
            <p className="font-['Cormorant_Garamond'] text-2xl font-400 text-[#F2EFEA]/80 leading-relaxed">
              {cs.brief}
            </p>
          </div>
        </div>
      </section>

      {/* Real Canva Work Gallery */}
      {cs.canvaGallery && cs.canvaGallery.length > 0 && (
        <section className="py-20 bg-[#060606]">
          <div className="container">
            <div
              className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-2"
              style={{ color: accent }}
            >
              Real Work — From Canva
            </div>
            <p className="font-['Outfit'] text-sm text-[#F2EFEA]/35 mb-8">
              Actual design deliverables produced for this engagement. Click any image to enlarge.
            </p>
            <div
              className={`grid gap-4 ${
                cs.canvaGallery.length === 1
                  ? "grid-cols-1 max-w-lg"
                  : cs.canvaGallery.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : cs.canvaGallery.length <= 4
                  ? "grid-cols-2 md:grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {cs.canvaGallery.map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300"
                  onClick={() => setLightboxImg(item.url)}
                >
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.1em] uppercase text-white/80">
                        {item.caption}
                      </p>
                    </div>
                    {/* Expand icon */}
                    <div
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: accent + "CC" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1h4M1 1v4M11 1H7M11 1v4M1 11h4M1 11V7M11 11H7M11 11V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-3 bg-[#0A0A0A]">
                    <p className="font-['Outfit'] text-[0.6rem] text-[#F2EFEA]/40 truncate">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IDP Ignition Loop — special section for IDP case study */}
      {cs.slug === "idp" && (
        <section className="py-20 bg-[#060606]">
          <div className="container">
            <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-2" style={{ color: accent }}>
              The Ignition Loop
            </div>
            <p className="font-['Cormorant_Garamond'] text-2xl text-[#F2EFEA]/70 mb-12 max-w-2xl">
              A four-phase continuous intelligence system. Each phase feeds measurable intelligence into the next.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {[
                {
                  phase: "01",
                  name: "Clarity",
                  symbol: "◈",
                  description: "Define brand positioning, messaging architecture, and strategic foundations. Audit existing infrastructure. Establish narrative architecture and analytics baselines.",
                  timeline: "Month 1",
                },
                {
                  phase: "02",
                  name: "Activation",
                  symbol: "◇",
                  description: "Deploy CRM, tracking, and campaign infrastructure. Launch initial audience acquisition. Remove vendor chaos and activate the system.",
                  timeline: "Month 2",
                },
                {
                  phase: "03",
                  name: "Growth",
                  symbol: "△",
                  description: "Execute 90-day content cycles. Expand retargeting pools. Optimise funnels against benchmarks. Compound search authority and stakeholder familiarity.",
                  timeline: "Months 3-6",
                },
                {
                  phase: "04",
                  name: "Insight",
                  symbol: "○",
                  description: "Continuous KPI benchmarking, sentiment tracking, and strategic recalibration each cycle. Removes uncertainty. Feeds intelligence back into Clarity.",
                  timeline: "Ongoing",
                },
              ].map((p) => (
                <div key={p.phase} className="bg-[#060606] p-8 hover:bg-[#0f0f0f] transition-colors duration-200">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-['Cormorant_Garamond'] text-5xl" style={{ color: accent + "33" }}>{p.symbol}</span>
                    <span className="font-['Outfit'] text-[0.55rem] tracking-[0.15em] uppercase text-[#F2EFEA]/25 mt-1">{p.timeline}</span>
                  </div>
                  <div className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase mb-1" style={{ color: accent }}>Phase {p.phase}</div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-600 text-[#F2EFEA] mb-4">{p.name}</h3>
                  <p className="font-['Outfit'] text-sm text-[#F2EFEA]/45 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="font-['Outfit'] text-sm text-[#F2EFEA]/30 max-w-2xl">
                Unlike campaign-based agencies that reset each quarter, the Ignition Loop is a continuous architecture. It captures data, refines narrative, compounds audience quality, and delivers executive-grade intelligence. Every cycle builds on the last.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Multi-client live website gallery */}
      {cs.slug === "multi-client" && (
        <section className="py-12 bg-[#080808]">
          <div className="container">
            <div
              className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-2"
              style={{ color: accent }}
            >
              Live Client Websites
            </div>
            <p className="font-['Outfit'] text-sm text-[#F2EFEA]/35 mb-8">
              Real websites built and managed across this client portfolio.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: "/manus-storage/screenshot_vertui_4b93e974.png", label: "Vertui Horticulture" },
                { src: "/manus-storage/screenshot_rockon_2b3229e3.png", label: "Roc-Kon Concrete" },
                { src: "/manus-storage/screenshot_ezsy_6ae0a407.png", label: "Ezsy Webs" },
                { src: "/manus-storage/screenshot_quest_fb32b013.png", label: "Quest Critical Metals" },
                { src: "/manus-storage/screenshot_oroco_f7dc4187.png", label: "Oroco Resource Corp" },
                { src: "/manus-storage/screenshot_moovly_78fa99a2.png", label: "Moovly" },
              ].map(({ src, label }) => (
                <div key={label} className="relative overflow-hidden group cursor-pointer border border-white/5" style={{ aspectRatio: "16/9" }}
                  onClick={() => setLightboxImg(src)}
                >
                  <img src={src} alt={label} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="font-['Outfit'] text-[0.55rem] font-600 tracking-[0.12em] uppercase" style={{ color: accent }}>{label}</span>
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
          <div
            className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-8"
            style={{ color: accent }}
          >
            What Was Built
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {cs.deliverables.map((d, i) => (
              <div key={i} className="bg-[#080808] p-8 hover:bg-[#0f0f0f] transition-colors duration-200">
                <div
                  className="font-['Cormorant_Garamond'] text-3xl mb-4"
                  style={{ color: accent + "4D" }}
                >
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
            <div
              className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase mb-8"
              style={{ color: accent }}
            >
              Selected Artefacts
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5 max-w-2xl">
              {cs.outcomes.map((o) => (
                <div key={o.label} className="bg-[#0A0A0A] p-8 text-center">
                  <div
                    className="font-['Cormorant_Garamond'] text-4xl font-600 mb-2"
                    style={{ color: accent }}
                  >
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
                <div
                  className="w-12 h-12 border flex items-center justify-center transition-all duration-200"
                  style={{ borderColor: accent + "4D" }}
                >
                  <ArrowRight size={20} style={{ color: accent }} />
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
