/**
 * Charlotte Smith Portfolio 2026 — Execution Section
 * Design: Cinematic Dark Luxury
 * Palette: Obsidian (#0D0D0D) · Copper (#C87941) · Cream (#F2EFEA)
 * Typography: Cormorant Garamond (display) + Open Sans (body)
 *
 * Sub-sections:
 *  1. Tool Stack — visual grid of every tool used hands-on
 *  2. Motion Campaign — 10 Ignite branded video clips in a looping wall
 *  3. Social Content — 14 AI-generated social graphics carousel
 *  4. Infographic Design — 6 Vertui product infographics with lightbox
 *  5. Content Calendar — live link + screenshot to the Ignite content calendar
 */
import { useState, useRef, useEffect } from "react";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

// ── Scroll-reveal hook (local copy) ──────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) setTimeout(() => setVisible(true), delay);
          else setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

// ── Tool Stack data ───────────────────────────────────────────────────────────
const toolStack = [
  // AI & Automation
  { name: "Claude API", category: "AI & Automation", icon: "🤖" },
  { name: "n8n", category: "AI & Automation", icon: "⚡" },
  { name: "Make.com", category: "AI & Automation", icon: "🔄" },
  { name: "ChatGPT", category: "AI & Automation", icon: "💬" },
  // Content & Design
  { name: "Canva", category: "Content & Design", icon: "🎨" },
  { name: "Adobe Illustrator", category: "Content & Design", icon: "✏️" },
  { name: "Adobe Photoshop", category: "Content & Design", icon: "🖼️" },
  { name: "PowerPoint", category: "Content & Design", icon: "📊" },
  // Web & Product
  { name: "Lovable", category: "Web & Product", icon: "💜" },
  { name: "Supabase", category: "Web & Product", icon: "🗄️" },
  { name: "Stripe", category: "Web & Product", icon: "💳" },
  { name: "Vercel", category: "Web & Product", icon: "▲" },
  // Content & Distribution
  { name: "LinkedIn", category: "Content & Distribution", icon: "🔗" },
  { name: "Buffer", category: "Content & Distribution", icon: "📅" },
  { name: "Notion", category: "Content & Distribution", icon: "📝" },
  { name: "Resend", category: "Content & Distribution", icon: "📧" },
  // Analytics & CRM
  { name: "Google Analytics", category: "Analytics & CRM", icon: "📈" },
  { name: "HubSpot", category: "Analytics & CRM", icon: "🧲" },
  { name: "Airtable", category: "Analytics & CRM", icon: "📋" },
  { name: "Slack", category: "Analytics & CRM", icon: "💬" },
];

const toolCategories = ["AI & Automation", "Content & Design", "Web & Product", "Content & Distribution", "Analytics & CRM"];

// ── Motion videos data ────────────────────────────────────────────────────────
const motionVideos = [
  { src: "/manus-storage/ignite-v9-curve_3a5022b0.mp4", title: "The Curve", subtitle: "Growth trajectory narrative" },
  { src: "/manus-storage/ignite-v10-stages_92ccf87f.mp4", title: "Stages", subtitle: "Ignition Loop phase reveal" },
  { src: "/manus-storage/ignite-v11-noise_abbd3ce4.mp4", title: "Noise", subtitle: "Signal vs noise positioning" },
  { src: "/manus-storage/ignite-v12-boards_8cfb1974.mp4", title: "Boards", subtitle: "Capital markets communication" },
  { src: "/manus-storage/ignite-v13-trust_36e6e790.mp4", title: "Trust", subtitle: "Credibility infrastructure" },
  { src: "/manus-storage/ignite-v14-spark_0b05d500.mp4", title: "Spark", subtitle: "Brand activation moment" },
  { src: "/manus-storage/ignite-v15-industry_d494cf27.mp4", title: "Industry", subtitle: "Sector-specific positioning" },
  { src: "/manus-storage/ignite-v16-refusal_f616d5da.mp4", title: "Refusal", subtitle: "Against generic marketing" },
  { src: "/manus-storage/ignite-v17-os_18c13a25.mp4", title: "Operating System", subtitle: "The IDP methodology" },
  { src: "/manus-storage/ignite-v18-iq_60945521.mp4", title: "IQ", subtitle: "Intelligence-led growth" },
];

