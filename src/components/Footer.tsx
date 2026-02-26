import { A } from "@solidjs/router";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer class="w-full bg-[var(--color-deep)] text-[var(--color-cream)] pt-24 pb-12 px-8">
      <div class="w-full max-w-6xl mx-auto flex flex-col gap-20">
        {/* ── Top Section ── */}
        <ScrollReveal>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Tagline */}
            <div class="col-span-1">
              <h2 class="heading-serif text-3xl md:text-4xl text-[var(--color-cream)] leading-snug">
                Let's build<br />something together.
              </h2>
              <p class="text-sm text-[var(--color-cream)]/50 mt-5 max-w-xs leading-relaxed">
                Always open to new ideas, collaborations, and interesting challenges.
              </p>
            </div>

            {/* Navigation Links */}
            <div class="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div class="flex flex-col gap-3.5">
                <h3 class="font-semibold text-[var(--color-cream)]/40 uppercase tracking-[0.2em] text-xs mb-1">Navigate</h3>
                <A href="/" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Home</A>
                <A href="/projects" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Projects</A>
                <A href="/blogs" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Blogs</A>
              </div>
              <div class="flex flex-col gap-3.5">
                <h3 class="font-semibold text-[var(--color-cream)]/40 uppercase tracking-[0.2em] text-xs mb-1">Connect</h3>
                <a href="https://github.com/HrushikeshAnandSarangi" target="_blank" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">GitHub</a>
                <a href="#" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">LinkedIn</a>
                <a href="#" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Twitter / X</a>
              </div>
              <div class="flex flex-col gap-3.5">
                <h3 class="font-semibold text-[var(--color-cream)]/40 uppercase tracking-[0.2em] text-xs mb-1">Contact</h3>
                <a href="mailto:hello@example.com" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Email</a>
                <a href="#" class="text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors duration-300">Resume</a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Large Typography ── */}
        <ScrollReveal>
          <div class="w-full overflow-hidden select-none opacity-10">
            <h1
              class="text-[18vw] lg:text-[160px] font-black leading-none tracking-tighter text-[var(--color-cream)] uppercase text-center heading-serif"
              style={{ "line-height": "0.85" }}
            >
              Hrushikesh
            </h1>
          </div>
        </ScrollReveal>

        {/* ── Bottom Bar ── */}
        <div class="flex justify-center items-center text-xs text-[var(--color-cream)]/30 border-t border-white/5 pt-8">
          <p>&copy; {new Date().getFullYear()} Hrushikesh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
