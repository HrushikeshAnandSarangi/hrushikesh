import { A, useParams, cache, createAsync } from "@solidjs/router";
import { Show, For } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Post } from "~/lib/models";

const getPost = cache(async (id: string) => {
    "use server";
    await connectDB();
    if (!id) return null;
    try {
        const post = await Post.findById(id).lean();
        return JSON.parse(JSON.stringify(post));
    } catch (e) {
        return null;
    }
}, "post-detail");

export const route = { load: ({ params }: any) => getPost(params.slug) };

export default function BlogDetailPage() {
    const params = useParams();
    const post = createAsync(() => getPost(params.slug));

    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-3xl mx-auto">
                <A href="/#tabs-section" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <Show when={post()} fallback={
                    <div class="text-center py-20">
                        <h1 class="heading-serif text-4xl text-[var(--color-text)] mb-4">Article Not Found</h1>
                        <p class="text-[var(--color-text-muted)]">The article you're looking for doesn't exist.</p>
                    </div>
                }>
                    {(p) => (
                        <>
                            <ScrollReveal>
                                <div class="flex items-center gap-3 mb-6">
                                    <Show when={p().topics && p().topics.length > 0}>
                                        <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                            {p().topics[0]}
                                        </span>
                                    </Show>
                                    <span class="text-sm font-medium text-[var(--color-text-muted)]">{new Date(p().date).toLocaleDateString()}</span>
                                </div>
                                <h1 class="heading-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] mb-10 leading-tight">
                                    {p().title}
                                </h1>
                            </ScrollReveal>

                             <ScrollReveal delay={0.15}>
                                 <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[var(--color-border)]">
                                     <div class="prose max-w-none text-lg leading-[1.8] text-[var(--color-text)]" innerHTML={DOMPurify.sanitize(marked(p().description || "", { async: false }) as string)} />
                                 </div>
                             </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <div class="mt-10 pt-8 border-t border-[var(--color-border)]">
                                    <A
                                        href="/blogs"
                                        class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                                    >
                                        <span class="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                        All articles
                                    </A>
                                </div>
                            </ScrollReveal>
                        </>
                    )}
                </Show>
            </div>
        </div>
    );
}
