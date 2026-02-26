import { A } from "@solidjs/router";
import ScrollReveal from "./ScrollReveal";
import { projects } from "~/data/projectData";

export default function Projects() {
    return (
        <section>
            <ScrollReveal>
                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
                    Projects
                </p>
                <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-14">
                    Things I've built
                </h2>
            </ScrollReveal>

            <div class="space-y-12">
                {projects.map((project, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <ScrollReveal delay={0.12 * (i + 1)}>
                            <div class={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl border border-[var(--color-border)] overflow-hidden card-hover`}>
                                {/* Project Image */}
                                <div class="md:w-[45%] w-full shrink-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        class="w-full h-56 md:h-72 object-cover"
                                    />
                                </div>

                                {/* Project Info */}
                                <div class="flex-1 p-7 md:p-8">
                                    <h3 class="text-2xl font-bold text-[var(--color-text)] mb-3">
                                        {project.title}
                                    </h3>
                                    <p class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div class="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Learn more button */}
                                    <A
                                        href={`/projects/${project.slug}`}
                                        class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                                    >
                                        Learn more
                                        <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </A>
                                </div>
                            </div>
                        </ScrollReveal>
                    );
                })}
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.8}>
                <div class="mt-14 text-center">
                    <A
                        href="/projects"
                        class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-text)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--color-accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Explore all projects
                        <span>→</span>
                    </A>
                </div>
            </ScrollReveal>
        </section>
    );
}
