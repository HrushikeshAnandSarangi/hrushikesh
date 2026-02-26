import { A } from "@solidjs/router";
import ScrollReveal from "~/components/ScrollReveal";
import { projects } from "~/data/projectData";

export default function ProjectsPage() {
    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-5xl mx-auto">
                <A href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <ScrollReveal>
                    <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">Projects</p>
                    <h1 class="heading-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">All projects</h1>
                    <p class="text-lg text-[var(--color-text-muted)] mb-14 max-w-xl">
                        A collection of things I've built, contributed to, and explored.
                    </p>
                </ScrollReveal>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p, i) => (
                        <ScrollReveal delay={0.12 * (i + 1)}>
                            <A href={`/projects/${p.slug}`} class="block h-full">
                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl border border-[var(--color-border)] card-hover cursor-pointer h-full overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        class="w-full h-44 object-cover"
                                    />
                                    <div class="p-7">
                                        <h3 class="text-xl font-semibold text-[var(--color-text)] mb-3">{p.title}</h3>
                                        <p class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{p.description}</p>
                                        <div class="flex flex-wrap gap-2">
                                            {p.tags.map(tag => (
                                                <span class="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </A>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
