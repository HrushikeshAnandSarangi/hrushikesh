import { A } from "@solidjs/router";
import ScrollReveal from "./ScrollReveal";
import { blogPosts } from "~/data/blogData";

export default function Blogs() {
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
                {blogPosts.map((post, i) => (
                    <ScrollReveal delay={0.15 * (i + 1)}>
                        <article class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 md:p-8 border border-[var(--color-border)] card-hover">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                    {post.tag}
                                </span>
                                <span class="text-xs font-medium text-[var(--color-text-muted)]">{post.date}</span>
                            </div>
                            <h3 class="text-xl font-bold text-[var(--color-text)] mb-3">
                                {post.title}
                            </h3>
                            <p class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                                {post.excerpt}
                            </p>
                            <A
                                href={`/blogs/${post.slug}`}
                                class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                            >
                                Read article
                                <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </A>
                        </article>
                    </ScrollReveal>
                ))}
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