// ── Social content images ─────────────────────────────────────────────────────
const socialImages = [
  { src: "/manus-storage/ChatGPTImageMar24,2026,03_16_41PM_6f09ece3.png", caption: "Systems thinking — LinkedIn carousel" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,03_21_30PM_ffd1cb34.png", caption: "Brand credibility — thought leadership post" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,03_44_07PM_99307e23.png", caption: "Capital markets — investor communications" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,04_40_31PM_c1b3bb44.png", caption: "AI automation — content pipeline post" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,04_50_00PM_0a86b7b3.png", caption: "Operator intelligence — B2B leadership" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_06_39PM_5d6fad30.png", caption: "Market commentary — sector insight" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_14_23PM_197c1584.png", caption: "Growth momentum — performance post" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_21_15PM_d130aa08.png", caption: "Brand narrative — positioning carousel" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_22_46PM_acf3093b.png", caption: "Communication infrastructure — IDP pillar" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_42_51PM_98f9fca6.png", caption: "Ignition Loop — methodology visual" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_44_27PM_95dac21e.png", caption: "Content engine — always-on system" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_46_05PM_f345cb33.png", caption: "Credibility stack — brand authority" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,05_50_19PM_cf998c97.png", caption: "Intelligence layer — Ignite IQ" },
  { src: "/manus-storage/ChatGPTImageMar24,2026,06_42_25PM_20d4ee42.png", caption: "Ecosystem framework — full-funnel view" },
];

