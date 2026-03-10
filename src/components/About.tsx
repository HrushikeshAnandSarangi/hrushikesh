import ScrollReveal from "./ScrollReveal";

export default function About() {
    const socials = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            ),
            label: "GitHub",
            url: "https://github.com/HrushikeshAnandSarangi"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
                </svg>
            ),
            label: "GitLab",
            url: "https://gitlab.com/HrushikeshAnandSarangi"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-code"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m10 10-2 2 2 2" /><path d="m14 14 2-2-2-2" /></svg>
            ),
            label: "StackOverflow",
            url: "https://beta.stackoverflow.com/users/27047115/hrushikesh-anand-sarangi"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            ),
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/hrushikesh-anand-sarangi-645b02269/"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 5 9.2 5 9.2s1.5.8 2.4.6C5 7.4 6 2.4 6 2.4s1.6 1 2.8 1.4C10.4 1.5 15 2.5 16 6c1.1-.4 2.1-.9 3-1.5-.4 1.1-1.3 2-2 2.7 1-.1 2-.5 3-1.2z" />
                </svg>
            ),
            label: "X (Twitter)",
            url: "https://x.com/anand_sarangi"
        },
    ];

    return (
        <section>
            <ScrollReveal>
                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
                    About Me
                </p>
                <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-10">
                    The story so far
                </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[var(--color-border)]">
                    <p class="text-lg leading-[1.8] text-[var(--color-text)]">
                        I study Industrial Design at NIT Rourkela, which means I was supposed to spend my time thinking about ergonomics and product aesthetics. I still do but somewhere along the way I also started building deployment infrastructure, integrating ML inference engines via native FFI, writing ground station software for UAVs, and tinkering with blockchain VM constraints on Solana. The common thread isn't a stack. It's curiosity about how things actually work underneath.
                    </p>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[var(--color-border)] mt-6">
                    <p class="text-lg leading-[1.8] text-[var(--color-text)]">
                        Industrial Design taught me that constraints aren't obstacles, they're where the interesting decisions happen. I've carried that into every system I've built since.
                        </p>
                    </div>
            </ScrollReveal>

            {/* Social links */}
            <ScrollReveal delay={0.45}>
                <div class="mt-10">
                    <h3 class="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-6">
                        Connect with me
                    </h3>
                    <div class="flex flex-wrap gap-3">
                        {socials.map(s => (
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-surface)] transition-all duration-300 group card-hover"
                            >
                                <span class="text-emerald-500/80 group-hover:scale-110 group-hover:text-emerald-400 transition-all duration-300">{s.icon}</span>
                                <span class="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                    {s.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Resume download */}
            <ScrollReveal delay={0.6}>
                <div class="mt-8">
                    <a
                        href="/Resume.pdf"
                        download="Resume.pdf"
                        class="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[var(--color-accent)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--color-accent)]/20 hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Resume
                    </a>
                </div>
            </ScrollReveal>
        </section>
    );
}
