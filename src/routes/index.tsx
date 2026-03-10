import { createSignal, Switch, Match, onMount, onCleanup } from "solid-js";
import { cache, createAsync } from "@solidjs/router";
import { connectDB } from "~/lib/db";
import { Project, Post } from "~/lib/models";
import ScrollReveal from "~/components/ScrollReveal";

const getPublicData = cache(async () => {
  "use server";
  await connectDB();
  const projects = await Project.find().sort({ _id: -1 }).lean();
  const posts = await Post.find().sort({ date: -1 }).lean();
  return { 
    projects: JSON.parse(JSON.stringify(projects)), 
    posts: JSON.parse(JSON.stringify(posts)) 
  };
}, "public-data");

export const route = { load: () => getPublicData() };
import About from "~/components/About";
import Experience from "~/components/Experience";
import Projects from "~/components/Projects";
import GitHubChart from "~/components/GitHubChart";
import TechArsenal from "~/components/TechArsenal";

type Tab = "about" | "experience" | "projects";

export default function Home() {
  const data = createAsync(() => getPublicData());
  const [activeTab, setActiveTab] = createSignal<Tab>("about");
  const [scrollY, setScrollY] = createSignal(0);
  const [nameSticky, setNameSticky] = createSignal(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  const thisAndThat = [
    { emoji: "☕", text: "coffee over chai" },
    { emoji: "🖥️", text: "terminal over GUI" },
    { emoji: "🌙", text: "late nights over early mornings" },
    { emoji: "⚡", text: "performance over convenience" },
    { emoji: "📖", text: "documentation over videos" },
    { emoji: "🐧", text: "Linux over Windows" },
    { emoji: "🌊", text: "flow state over multitasking" },
    { emoji: "🤝", text: "collaboration over competition" },
  ];

  const socials = [
    { icon: "🐙", label: "GitHub", url: "https://github.com/HrushikeshAnandSarangi" },
    { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/hrushikesh-anand-sarangi-645b02269/" },
    { icon: "🐦", label: "Twitter / X", url: "https://x.com/anand_sarangi" },
    { icon: "📧", label: "Email", url: "mailto:hrushikeshsarangi7@gmail.com" },
    { icon: "📄", label: "Resume", url: "https://drive.google.com/drive/folders/1AInPFmWGadizscPrBR-rGpdiiZbFemo3?usp=sharing" },
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

  const gifs = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTY1a3cycWl2eTU1cHZxaW5jd3RtZXZyejhneWo3eWdvc2lkczR2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N3yLGQ1oMYfGU/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNjNXowbHM4aHdlZDduZWNydDM1ODVzOGNkazJ0MXU4eWd0Y253eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gH1jGsCnQBiFHWMFzh/giphy.gif"
  ];
  const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

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
      <section class="w-full min-h-[85vh] md:h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pt-20 md:pt-28 relative overflow-hidden">
        {/* Centered name at top of hero */}
        <p
          class={`text-[10px] md:text-sm font-semibold tracking-[0.25em] md:tracking-[0.3em] uppercase text-[var(--color-accent)] mb-8 md:mb-12 anim-hidden animate-fade-in text-center transition-opacity duration-500 ${nameSticky() ? "opacity-0" : "opacity-100"}`}
        >
          Hrushikesh Anand Sarangi
        </p>
        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center md:items-end">
          {/* Left — Bold headline with parallax */}
          <div
            class="md:col-span-3 flex flex-col justify-center text-center md:text-left z-10"
            style={{ transform: `translateY(${scrollY() * 0.15}px)`, transition: "transform 0.1s linear" }}
          >
            <h1 class="heading-serif text-5xl md:text-6xl lg:text-7xl text-[var(--color-text)] leading-[1.1] md:leading-[1.1] mb-2 md:mb-8 anim-hidden animate-slide-up delay-1 text-balance">
              Systems engineer by{" "}
              <span class="font-mono text-[var(--color-accent)] font-normal tracking-tight">obsession()</span>,
              <br class="hidden md:block" />
              {" "}Industrial Designer by accident.
            </h1>
          </div>

          {/* Right — Full-height waving avatar with parallax */}
          <div
            class="md:col-span-2 flex justify-center md:justify-end items-end anim-hidden animate-scale-in delay-2 mt-4 md:mt-0"
            style={{ transform: `translateY(${scrollY() * -0.05}px)`, transition: "transform 0.1s linear" }}
          >
            <img
              src="/avatar.png"
              alt="Hrushikesh — waving hello"
              class="w-auto object-contain object-bottom mix-blend-multiply h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh]"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GIF STRIP
         ═══════════════════════════════════════ */}
      <section class="w-full bg-[var(--color-deep)] py-16 md:py-24 px-6">
        <div class="max-w-5xl mx-auto flex items-center justify-center">
          <ScrollReveal delay={0.2}>
            <img
              src={randomGif}
              alt="Funny GIF"
              class="w-full max-w-[28rem] md:max-w-2xl rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500 object-cover"
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
                <Projects projects={data()?.projects || []} />
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
