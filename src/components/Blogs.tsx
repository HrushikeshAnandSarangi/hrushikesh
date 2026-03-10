import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ScrollReveal from "./ScrollReveal";

export default function Blogs(props: { posts: any[] }) {
    return (
        <section>
            <ScrollReveal>
                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
                    Writing
                </p>
                <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-14">
                    Latest thoughts
                </h2>
            </ScrollReveal>

            <div class="space-y-6">
                <Show when={props.posts && props.posts.length > 0} fallback={<p class="text-center text-[var(--color-text-muted)] italic py-10">No posts found.</p>}>
                    {props.posts.map((post: any, i: number) => (
                        <ScrollReveal delay={0.15 * (i + 1)}>
                            <article class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 md:p-8 border border-[var(--color-border)] card-hover">
                                <div class="flex items-center gap-3 mb-4">
                                    <Show when={post.topics && post.topics.length > 0}>
                                        <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                            {post.topics[0]}
                                        </span>
                                    </Show>
                                    <span class="text-xs font-medium text-[var(--color-text-muted)]">{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <h3 class="text-xl font-bold text-[var(--color-text)] mb-3">
                                    {post.title}
                                </h3>
                                <div class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 prose prose-sm max-w-none" innerHTML={DOMPurify.sanitize(marked(post.description, { async: false }) as string)} />
                                <A
                                    href={`/blogs/${post._id}`}
                                    class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                                >
                                    Read article
                                    <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </A>
                            </article>
                        </ScrollReveal>
                    ))}
                </Show>
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.6}>
                <div class="mt-14 text-center">
                    <A
                        href="/blogs"
                        class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-text)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--color-accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Explore all articles
                        <span>→</span>
                    </A>
                </div>
            </ScrollReveal>
        </section>
    );
}
