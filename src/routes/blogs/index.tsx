import { A, cache, createAsync } from "@solidjs/router";
import { createSignal, createMemo, Show } from "solid-js";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Post } from "~/lib/models";

const getPosts = cache(async () => {
    "use server";
    await connectDB();
    const posts = await Post.find().sort({ date: -1 }).lean();
    return JSON.parse(JSON.stringify(posts));
}, "all-posts");

export const route = { load: () => getPosts() };

export default function BlogsPage() {
    const posts = createAsync(() => getPosts());
    const [searchQuery, setSearchQuery] = createSignal("");
    const [selectedTopic, setSelectedTopic] = createSignal<string | null>(null);

    // Extract unique topics 
    const uniqueTopics = createMemo(() => {
        const pList = posts() || [];
        const topics = new Set<string>();
        pList.forEach((p: any) => {
            if (Array.isArray(p.topics)) p.topics.forEach((t: string) => topics.add(t));
        });
        return Array.from(topics).sort();
    });

    // Reactive filter logic
    const filteredPosts = createMemo(() => {
        const pList = posts() || [];
        const query = searchQuery().toLowerCase();
        const stateTopic = selectedTopic();

        return pList.filter((p: any) => {
            const matchesSearch = query === "" || 
                (p.title && p.title.toLowerCase().includes(query)) ||
                (p.description && p.description.toLowerCase().includes(query));
            
            const matchesTopic = !stateTopic || 
                (Array.isArray(p.topics) && p.topics.includes(stateTopic));
            
            return matchesSearch && matchesTopic;
        });
    });
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

                    {/* Search & Filter Controls */}
                    <div class="flex flex-col md:flex-row gap-4 mb-14">
                        <div class="relative flex-1 max-w-md">
                            <span class="absolute inset-y-0 left-4 flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery()}
                                onInput={(e) => setSearchQuery(e.currentTarget.value)}
                                class="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <Show when={uniqueTopics().length > 0}>
                        <div class="flex flex-wrap gap-2 mb-10">
                            <button 
                                onClick={() => setSelectedTopic(null)}
                                class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!selectedTopic() ? 'bg-[var(--color-text)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}
                            >
                                All
                            </button>
                            {uniqueTopics().map(topic => (
                                <button 
                                    onClick={() => setSelectedTopic(topic)}
                                    class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedTopic() === topic ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </Show>
                </ScrollReveal>

                <div class="space-y-5">
                    <Show when={filteredPosts().length > 0} fallback={
                        <div class="text-center py-20">
                            <p class="text-[var(--color-text-muted)] text-lg">No articles found matching your criteria.</p>
                            <button onClick={() => {setSearchQuery(""); setSelectedTopic(null)}} class="mt-4 text-[var(--color-accent)] hover:underline">Clear Filters</button>
                        </div>
                    }>
                    {filteredPosts().map((p: any, i: number) => (
                        <ScrollReveal delay={0.12 * ((i % 10) + 1)}>
                            <A href={`/blogs/${p._id}`} class="block">
                                <article class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 border border-[var(--color-border)] card-hover cursor-pointer">
                                    <div class="flex items-center gap-3 mb-3">
                                        <Show when={p.topics && p.topics.length > 0}>
                                            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                                {p.topics[0]}
                                            </span>
                                        </Show>
                                        <span class="text-xs font-medium text-[var(--color-text-muted)]">{new Date(p.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">{p.title}</h3>
                                    <p class="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">{p.description}</p>
                                </article>
                            </A>
                        </ScrollReveal>
                    ))}
                    </Show>
                </div>
            </div>
        </div>
    );
}
