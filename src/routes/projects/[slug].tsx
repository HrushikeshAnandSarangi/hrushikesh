import { A, useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import ScrollReveal from "~/components/ScrollReveal";
import { projects } from "~/data/projectData";

export default function ProjectDetailPage() {
    const params = useParams();
    const project = () => projects.find(p => p.slug === params.slug);

    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-4xl mx-auto">
                <A href="/#tabs-section" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <Show when={project()} fallback={
                    <div class="text-center py-20">
                        <h1 class="heading-serif text-4xl text-[var(--color-text)] mb-4">Project Not Found</h1>
                        <p class="text-[var(--color-text-muted)]">The project you're looking for doesn't exist.</p>
                    </div>
                }>
                    {(p) => (
                        <>
                            <ScrollReveal>
                                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">Project</p>
                                <h1 class="heading-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] mb-6">
                                    {p().title}
                                </h1>
                                <div class="flex flex-wrap gap-2 mb-8">
                                    <For each={p().tags}>
                                        {tag => (
                                            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                                {tag}
                                            </span>
                                        )}
                                    </For>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.15}>
                                <img
                                    src={p().image}
                                    alt={p().title}
                                    class="w-full h-64 md:h-96 object-cover rounded-3xl border border-[var(--color-border)] mb-10"
                                />
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[var(--color-border)]">
                                    <div class="prose max-w-none">
                                        {p().longDescription.split("\n\n").map(paragraph => (
                                            <p class="text-lg leading-[1.8] text-[var(--color-text)] mb-6 last:mb-0">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.45}>
                                <div class="flex flex-wrap gap-4 mt-8">
                                    <Show when={p().liveUrl}>
                                        <a
                                            href={p().liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-accent)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                                        >
                                            🔗 View Live
                                        </a>
                                    </Show>
                                    <Show when={p().repoUrl}>
                                        <a
                                            href={p().repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-surface)] text-[var(--color-text)] font-semibold text-sm tracking-wide border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            🐙 View Source
                                        </a>
                                    </Show>
                                </div>
                            </ScrollReveal>
                        </>
                    )}
                </Show>
            </div>
        </div>
    );
}
