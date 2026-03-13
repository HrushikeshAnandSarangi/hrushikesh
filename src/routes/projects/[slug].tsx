import { A, useParams, cache, createAsync } from "@solidjs/router";
import { Show, For } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Project } from "~/lib/models";
import { incrementProjectView } from "~/lib/analytics";

const getProject = cache(async (id: string) => {
    "use server";
    await connectDB();
    if (!id) return null;
    try {
        const project = await Project.findById(id).lean();
        if (project) {
            await incrementProjectView(id);
        }
        return JSON.parse(JSON.stringify(project));
    } catch (e) {
        return null;
    }
}, "project-detail");

export const route = { load: ({ params }: any) => getProject(params.slug) };

export default function ProjectDetailPage() {
    const params = useParams();
    const project = createAsync(() => getProject(params.slug));

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

                            <Show when={p().imageUrl}>
                                <ScrollReveal delay={0.15}>
                                    <img
                                        src={p().imageUrl}
                                        alt={p().title}
                                        class="w-full h-64 md:h-96 object-cover rounded-3xl border border-[var(--color-border)] mb-10"
                                    />
                                </ScrollReveal>
                            </Show>

                            <ScrollReveal delay={0.3}>
                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[var(--color-border)]">
                                    <div class="prose max-w-none text-lg leading-[1.8] text-[var(--color-text)]" innerHTML={DOMPurify.sanitize(marked(p().description || "", { async: false }) as string)} />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.45}>
                                <div class="flex flex-wrap gap-4 mt-8">
                                    <Show when={p().link}>
                                        <a
                                            href={p().link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-accent)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                                        >
                                            🔗 View Live
                                        </a>
                                    </Show>
                                    <Show when={p().github}>
                                        <a
                                            href={p().github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-surface)] text-[var(--color-text)] font-semibold text-sm tracking-wide border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            🐙 GitHub Source
                                        </a>
                                    </Show>
                                    <Show when={p().gitlab}>
                                        <a
                                            href={p().gitlab}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-surface)] text-[var(--color-text)] font-semibold text-sm tracking-wide border border-[var(--color-border)] hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            🦊 GitLab Source
                                        </a>
                                    </Show>
                                    <Show when={p().youtube}>
                                        <a
                                            href={p().youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--color-surface)] text-[var(--color-text)] font-semibold text-sm tracking-wide border border-[var(--color-border)] hover:border-red-500/30 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            ▶️ YouTube Demo
                                        </a>
                                    </Show>
                                </div>
                                
                                <Show when={p().extraProofOfWork && p().extraProofOfWork.length > 0}>
                                    <div class="mt-8 pt-8 border-t border-[var(--color-border)]">
                                        <h3 class="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">Extra Proof of Work</h3>
                                        <div class="flex flex-col gap-3">
                                            {p().extraProofOfWork.map((proof: any) => (
                                                <a href={proof.link} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors text-sm font-medium">
                                                    📄 {proof.title} <span class="text-xs opacity-50">↗</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </Show>
                            </ScrollReveal>

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
                        </>
                    )}
                </Show>
            </div>
        </div>
    );
}
