/**
 * Charlotte Smith Portfolio 2026 - Home Page
 * Design: Cinematic Dark Luxury
 * Palette: Obsidian (#0D0D0D) · Copper (#C87941) · Cream (#F2EFEA)
 * Typography: Cormorant Garamond (display) + Open Sans (body)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Mail, Phone, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { caseStudies, stats, capabilities, experience, operatingEnvironments } from "@/lib/data";
import ExecutionSection from "./Execution";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="font-['Open_Sans'] text-sm font-500 tracking-wide text-[#F2EFEA]">
          Charlotte Smith <span className="text-[#C87941]">/</span> Senior Marketing
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "approach", label: "Approach" },
            { id: "work", label: "Work" },
            { id: "capabilities", label: "Capabilities" },
            { id: "execution", label: "Campaigns" },
            { id: "credentials", label: "Credentials" },
            { id: "contact", label: "Contact" },
          ].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-['Open_Sans'] text-xs font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/60 hover:text-[#C87941] transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [heroCopied, setHeroCopied] = useState(false);

  function copyHeroLink() {
    navigator.clipboard.writeText('https://charlotte-smith-cv-portfolio-2026.vercel.app').then(() => {
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 2000);
    });
  }

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Real IDP brand hero background, hero-liquid-metal.jpg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/BnCfXYcnoHiDLUtj.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]/30 pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-px bg-[#C87941]" />
              <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
                Portfolio · 2026
              </span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(3rem,7vw,6rem)] font-600 leading-[1.05] text-[#F2EFEA] mb-6">
              Marketing built
              <br />
              for{" "}
              <em className="italic text-[#C87941]">commercial</em>
              <br />
              outcomes.
            </h1>
            <p className="font-['Open_Sans'] text-base text-[#F2EFEA]/65 leading-relaxed max-w-md mb-10">
              A senior marketing and brand strategist working at the intersection of brand, content,
              and growth. Nine years building communication systems that build credibility, for
              founders, agencies, and listed companies across the EU, UK, and Canada.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C87941] text-[#0A0A0A] font-['Open_Sans'] text-sm font-600 tracking-wide hover:bg-[#d4894e] transition-colors duration-200 active:scale-[0.97]"
              >
                View Selected Work
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#F2EFEA]/20 text-[#F2EFEA] font-['Open_Sans'] text-sm font-500 tracking-wide hover:border-[#C87941] hover:text-[#C87941] transition-colors duration-200"
              >
                Get in Touch
              </a>
              {/* Share on LinkedIn — hero */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://charlotte-smith-cv-portfolio-2026.vercel.app')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 text-[#F2EFEA]/40 font-['Open_Sans'] text-sm font-500 tracking-wide hover:border-[#0A66C2]/60 hover:text-[#0A66C2] transition-all duration-200"
                title="Share this portfolio on LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Share
              </a>
              {/* Copy Link — hero */}
              <button
                onClick={copyHeroLink}
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 text-[#F2EFEA]/40 font-['Open_Sans'] text-sm font-500 tracking-wide hover:border-[#F2EFEA]/30 hover:text-[#F2EFEA]/70 transition-all duration-200"
                title="Copy portfolio link to clipboard"
              >
                {heroCopied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Headshot placeholder + IDP site preview */}
          <div className="relative hidden lg:flex flex-col gap-6">

            {/* ── Headshot placeholder ── */}
            <div className="relative flex gap-5 items-start">
              {/* Portrait frame */}
              <div className="relative shrink-0" style={{ width: 180, height: 220 }}>
                {/* Outer copper border offset */}
                <div className="absolute -top-2 -left-2 w-full h-full border border-[#C87941]/30 pointer-events-none" />
                {/* Main frame */}
                <div className="w-full h-full border border-[#C87941]/50 overflow-hidden group/headshot">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/uGuxFSKwSXuvbklh.webp"
                    alt="Charlotte Smith, Senior Marketing and Brand Strategist"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/headshot:scale-[1.06]"
                  />
                </div>
                {/* Copper corner accents */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C87941]" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C87941]" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C87941]" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C87941]" />
              </div>

              {/* Name + title card beside portrait */}
              <div className="pt-2 flex flex-col gap-3">
                <div>
                  <p className="font-['Cormorant_Garamond'] text-2xl font-600 text-[#F2EFEA] leading-tight">Charlotte Smith</p>
                  <p className="font-['Open_Sans'] text-[0.65rem] tracking-[0.14em] uppercase text-[#C87941] mt-1">Executive Partner</p>
                  <p className="font-['Open_Sans'] text-[0.65rem] tracking-[0.14em] uppercase text-[#F2EFEA]/35">Ignite Digital Partners</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    "9+ Years Senior Marketing",
                    "5 Sectors · 3 Continents",
                    "15+ Brands Built",
                  ].map((stat) => (
                    <div key={stat} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#C87941] shrink-0" />
                      <span className="font-['Open_Sans'] text-[0.6rem] tracking-[0.08em] text-[#F2EFEA]/50">{stat}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-2 border-t border-white/8">
                  <p className="font-['Open_Sans'] text-[0.5rem] tracking-[0.12em] uppercase text-[#F2EFEA]/20">Malta · Remote · EU · UK · CA</p>
                </div>
              </div>
            </div>

            {/* ── IDP live site preview (smaller, below) ── */}
            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/tNbFZilSQHzkyiYN.png"
                  alt="Ignite Digital Partners"
                  className="h-6 w-auto opacity-80"
                />
              </div>
              <div className="relative overflow-hidden border border-[#C87941]/20 group/idp" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/AeBhiRWVsnwooZuh.png"
                  alt="ignitedigitalpartners.com live website"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/idp:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-['Open_Sans'] text-[0.55rem] tracking-[0.15em] uppercase text-[#C87941]">
                    ignitedigitalpartners.com
                  </span>
                  <a
                    href="https://www.ignitedigitalpartners.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Open_Sans'] text-[0.55rem] tracking-[0.12em] uppercase text-[#F2EFEA]/50 hover:text-[#C87941] transition-colors flex items-center gap-1"
                  >
                    Visit <ExternalLink size={9} />
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-[#C87941]/12 pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-[#0F0F0F] border-y border-white/5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <div className="font-['Cormorant_Garamond'] text-4xl font-600 text-[#C87941] mb-1">
                {s.value}
              </div>
              <div className="font-['Open_Sans'] text-[0.65rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Approach ──────────────────────────────────────────────────────────────────
function Approach() {
  const { ref, visible } = useReveal();
  return (
    <section id="approach" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 01 / Approach
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-8">
                How I work, briefly.
              </h2>
              <p className="font-['Open_Sans'] text-base text-[#F2EFEA]/65 leading-relaxed mb-6">
                Most marketing fails not because the tactics are wrong, but because it's run as
                campaigns instead of systems. Campaigns create moments. Systems create momentum. I
                spend my time bridging that gap: brand work that delivers, content that earns its
                place in the system, measurement that connects activity to confidence.
              </p>
              <p className="font-['Open_Sans'] text-base text-[#F2EFEA]/65 leading-relaxed mb-6">
                My background spans nine years across performance marketing, brand positioning,
                investor relations, and capital markets communications. I work equally with founders
                preparing for growth and listed companies positioning to capital.
              </p>
              <p className="font-['Open_Sans'] text-base text-[#F2EFEA]/65 leading-relaxed">
                Beyond client work, I run two businesses: Ignite Digital Partners, the strategic
                communication systems consultancy I founded, and Ezsy Webs, an AI-powered website
                platform for agencies. Both inform how I think about marketing as a commercial
                discipline.
              </p>
            </div>
            <div className="space-y-6">
              <div className="border border-white/8 p-6">
                <div className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-4">
                  IDP · The Ignition Loop
                </div>
                {[
                  { num: "i.", label: "Clarity", desc: "Strategic foundation, brand positioning, messaging architecture." },
                  { num: "ii.", label: "Activation", desc: "System deployment across channels and content." },
                  { num: "iii.", label: "Growth", desc: "Sustained momentum from consistent execution." },
                  { num: "iv.", label: "Insight", desc: "Intelligence gathering that feeds back into strategy." },
                  { num: "∞", label: "Back to Clarity", desc: "Continuous improvement, not reset." },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 py-3 border-b border-white/5 last:border-0">
                    <span className="font-['Cormorant_Garamond'] text-[#C87941] text-lg w-6 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <span className="font-['Open_Sans'] text-sm font-500 text-[#F2EFEA]">{item.label}. </span>
                      <span className="font-['Open_Sans'] text-sm text-[#F2EFEA]/55">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Work grid ─────────────────────────────────────────────────────────────────
function WorkCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link href={`/work/${cs.slug}`}>
        <div className="group relative overflow-hidden bg-[#111111] border border-white/5 card-lift cursor-pointer">
          {/* Screenshot */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={cs.heroImage}
              alt={cs.client}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
            {/* Accent color bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60" style={{ backgroundColor: cs.color }} />
            {/* Case number */}
            <div className="absolute top-4 left-4">
              <span
                className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase bg-[#0A0A0A]/70 px-2 py-1"
                style={{ color: cs.color }}
              >
                Case No. {cs.number}
              </span>
            </div>
            {/* Arrow on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: cs.color }}>
                <ArrowUpRight size={16} className="text-[#0A0A0A]" />
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="p-6">
            <div
              className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase mb-2"
              style={{ color: cs.color }}
            >
              {cs.category}
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-600 text-[#F2EFEA] mb-2 leading-tight">
              {cs.client}
            </h3>
            <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/55 leading-relaxed mb-4">
              {cs.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-wide uppercase px-2 py-1 border border-white/10 text-[#F2EFEA]/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="py-28 bg-[#080808]">
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-px bg-[#C87941]" />
          <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
            No. 02 / Selected Work
          </span>
        </div>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight">
            Six pieces,
            <br />
            each its own story.
          </h2>
          <p className="hidden md:block font-['Open_Sans'] text-sm text-[#F2EFEA]/40 max-w-xs text-right">
            Click any case study to read the full story, deliverables, and outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <WorkCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Capabilities ──────────────────────────────────────────────────────────────
function Capabilities() {
  const { ref, visible } = useReveal();
  return (
    <section id="capabilities" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 03 / Capabilities
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-12">
            A senior practice,
            <br />
            fully stacked.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-[#0A0A0A] p-8 hover:bg-[#111111] transition-colors duration-200 group">
                <div className="font-['Cormorant_Garamond'] text-3xl text-[#C87941]/40 mb-4 group-hover:text-[#C87941]/70 transition-colors duration-200">
                  {cap.roman}
                </div>
                <h3 className="font-['Open_Sans'] text-sm font-600 text-[#F2EFEA] mb-3 tracking-wide">
                  {cap.title}
                </h3>
                <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Credentials ───────────────────────────────────────────────────────────────
function Credentials() {
  const { ref, visible } = useReveal();
  return (
    <section id="credentials" className="py-28 bg-[#080808]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 04 / Credentials
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-12">
            Nine years, three companies,
            <br />
            one practice.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Experience timeline */}
            <div>
              <div className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-6">
                Experience
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[#C87941]/20" />
                <div className="space-y-0">
                  {experience.map((e, i) => (
                    <div key={i} className="relative pl-6 pb-8 last:pb-0">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#C87941]" />
                      <div className="font-['Open_Sans'] text-[0.65rem] font-500 tracking-[0.1em] uppercase text-[#F2EFEA]/35 mb-1">
                        {e.period}
                      </div>
                      <div className="font-['Open_Sans'] text-base font-500 text-[#F2EFEA] mb-0.5">
                        {e.title}
                      </div>
                      <div className="font-['Open_Sans'] text-sm text-[#C87941]">
                        {e.url ? (
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-1"
                          >
                            {e.company}
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          e.company
                        )}
                        {e.note && (
                          <span className="text-[#F2EFEA]/35 ml-2">{e.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operating environments */}
            <div>
              <div className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-6">
                Operating Environments
              </div>
              <div className="space-y-0">
                {operatingEnvironments.map((env) => (
                  <div
                    key={env.title}
                    className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C87941] mt-2 shrink-0" />
                    <div>
                      <div className="font-['Open_Sans'] text-sm font-500 text-[#F2EFEA] mb-0.5">
                        {env.title}
                      </div>
                      <div className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45">
                        {env.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 border border-white/8">
                <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 italic">
                  Full references available on request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ── Contact ──────────────────────────────────────────────────────────────────────
function Contact() {
  const [contactCopied, setContactCopied] = useState(false);

  function copyContactLink() {
    navigator.clipboard.writeText('https://charlotte-smith-cv-portfolio-2026.vercel.app').then(() => {
      setContactCopied(true);
      setTimeout(() => setContactCopied(false), 2000);
    });
  }

  const { ref, visible } = useReveal(); // Staggered reveal refs for each form field
  const { ref: refLabel, visible: visLabel } = useReveal(0);
  const { ref: refName, visible: visName } = useReveal(80);
  const { ref: refEmail, visible: visEmail } = useReveal(160);
  const { ref: refMsg, visible: visMsg } = useReveal(240);
  const { ref: refSubmit, visible: visSubmit } = useReveal(320);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please include a brief message.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/charlotte_smith@outlook.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio enquiry from ${form.name}`,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full bg-transparent border-b border-white/15 focus:border-[#C87941] outline-none font-['Open_Sans'] text-sm text-[#F2EFEA] placeholder-[#F2EFEA]/25 py-3 transition-colors duration-200";

  return (
    <section id="contact" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              Let's Talk
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: heading + contact details */}
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4.5rem)] font-600 text-[#F2EFEA] leading-tight mb-6">
                Currently exploring
                <br />
                <em className="italic text-[#C87941]">senior roles.</em>
              </h2>
              <p className="font-['Open_Sans'] text-base text-[#F2EFEA]/65 leading-relaxed max-w-md mb-10">
                Open to permanent, contract, and fractional engagements where strategic range,
                hands-on delivery, and commercial discipline matter equally.
              </p>
              <div className="space-y-0">
                {[
                  { icon: Mail, label: "Email", value: "charlotte_smith@outlook.com", href: "mailto:charlotte_smith@outlook.com" },
                  { icon: Phone, label: "Phone", value: "+356 99020986", href: "tel:+35699020986" },
                  { icon: Linkedin, label: "LinkedIn", value: "/charlotte-smith-marketing", href: "https://www.linkedin.com/in/charlotte-smith-marketing/" },
                  { icon: MapPin, label: "Location", value: "Birkirkara, Malta · Remote", href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 py-4 border-b border-white/5">
                    <div className="w-8 h-8 border border-[#C87941]/30 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#C87941]" />
                    </div>
                    <div>
                      <div className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/30 mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-['Open_Sans'] text-sm text-[#F2EFEA] hover:text-[#C87941] transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="font-['Open_Sans'] text-sm text-[#F2EFEA]">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
               </div>

              {/* Download buttons row */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/HVxJIetBGncQTqgA.pdf"
                  download="Charlotte_Smith_CV_2026.pdf"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#C87941] hover:bg-[#d4894e] text-[#0A0A0A] font-['Open_Sans'] text-sm font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1v9M8 10l-3-3M8 10l3-3M2 13h12" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download CV
                </a>
                <a
                  href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030957850/bFReHTwhFFEcabgB.pdf"
                  download="Charlotte_Smith_Portfolio_2026.pdf"
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-[#C87941]/60 hover:border-[#C87941] text-[#C87941] hover:text-[#d4894e] font-['Open_Sans'] text-sm font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1v9M8 10l-3-3M8 10l3-3M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Portfolio
                </a>
                {/* Share on LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://charlotte-smith-cv-portfolio-2026.vercel.app')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/15 hover:border-[#0A66C2]/70 text-[#F2EFEA]/50 hover:text-[#0A66C2] font-['Open_Sans'] text-sm font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  title="Share this portfolio on LinkedIn"
                >
                  {/* LinkedIn icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Share Portfolio
                </a>
                {/* Copy Link — contact */}
                <button
                  onClick={copyContactLink}
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/15 hover:border-[#F2EFEA]/30 text-[#F2EFEA]/50 hover:text-[#F2EFEA]/80 font-['Open_Sans'] text-sm font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  title="Copy portfolio link to clipboard"
                >
                  {contactCopied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
            {/* Right: contact form */}
            <div className="border border-white/8 p-8">
              {status === "sent" ? (
                <div className="flex flex-col items-start justify-center min-h-[380px] gap-5">
                  <div className="w-10 h-10 border border-[#C87941]/40 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9l4.5 4.5L15 5" stroke="#C87941" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-600 text-[#F2EFEA]">
                    Message sent.
                  </h3>
                  <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/55 leading-relaxed">
                    Thank you for reaching out. Charlotte will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-['Open_Sans'] text-xs font-600 tracking-[0.15em] uppercase text-[#C87941] hover:text-[#d4894e] transition-colors duration-200 mt-2"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div
                    ref={refLabel}
                    style={{
                      opacity: visLabel ? 1 : 0,
                      transform: visLabel ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                    className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941] mb-2"
                  >
                    Send a message
                  </div>

                  {/* Name */}
                  <div
                    ref={refName}
                    style={{
                      opacity: visName ? 1 : 0,
                      transform: visName ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <label className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/30 block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: undefined })); }}
                      className={inputBase}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="font-['Open_Sans'] text-[0.6rem] text-red-400 mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    ref={refEmail}
                    style={{
                      opacity: visEmail ? 1 : 0,
                      transform: visEmail ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <label className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/30 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                      className={inputBase}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="font-['Open_Sans'] text-[0.6rem] text-red-400 mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div
                    ref={refMsg}
                    style={{
                      opacity: visMsg ? 1 : 0,
                      transform: visMsg ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <label className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/30 block mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about the role or project..."
                      value={form.message}
                      onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: undefined })); }}
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && (
                      <p className="font-['Open_Sans'] text-[0.6rem] text-red-400 mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div
                    ref={refSubmit}
                    style={{
                      opacity: visSubmit ? 1 : 0,
                      transform: visSubmit ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#C87941] text-[#0A0A0A] font-['Open_Sans'] text-sm font-600 tracking-wide hover:bg-[#d4894e] transition-colors duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="font-['Open_Sans'] text-[0.65rem] text-red-400 text-center">
                      Something went wrong. Please try again or email hello@ignitedigitalpartners.com
                    </p>
                  )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 bg-[#080808] border-t border-white/5">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25">
          Charlotte Smith · Portfolio MMXXVI · Crafted in Malta
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/charlotte-smith-marketing/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://ignitedigitalpartners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            IDP
          </a>
          <a
            href="https://ezsywebs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            Ezsy Webs
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Scroll To Top ───────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      // Fade in after user scrolls past ~100vh (the hero section)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center border border-[#C87941]/50 bg-[#0A0A0A]/80 backdrop-blur-sm text-[#C87941] hover:bg-[#C87941] hover:text-[#0A0A0A] hover:border-[#C87941] active:scale-[0.94] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 300ms cubic-bezier(0.23,1,0.32,1), transform 300ms cubic-bezier(0.23,1,0.32,1), background-color 200ms ease, color 200ms ease, border-color 200ms ease",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11V3M7 3L3 7M7 3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero />
      <StatsBar />
      <Approach />
      <Work />
      <Capabilities />
      <ExecutionSection />
      <Credentials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
