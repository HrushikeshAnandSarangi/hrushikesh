import { A, cache, createAsync } from "@solidjs/router";
import { createSignal, createMemo, Show } from "solid-js";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Project } from "~/lib/models";

const getProjects = cache(async () => {
    "use server";
    await connectDB();
    const projects = await Project.find().sort({ _id: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
}, "all-projects");

export const route = { load: () => getProjects() };

export default function ProjectsPage() {
    const projects = createAsync(() => getProjects());
    const [searchQuery, setSearchQuery] = createSignal("");
    const [selectedTag, setSelectedTag] = createSignal<string | null>(null);

    // Extract unique tags securely from arrays and strings
    const uniqueTags = createMemo(() => {
        const pList = projects() || [];
        const tags = new Set<string>();
        pList.forEach((p: any) => {
            if (p.tag) tags.add(p.tag);
            if (Array.isArray(p.techStack)) p.techStack.forEach((t: string) => tags.add(t));
        });
        return Array.from(tags).sort();
    });

    // Reactive filter logic
    const filteredProjects = createMemo(() => {
        const pList = projects() || [];
        const query = searchQuery().toLowerCase();
        const stateTag = selectedTag();

        return pList.filter((p: any) => {
            const matchesSearch = query === "" || 
                (p.title && p.title.toLowerCase().includes(query)) ||
                (p.description && p.description.toLowerCase().includes(query));
            
            const matchesTag = !stateTag || 
                (p.tag === stateTag) || 
                (Array.isArray(p.techStack) && p.techStack.includes(stateTag));
            
            return matchesSearch && matchesTag;
        });
    });
    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-5xl mx-auto">
                <A href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <ScrollReveal>
                    <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">Projects</p>
                    <h1 class="heading-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">All projects</h1>
                    <p class="text-lg text-[var(--color-text-muted)] mb-8 max-w-xl">
                        A collection of things I've built, contributed to, and explored.
                    </p>

                    {/* Search & Filter Controls */}
                    <div class="flex flex-col md:flex-row gap-4 mb-14">
                        <div class="relative flex-1 max-w-md">
                            <span class="absolute inset-y-0 left-4 flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery()}
                                onInput={(e) => setSearchQuery(e.currentTarget.value)}
                                class="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <Show when={uniqueTags().length > 0}>
                        <div class="flex flex-wrap gap-2 mb-10">
                            <button 
                                onClick={() => setSelectedTag(null)}
                                class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!selectedTag() ? 'bg-[var(--color-text)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}
                            >
                                All
                            </button>
                            {uniqueTags().map(tag => (
                                <button 
                                    onClick={() => setSelectedTag(tag)}
                                    class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedTag() === tag ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </Show>
                </ScrollReveal>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Show when={filteredProjects().length > 0} fallback={
                        <div class="col-span-full text-center py-20">
                            <p class="text-[var(--color-text-muted)] text-lg">No projects found matching your criteria.</p>
                            <button onClick={() => {setSearchQuery(""); setSelectedTag(null)}} class="mt-4 text-[var(--color-accent)] hover:underline">Clear Filters</button>
                        </div>
                    }>
                        {filteredProjects().map((p: any, i: number) => (
                            <ScrollReveal delay={0.12 * ((i % 10) + 1)}>
                                <A href={`/projects/${p._id}`} class="block h-full">
                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl border border-[var(--color-border)] card-hover cursor-pointer h-full overflow-hidden">
                                    <img
                                        src={p.imageUrl || "/project-placeholder.png"}
                                        alt={p.title}
                                        class="w-full h-44 object-cover"
                                    />
                                    <div class="p-7">
                                        <h3 class="text-xl font-semibold text-[var(--color-text)] mb-3">{p.title}</h3>
                                        <p class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                                        <div class="flex flex-wrap gap-2">
                                            <Show when={p.tag}>
                                                <span class="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-text)] text-white">
                                                    {p.tag}
                                                </span>
                                            </Show>
                                            {p.techStack?.map((tag: string) => (
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
                    </Show>
                </div>
            </div>
        </div>
    );
}
