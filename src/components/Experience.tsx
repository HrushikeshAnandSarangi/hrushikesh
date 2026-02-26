import ScrollReveal from "./ScrollReveal";

export default function Experience() {
    const experiences = [
        {
            role: "Systems Engineer",
            company: "Infrastructure Co.",
            duration: "2023 — Present",
            description: "Architecting high-performance distributed systems, optimizing kernel-level networking stacks, and building internal tooling for infrastructure observability."
        },
        {
            role: "Embedded Software Developer",
            company: "IoT Solutions",
            duration: "2021 — 2023",
            description: "Developed firmware for resource-constrained microcontrollers, wrote device drivers, and implemented real-time communication protocols for industrial IoT platforms."
        },
        {
            role: "Junior Systems Developer",
            company: "DevOps Startup",
            duration: "2019 — 2021",
            description: "Built CLI tools and automation pipelines in Go and Python, contributed to container runtime internals, and maintained CI/CD infrastructure."
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