// ── Vertui infographics ───────────────────────────────────────────────────────
const vertuiInfographics = [
  { src: "/manus-storage/VERTUI-CANOPY_Infographic_Usage_EN_v1.0_bf968cfd.png", title: "CANOPY", subtitle: "Usage Guide", product: "Vertui" },
  { src: "/manus-storage/VERTUI-CANOPY_Infographic_Benefit_EN_v1.0_80426be1.png", title: "CANOPY", subtitle: "Benefits", product: "Vertui" },
  { src: "/manus-storage/VERTUI-MYCROSPORA_Infographic_Usage_EN_v1.0_08f8850a.png", title: "MYCROSPORA", subtitle: "Usage Guide", product: "Vertui" },
  { src: "/manus-storage/VERTUI-MYCROSPORA_Infographic_Benefit_EN_v1.0_97a46ada.png", title: "MYCROSPORA", subtitle: "Benefits", product: "Vertui" },
  { src: "/manus-storage/VERTUI-SOIL_Infographic_Usage_EN_v1.0_5945ee7a.png", title: "SOIL", subtitle: "Usage Guide", product: "Vertui" },
  { src: "/manus-storage/VERTUI-SOIL_Infographic_Benefit_EN_v1.0_fc891dba.png", title: "SOIL", subtitle: "Benefits", product: "Vertui" },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-[#F2EFEA]/60 hover:text-[#C87941] hover:border-[#C87941]/50 transition-colors duration-200"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <img
        src={src}
        alt="Full size"
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// ── 1. Tool Stack ─────────────────────────────────────────────────────────────
function ToolStack() {
  const { ref, visible } = useReveal();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? toolStack.filter((t) => t.category === activeCategory)
    : toolStack;

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="block w-6 h-px bg-[#C87941]/50" />
        <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
          Tool Stack
        </span>
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.8rem)] font-600 text-[#F2EFEA] leading-tight mb-2">
        Every tool, used hands-on.
      </h3>
      <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-2xl mb-8">
        Not a list of things I have heard of. These are the platforms I operate daily to build, automate, and distribute.
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.12em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
            !activeCategory
              ? "border-[#C87941] text-[#C87941] bg-[#C87941]/10"
              : "border-white/15 text-[#F2EFEA]/40 hover:border-[#C87941]/40 hover:text-[#C87941]/70"
          }`}
        >
          All
        </button>
        {toolCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.12em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
              activeCategory === cat
                ? "border-[#C87941] text-[#C87941] bg-[#C87941]/10"
                : "border-white/15 text-[#F2EFEA]/40 hover:border-[#C87941]/40 hover:text-[#C87941]/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5">
        {filtered.map((tool) => (
          <div
            key={tool.name}
            className="bg-[#0A0A0A] hover:bg-[#111111] p-5 group transition-colors duration-200 flex flex-col gap-2"
          >
            <span className="text-2xl">{tool.icon}</span>
            <div className="font-['Open_Sans'] text-sm font-500 text-[#F2EFEA] group-hover:text-[#C87941] transition-colors duration-200">
              {tool.name}
            </div>
            <div className="font-['Open_Sans'] text-[0.6rem] font-500 tracking-[0.1em] uppercase text-[#F2EFEA]/30">
              {tool.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 2. Motion Campaign ────────────────────────────────────────────────────────
function MotionCampaign() {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="block w-6 h-px bg-[#C87941]/50" />
        <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
          Motion Campaign
        </span>
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.8rem)] font-600 text-[#F2EFEA] leading-tight mb-2">
        Ignite Digital Partners.
        <br />
        <em className="italic text-[#C87941]">10 motion assets, one brand voice.</em>
      </h3>
      <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-2xl mb-8">
        Produced for IDP's LinkedIn campaign. Each clip is a standalone brand statement, designed to run in a content engine without daily input.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {motionVideos.map((v, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-[#111111] border border-white/5 hover:border-[#C87941]/30 transition-all duration-300"
            style={{ aspectRatio: "9/16" }}
          >
            <video
              src={v.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.1em] uppercase text-[#C87941] mb-0.5">
                V{i + 9}
              </div>
              <div className="font-['Open_Sans'] text-xs font-500 text-[#F2EFEA] leading-tight">
                {v.title}
              </div>
              <div className="font-['Open_Sans'] text-[0.6rem] text-[#F2EFEA]/40 leading-tight mt-0.5">
                {v.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3. Social Content Carousel ────────────────────────────────────────────────
function SocialContent() {
  const { ref, visible } = useReveal();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleCount = 4; // cards visible at once on desktop

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(socialImages.length - visibleCount, i + 1));

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      <div className="flex items-start justify-between mb-3 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-6 h-px bg-[#C87941]/50" />
            <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
              Social Content
            </span>
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.8rem)] font-600 text-[#F2EFEA] leading-tight mb-2">
            14 posts.
            <br />
            <em className="italic text-[#C87941]">Four pillars, one engine.</em>
          </h3>
          <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-2xl mb-6">
            LinkedIn-led content designed for B2B leadership audiences. Systems thinking, brand credibility, AI automation, and market commentary.
          </p>
        </div>
        {/* Nav arrows */}
        <div className="flex gap-2 mt-8 shrink-0">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-[#F2EFEA]/50 hover:border-[#C87941]/50 hover:text-[#C87941] disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= socialImages.length - visibleCount}
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-[#F2EFEA]/50 hover:border-[#C87941]/50 hover:text-[#C87941] disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 transition-transform duration-500"
          style={{ transform: `translateX(calc(-${currentIndex} * (25% + 0.75rem)))` }}
        >
          {socialImages.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[calc(25%-0.5625rem)] cursor-pointer group relative overflow-hidden border border-white/5 hover:border-[#C87941]/30 transition-all duration-300"
              style={{ aspectRatio: "1/1" }}
              onClick={() => setLightboxSrc(img.src)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-['Open_Sans'] text-[0.65rem] text-[#F2EFEA]/80 leading-tight">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4">
        {Array.from({ length: socialImages.length - visibleCount + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-px transition-all duration-300 ${i === currentIndex ? "w-8 bg-[#C87941]" : "w-3 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── 4. Infographic Design ─────────────────────────────────────────────────────
function InfographicDesign() {
  const { ref, visible } = useReveal();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      <div className="flex items-center gap-3 mb-3">
        <span className="block w-6 h-px bg-[#C87941]/50" />
        <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
          Infographic Design
        </span>
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.8rem)] font-600 text-[#F2EFEA] leading-tight mb-2">
        Vertui Horticulture.
        <br />
        <em className="italic text-[#C87941]">Science made visual.</em>
      </h3>
      <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-2xl mb-8">
        Six product infographics across three Vertui product lines: CANOPY, MYCROSPORA, and SOIL. Usage guides and benefit sheets designed for B2C retail and professional grower audiences.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {vertuiInfographics.map((inf, i) => (
          <div
            key={i}
            className="group cursor-pointer relative overflow-hidden border border-white/5 hover:border-[#C87941]/30 transition-all duration-300 bg-[#111111]"
            onClick={() => setLightboxSrc(inf.src)}
          >
            <img
              src={inf.src}
              alt={`${inf.title} ${inf.subtitle}`}
              className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              style={{ aspectRatio: "3/4" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-0.5">
                {inf.product}
              </div>
              <div className="font-['Open_Sans'] text-sm font-500 text-[#F2EFEA]">
                {inf.title}
              </div>
              <div className="font-['Open_Sans'] text-xs text-[#F2EFEA]/50">
                {inf.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 5. Content Calendar ───────────────────────────────────────────────────────
function ContentCalendar() {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="block w-6 h-px bg-[#C87941]/50" />
        <span className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.18em] uppercase text-[#C87941]/70">
          Content Calendar
        </span>
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.8rem)] font-600 text-[#F2EFEA] leading-tight mb-2">
        8 weeks of content.
        <br />
        <em className="italic text-[#C87941]">Built to run without daily input.</em>
      </h3>
      <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-2xl mb-8">
        The Ignite Digital Partners content calendar: 8 weeks, 4 pillars, 3 platforms. Platform-specific captions for LinkedIn, Facebook, and Instagram with copy-to-clipboard and week navigation. Built and shipped as a live tool.
      </p>

      {/* Calendar preview embed */}
      <div className="relative border border-white/8 overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <iframe
          src="https://ignitecalend-lwxi6xns.manus.space"
          title="Ignite Digital Partners Content Calendar"
          className="w-full h-full border-0"
          loading="lazy"
        />
        {/* Overlay with CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent p-6 flex items-end justify-between">
          <div>
            <div className="font-['Open_Sans'] text-xs font-500 text-[#F2EFEA]/50 mb-1">
              Live tool — built with React
            </div>
            <div className="font-['Open_Sans'] text-sm font-500 text-[#F2EFEA]">
              Ignite Digital Partners Content Calendar
            </div>
          </div>
          <a
            href="https://ignitecalend-lwxi6xns.manus.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C87941] hover:bg-[#d4894e] text-[#0A0A0A] font-['Open_Sans'] text-xs font-600 tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            Open Live
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-white/5 mt-4">
        {[
          { value: "8", label: "Weeks of Content" },
          { value: "4", label: "Content Pillars" },
          { value: "3", label: "Platforms" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0A0A0A] p-5 text-center">
            <div className="font-['Cormorant_Garamond'] text-3xl font-600 text-[#C87941] mb-1">{s.value}</div>
            <div className="font-['Open_Sans'] text-[0.6rem] font-600 tracking-[0.12em] uppercase text-[#F2EFEA]/35">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Execution Section ────────────────────────────────────────────────────
export default function Execution() {
  const { ref, visible } = useReveal();

  return (
    <section id="execution" className="py-28 bg-[#080808]">
      <div className="container">
        {/* Section header */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Open_Sans'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 04 / Execution
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight">
              Not just strategy.
              <br />
              <em className="italic text-[#C87941]">Hands-on delivery.</em>
            </h2>
            <p className="font-['Open_Sans'] text-sm text-[#F2EFEA]/45 leading-relaxed max-w-sm md:text-right">
              Tool stack, motion campaigns, social content, infographic design, and live content systems. Built and shipped.
            </p>
          </div>
        </div>

        {/* Sub-sections: 2 per row grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
          {/* Row 1 */}
          <div className="bg-[#080808] p-10 lg:p-14">
            <ToolStack />
          </div>
          <div className="bg-[#080808] p-10 lg:p-14 border-l-0 lg:border-l border-white/5">
            <MotionCampaign />
          </div>
          {/* Row 2 */}
          <div className="bg-[#080808] p-10 lg:p-14 border-t border-white/5">
            <SocialContent />
          </div>
          <div className="bg-[#080808] p-10 lg:p-14 border-t border-white/5 border-l-0 lg:border-l">
            <InfographicDesign />
          </div>
          {/* Row 3 — full width */}
          <div className="bg-[#080808] p-10 lg:p-14 border-t border-white/5 lg:col-span-2">
            <ContentCalendar />
          </div>
        </div>
      </div>
    </section>
  );
}
