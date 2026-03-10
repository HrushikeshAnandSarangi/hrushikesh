import { A } from "@solidjs/router";
import { onMount, createSignal, Show } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ScrollReveal from "./ScrollReveal";

export default function Projects(props: { projects: any[] }) {
    const sortedProjects = () => {
        if (!props.projects) return [];
        
        const hasRust = (p: any) => 
            p.tag?.toLowerCase() === 'rust' || 
            p.techStack?.some((t: string) => t.toLowerCase() === 'rust');
            
        return [...props.projects].sort((a, b) => {
            const aRust = hasRust(a);
            const bRust = hasRust(b);
            if (aRust && !bRust) return -1;
            if (!aRust && bRust) return 1;
            return 0;
        }).slice(0, 3);
    };

    const truncateText = (text: string, maxLength: number = 150) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
    };

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
                <Show when={sortedProjects().length > 0} fallback={<p class="text-center text-[var(--color-text-muted)] italic py-10">No projects found.</p>}>
                    {sortedProjects().map((project: any, i: number) => {
                        const isEven = i % 2 === 0;
                        return (
                            <ScrollReveal delay={0.12 * (i + 1)}>
                                <div class={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl border border-[var(--color-border)] overflow-hidden card-hover`}>
                                    {/* Project Image */}
                                    <div class="md:w-[45%] w-full shrink-0">
                                        <img
                                            src={project.imageUrl || "/project-placeholder.png"}
                                            alt={project.title}
                                            class="w-full h-56 md:h-72 object-cover"
                                        />
                                    </div>

                                    {/* Project Info */}
                                    <div class="flex-1 p-7 md:p-8">
                                        <h3 class="text-2xl font-bold text-[var(--color-text)] mb-3">
                                            {project.title}
                                        </h3>
                                        <div class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 prose prose-sm max-w-none" innerHTML={DOMPurify.sanitize(marked(truncateText(project.description), { async: false }) as string)} />

                                        {/* Tech tags */}
                                        <div class="flex flex-wrap gap-2 mb-6">
                                            <Show when={project.tag}>
                                                <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--color-text)] text-white">
                                                    {project.tag}
                                                </span>
                                            </Show>
                                            {project.techStack?.map((tag: string) => (
                                                <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Learn more button */}
                                        <div class="flex gap-4 items-center">
                                            <A
                                                href={`/projects/${project._id}`}
                                                class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                                            >
                                                Learn More
                                                <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                            </A>
                                            <Show when={project.link}>
                                                <a href={project.link} target="_blank" rel="noreferrer" class="text-sm font-semibold text-[var(--color-text-muted)] hover:text-blue-600">Live Demo</a>
                                            </Show>
                                            <Show when={project.github}>
                                                <a href={project.github} target="_blank" rel="noreferrer" class="text-sm font-semibold text-[var(--color-text-muted)] hover:text-black">GitHub</a>
                                            </Show>
                                            <Show when={project.gitlab}>
                                                <a href={project.gitlab} target="_blank" rel="noreferrer" class="text-sm font-semibold text-[var(--color-text-muted)] hover:text-orange-600">GitLab</a>
                                            </Show>
                                            <Show when={project.youtube}>
                                                <a href={project.youtube} target="_blank" rel="noreferrer" class="text-sm font-semibold text-[var(--color-text-muted)] hover:text-red-600">YouTube</a>
                                            </Show>
                                        </div>
                                        
                                        {/* Extra proofs of work */}
                                        <Show when={project.extraProofOfWork && project.extraProofOfWork.length > 0}>
                                            <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-3">
                                                {project.extraProofOfWork.map((proof: any) => (
                                                    <a href={proof.link} target="_blank" rel="noreferrer" class="text-xs font-medium text-slate-600 hover:text-blue-600 underline underline-offset-2">
                                                        📄 {proof.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </Show>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </Show>
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
