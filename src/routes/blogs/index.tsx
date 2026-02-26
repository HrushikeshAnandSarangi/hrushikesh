import { A } from "@solidjs/router";
import ScrollReveal from "~/components/ScrollReveal";
import { blogPosts } from "~/data/blogData";

export default function BlogsPage() {
    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-3xl mx-auto">
                <A href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <ScrollReveal>
                    <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">Writing</p>
                    <h1 class="heading-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">All articles</h1>
                    <p class="text-lg text-[var(--color-text-muted)] mb-14 max-w-xl">
                        Thoughts on systems programming, infrastructure, and engineering.
                    </p>
                </ScrollReveal>

                <div class="space-y-5">
                    {blogPosts.map((p, i) => (
                        <ScrollReveal delay={0.12 * (i + 1)}>
                            <A href={`/blogs/${p.slug}`} class="block">
                                <article class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 border border-[var(--color-border)] card-hover cursor-pointer">
                                    <div class="flex items-center gap-3 mb-3">
                                        <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                            {p.tag}
                                        </span>
                                        <span class="text-xs font-medium text-[var(--color-text-muted)]">{p.date}</span>
                                    </div>
                                    <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">{p.title}</h3>
                                    <p class="text-sm text-[var(--color-text-muted)] leading-relaxed">{p.excerpt}</p>
                                </article>
                            </A>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
