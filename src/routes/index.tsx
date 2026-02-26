import { createSignal, Switch, Match, onMount, onCleanup } from "solid-js";
import ScrollReveal from "~/components/ScrollReveal";
import About from "~/components/About";
import Experience from "~/components/Experience";
import Projects from "~/components/Projects";
import Blogs from "~/components/Blogs";
import GitHubChart from "~/components/GitHubChart";
import TechArsenal from "~/components/TechArsenal";

type Tab = "about" | "experience" | "projects" | "blogs";

export default function Home() {
  const [activeTab, setActiveTab] = createSignal<Tab>("about");
  const [scrollY, setScrollY] = createSignal(0);
  const [nameSticky, setNameSticky] = createSignal(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" }
  ];

  const thisAndThat = [
    { emoji: "☕", text: "chai over coffee" },
    { emoji: "🖥️", text: "terminal over GUI" },
    { emoji: "🌙", text: "late nights over early mornings" },
    { emoji: "⚡", text: "performance over convenience" },
    { emoji: "🎧", text: "lo-fi over lyrics" },
    { emoji: "📖", text: "man pages over Stack Overflow" },
    { emoji: "🔧", text: "building tools over using tools" },
    { emoji: "🐧", text: "Linux over Windows" },
    { emoji: "🌊", text: "flow state over multitasking" },
    { emoji: "🤝", text: "collaboration over competition" },
  ];

  const socials = [
    { icon: "🐙", label: "GitHub", url: "https://github.com/HrushikeshAnandSarangi" },
    { icon: "💼", label: "LinkedIn", url: "https://linkedin.com/in/" },
    { icon: "🐦", label: "Twitter / X", url: "https://x.com/" },
    { icon: "📧", label: "Email", url: "mailto:hello@example.com" },
    { icon: "📄", label: "Resume", url: "#" },
  ];

  onMount(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Name becomes sticky after scrolling past ~200px
      setNameSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <div class="w-full flex flex-col items-center flex-1">
      {/* ═══════════════════════════════════════
          STICKY NAME HEADER
         ═══════════════════════════════════════ */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        class={`fixed top-0 left-0 right-0 z-50 flex justify-center py-3 transition-all duration-500 cursor-pointer ${nameSticky()
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <span
          class={`inline-flex px-6 py-2.5 rounded-full bg-[var(--color-accent-surface)] backdrop-blur-md border border-[var(--color-accent)]/20 shadow-lg transition-all duration-400 ${nameSticky()
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90"
            }`}
        >
          <span class="text-xs font-bold tracking-[0.25em] text-[var(--color-accent)]">
            HRUSHIKESH ANAND SARANGI
          </span>
        </span>
      </a>

      {/* ═══════════════════════════════════════
          HERO — Split layout with parallax
         ═══════════════════════════════════════ */}
      <section class="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Centered name at top of hero */}
        <p
          class={`text-sm font-semibold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-12 anim-hidden animate-fade-in text-center transition-opacity duration-500 ${nameSticky() ? "opacity-0" : "opacity-100"}`}
        >
          Hrushikesh Anand Sarangi
        </p>
        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 items-end">
          {/* Left — Bold headline with parallax */}
          <div
            class="md:col-span-3 flex flex-col justify-center"
            style={{ transform: `translateY(${scrollY() * 0.15}px)`, transition: "transform 0.1s linear" }}
          >
            <h1 class="heading-serif text-5xl md:text-6xl lg:text-7xl text-[var(--color-text)] leading-[1.1] mb-8 anim-hidden animate-slide-up delay-1">
              I architect and{" "}
              <span class="font-mono text-[var(--color-accent)] font-normal tracking-tight">engineer()</span>
              {" "}systems — from low-level internals to scalable infrastructure.
            </h1>
          </div>

          {/* Right — Full-height waving avatar with parallax */}
          <div
            class="md:col-span-2 flex justify-center md:justify-end items-end anim-hidden animate-scale-in delay-2"
            style={{ transform: `translateY(${scrollY() * -0.1}px)`, transition: "transform 0.1s linear" }}
          >
            <img
              src="/avatar.png"
              alt="Hrushikesh — waving hello"
              class="w-auto object-contain object-bottom"
              style={{ height: "85vh", "max-height": "85vh", "mix-blend-mode": "multiply" }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          JOKE STRIP — AI slop pun
         ═══════════════════════════════════════ */}
      <section class="w-full bg-[var(--color-deep)] py-16 md:py-20 px-6">
        <p class="text-center text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-accent-light)]/60 mb-8 italic" style={{ "font-family": "'Playfair Display', Georgia, serif" }}>
          A small pun
        </p>
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* Quote */}
          <ScrollReveal delay={0.1}>
            <p class="text-xl md:text-2xl lg:text-3xl font-medium text-[var(--color-cream)] leading-snug max-w-md">
              AI slop is just{" "}
              <span class="italic text-[var(--color-accent-light)]" style={{ "font-family": "'Playfair Display', Georgia, serif" }}>
                "Idhar se Aloo dalunga, Udhar se Sona niklega"
              </span>
            </p>
          </ScrollReveal>

          {/* Meme image */}
          <ScrollReveal delay={0.3}>
            <img
              src="/rahul-gandhi-aloo-cover.jpg"
              alt="Aloo to Sona meme"
              class="w-64 md:w-72 rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TABS — Tab navigation layout
         ═══════════════════════════════════════ */}
      <section id="tabs-section" class="w-full bg-[var(--color-cream)] py-28 md:py-36 px-6 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div class="absolute inset-0 pointer-events-none">
          <div class="animated-grid" />
        </div>
        <div
          class="max-w-5xl mx-auto relative z-10"
          style={{ transform: `translateY(${Math.max(0, (scrollY() - 600) * -0.05)}px)`, transition: "transform 0.1s linear" }}
        >
          <ScrollReveal>
            <nav class="flex flex-wrap justify-center gap-1 bg-[var(--color-surface)]/80 backdrop-blur-sm p-1.5 rounded-2xl border border-[var(--color-border)] mb-14 shadow-sm">
              {tabs.map(tab => (
                <button
                  onClick={() => setActiveTab(tab.id)}
                  class={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab() === tab.id
                    ? "bg-[var(--color-text)] text-white shadow-md"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </ScrollReveal>

          <div class="w-full">
            <Switch fallback={<About />}>
              <Match when={activeTab() === "about"}>
                <About />
              </Match>
              <Match when={activeTab() === "experience"}>
                <Experience />
              </Match>
              <Match when={activeTab() === "projects"}>
                <Projects />
              </Match>
              <Match when={activeTab() === "blogs"}>
                <Blogs />
              </Match>
            </Switch>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TECH ARSENAL — Animated tech & tools
         ═══════════════════════════════════════ */}
      <TechArsenal />

      {/* ═══════════════════════════════════════
          THIS & THAT + Socials + Spotify
         ═══════════════════════════════════════ */}
      <section class="w-full py-28 md:py-36 px-6">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
              Personal
            </p>
            <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-14">
              This &amp; That.
            </h2>
          </ScrollReveal>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Left — Preferences */}
            <div class="space-y-5">
              {thisAndThat.map((item, i) => (
                <ScrollReveal delay={0.08 * (i + 1)}>
                  <div class="flex items-center gap-4 group cursor-default">
                    <span class="text-2xl select-none group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
                    <p class="text-lg text-[var(--color-text)] font-light leading-relaxed group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right — Socials, Resume, Spotify */}
            <div class="mt-12 md:mt-0">
              {/* Spotify Playlist */}
              <ScrollReveal delay={0.15}>
                <div class="mb-10">
                  <h3 class="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">🎵 Currently listening</h3>
                  <div class="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm">
                    <iframe
                      style={{ "border-radius": "12px" }}
                      src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                      width="100%"
                      height="152"
                      frameborder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Socials & Resume */}
              <ScrollReveal delay={0.3}>
                <h3 class="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-5">🔗 Find me</h3>
                <div class="space-y-3">
                  {socials.map(s => (
                    <a
                      href={s.url}
                      target={s.url.startsWith("http") ? "_blank" : undefined}
                      rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      class="flex items-center gap-3 group cursor-pointer"
                    >
                      <span class="text-xl select-none group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                      <span class="text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 link-underline">
                        {s.label}
                      </span>
                      <span class="text-[var(--color-text-muted)] text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GITHUB — Deep violet block
         ═══════════════════════════════════════ */}
      <section class="w-full bg-[var(--color-deep)] py-28 md:py-36 px-6">
        <div class="max-w-5xl mx-auto">
          <GitHubChart />
        </div>
      </section>
    </div>
  );
}
