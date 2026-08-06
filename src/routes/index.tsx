import { createSignal, Switch, Match, onMount, onCleanup, Show } from "solid-js";
import { cache, createAsync, action, useSubmission } from "@solidjs/router";
import { Portal } from "solid-js/web";
import { connectDB } from "~/lib/db";
import { Project, Post, Message } from "~/lib/models";
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

const submitChat = action(async (formData: FormData) => {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  
  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }
  
  await connectDB();
  await Message.create({ name, email, message });
  return { success: true };
}, "submit-chat");

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
  const [isChatOpen, setIsChatOpen] = createSignal(false);
  
  const chatSub = useSubmission(submitChat);

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
    { icon: "🐦", label: "Twitter / X", url: "https://x.com/AnandHrushikesh" },
    { icon: "📧", label: "Email", url: "mailto:hrushikeshsarangi7@gmail.com" },
    { icon: "📄", label: "Resume", url: "https://drive.google.com/drive/folders/1AInPFmWGadizscPrBR-rGpdiiZbFemo3?usp=sharing" },
    { icon: "🤖", label: "Bot View", url: "/bot" },
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
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNjNXowbHM4aHdlZDduZWNydDM1ODVzOGNkazJ0MXU4eWd0Y253eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gH1jGsCnQBiFHWMFzh/giphy.gif",
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
      <section class="w-full bg-[var(--color-deep)] py-16 md:py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto flex flex-col items-center justify-center">
          <ScrollReveal delay={0.2}>
            <div class="mb-10 md:mb-14">
              <blockquote class="text-2xl md:text-3xl lg:text-4xl heading-serif text-white/90 leading-tight mb-6">
                “People don’t read web pages. They scan them.”
              </blockquote>
              <p class="text-[var(--color-accent)] font-medium tracking-[0.2em] uppercase text-sm">
                — Steve Krug
              </p>
            </div>
            <img
              src={randomGif}
              alt="Funny GIF"
              class="w-full max-w-[28rem] md:max-w-2xl mx-auto rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500 object-cover"
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
            <div class="h-full flex flex-col">
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

              {/* Contextual Actions */}
              <div class="mt-auto pt-10">
                <ScrollReveal delay={0.45}>
                  <div class="flex flex-col gap-8 max-w-sm border-t border-[var(--color-border)] pt-8">
                    
                    {/* Chat Action */}
                    <div class="flex flex-col gap-3">
                      <p class="text-[var(--color-text)] font-serif italic font-bold text-[16px]">
                        Want to collaborate or discuss a project?
                      </p>
                      <button
                        onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }}
                        class="w-full flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all shadow-lg shadow-[var(--color-accent)]/30 hover:-translate-y-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span class="text-base text-white font-bold tracking-wide">Chat with me</span>
                      </button>
                    </div>

                    {/* Books Action */}
                    <div class="flex flex-col gap-3">
                      <p class="text-[var(--color-text)] font-serif italic font-bold text-[16px]">
                        Haven't found a common interest yet?
                      </p>
                      <a
                        href="/books"
                        class="w-full flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all shadow-lg shadow-[var(--color-accent)]/30 hover:-translate-y-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span class="text-base text-white font-bold tracking-wide">Explore my bookshelf</span>
                      </a>
                    </div>

                  </div>
                </ScrollReveal>
              </div>
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
                      src="https://open.spotify.com/embed/playlist/4Xa0nk9omuWafSPuWVgWsj?utm_source=generator&si=05de88edc17f449f"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowfullscreen=""
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

      {/* Chat Modal Popup */}
      <Show when={isChatOpen()}>
        <Portal>
          <div class="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div 
              class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsChatOpen(false)}
            />
            <div class="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-in">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-[var(--color-text)]">Say Hello 👋</h3>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  class="p-2 rounded-full hover:bg-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Show when={chatSub.result?.success} fallback={
                <form action={submitChat} method="post" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text)] mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      class="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text)] mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      class="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text)] mb-1">Message</label>
                    <textarea 
                      name="message" 
                      required 
                      rows={4}
                      class="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                      placeholder="Hey Hrushikesh, let's connect!"
                    />
                  </div>
                  
                  <Show when={chatSub.error}>
                    <p class="text-sm text-red-500">{chatSub.error.message}</p>
                  </Show>

                  <button 
                    type="submit" 
                    disabled={chatSub.pending}
                    class="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {chatSub.pending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              }>
                <div class="py-10 flex flex-col items-center justify-center text-center">
                  <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 class="text-xl font-bold text-[var(--color-text)] mb-2">Message Sent!</h4>
                  <p class="text-[var(--color-text-muted)]">Thanks for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    class="mt-6 px-6 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </Portal>
      </Show>
    </div>
  );
}
