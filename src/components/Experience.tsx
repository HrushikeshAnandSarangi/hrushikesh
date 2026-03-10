import ScrollReveal from "./ScrollReveal";

export default function Experience() {
    const experiences = [
        {
            role: "Full Stack Intern",
            company: "N6T Technologies(formerly Clinqo)",
            duration: "2025",
            description: "Engineered a full-stack EHR integration with Sysmex Analyzers, fully automating lab data entry to eliminate manual transcription errors and ensure data integrity. Handled client-side troubleshooting and production deployment, translating clinical requirements directly into software patches to maintain system stability."
        },
        {
            role: "Web Developer",
            company: "IEEE Indiscon",
            duration: "2024-2025",
            description: "Sole maintainer of the official IEEE INDISCON 2025 conference website. Responsible for keeping the site stable, updated, and performant throughout the conference lifecycle — translating event requirements into web updates under real deadline pressure."
        },
        {
            role: "Freelancer",
            company: "Stealth Startup",
            duration: "2024 — Present",
            description: "Independently contracted to build and deliver client web applications end to end. Handled requirements gathering, architecture decisions, frontend and backend implementation, and deployment"
        }
    ];

    return (
        <section>
            <ScrollReveal>
                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
                    Experience
                </p>
                <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-12">
                    The journey
                </h2>
            </ScrollReveal>

            <div class="relative">
                {/* Vertical timeline line */}
                <div class="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-light)]/40 to-transparent" />

                <div class="space-y-10">
                    {experiences.map((exp, i) => (
                        <ScrollReveal delay={0.15 * (i + 1)}>
                            <div class="relative pl-14">
                                {/* Timeline dot */}
                                <div class="absolute left-[11px] top-3 w-[18px] h-[18px] rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-bg)] shadow-md" />

                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 border border-[var(--color-border)] card-hover">
                                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                        <h3 class="text-xl font-semibold text-[var(--color-text)]">{exp.role}</h3>
                                        <span class="text-xs font-semibold tracking-wider uppercase text-[var(--color-accent)] bg-[var(--color-accent-surface)] px-3 py-1.5 rounded-full shrink-0">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p class="text-sm font-semibold text-[var(--color-text-muted)] mb-3">{exp.company}</p>
                                    <p class="text-sm leading-relaxed text-[var(--color-text-muted)]">{exp.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
