import { A, cache, createAsync } from "@solidjs/router";
import { createSignal, createMemo, Show } from "solid-js";
import { Portal } from "solid-js/web";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Project } from "~/lib/models";
import { incrementPageView } from "~/lib/analytics";

const getProjects = cache(async () => {
    "use server";
    await connectDB();
    await incrementPageView('/projects');
    const projects = await Project.find().sort({ _id: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
}, "all-projects");

export const route = { load: () => getProjects() };

function PopupFilter(props: { tags: any[], selectedTag: string | null, setSelectedTag: (tag: string | null) => void }) {
    const [isOpen, setIsOpen] = createSignal(false);
    
    return (
        <div class="relative inline-block z-[9999]">
            <button 
                onClick={() => setIsOpen(true)}
                class={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${isOpen() ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-md'}`}
            >
                More Tags
                <span class={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${isOpen() ? 'bg-white/20 text-white' : 'bg-[var(--color-border)]/50 text-[var(--color-text-muted)]'}`}>
                    +{props.tags.length - 6}
                </span>
            </button>
            
            {/* Elegant Modal Pop-up */}
            <Show when={isOpen()}>
                <Portal>
                    <div class="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div 
                            class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Modal Content */}
                        <div class="relative w-full max-w-lg bg-[var(--color-surface)]/95 backdrop-blur-2xl border border-[var(--color-border)]/50 rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-in">
                            <div class="flex justify-between items-center mb-6">
                                <div>
                                    <h3 class="text-xl font-bold text-[var(--color-text)] mb-1">More Filters</h3>
                                    <p class="text-xs text-[var(--color-text-muted)]">Select a tag to filter projects</p>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    class="p-2 rounded-full hover:bg-[var(--color-border)]/50 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                {props.tags.slice(6).map(tag => (
                                    <button 
                                        onClick={() => { props.setSelectedTag(tag.name); setIsOpen(false); }}
                                        class={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 flex flex-col gap-1 group relative overflow-hidden ${props.selectedTag === tag.name ? 'text-white shadow-md bg-[var(--color-accent)]' : 'text-[var(--color-text)] hover:bg-[var(--color-text)]/5 border border-[var(--color-border)]/50 hover:border-[var(--color-accent)]/60'}`}
                                    >
                                        <span class="truncate w-full relative z-10">{tag.name}</span>
                                        <span class={`text-[10px] font-bold relative z-10 transition-colors ${props.selectedTag === tag.name ? 'text-white/80' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]/80'}`}>
                                            {tag.count} {tag.count === 1 ? 'Project' : 'Projects'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Portal>
            </Show>
        </div>
    );
}

export default function ProjectsPage() {
    const projects = createAsync(() => getProjects());
    const [searchQuery, setSearchQuery] = createSignal("");
    const [selectedTag, setSelectedTag] = createSignal<string | null>(null);

    // Extract unique tags securely from arrays and strings, ordered by frequency
    const uniqueTags = createMemo(() => {
        const pList = projects() || [];
        const tagCounts = new Map<string, number>();
        
        pList.forEach((p: any) => {
            if (p.tag) {
                tagCounts.set(p.tag, (tagCounts.get(p.tag) || 0) + 1);
            }
            if (Array.isArray(p.techStack)) {
                p.techStack.forEach((t: string) => {
                    tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
                });
            }
        });
        
        // Sort by frequency (descending), then alphabetically for ties
        return Array.from(tagCounts.entries())
            .sort((a, b) => {
                if (b[1] !== a[1]) return b[1] - a[1];
                return a[0].localeCompare(b[0]);
            })
            .map(entry => ({ name: entry[0], count: entry[1] }));
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
                    <div class="flex flex-col md:flex-row gap-4 mb-8">
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
                        <div class="mb-14 flex flex-wrap gap-2 items-center relative z-[60]">
                            <span class="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mr-2">Filter by:</span>
                            <button 
                                onClick={() => setSelectedTag(null)}
                                class={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!selectedTag() ? 'bg-[var(--color-text)] text-white shadow-sm' : 'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] border border-[var(--color-border)]'}`}
                            >
                                All Projects
                            </button>
                            
                            {/* Top 6 tags + any actively selected tag that isn't in top 6 */}
                            {(() => {
                                const allTags = uniqueTags();
                                const topTags = allTags.slice(0, 6);
                                const selected = selectedTag();
                                
                                // Ensure currently selected tag is visible in the row if it's not in the top 6
                                if (selected && !topTags.find(t => t.name === selected)) {
                                    const selectedTagItem = allTags.find(t => t.name === selected);
                                    if (selectedTagItem) {
                                        topTags.push(selectedTagItem);
                                    }
                                }
                                
                                return topTags.map(tag => (
                                    <button 
                                        onClick={() => setSelectedTag(tag.name)}
                                        class={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${selectedTag() === tag.name ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] border border-[var(--color-border)]'}`}
                                    >
                                        {tag.name}
                                        <span class={`text-[10px] ${selectedTag() === tag.name ? 'opacity-80' : 'opacity-50'}`}>{tag.count}</span>
                                    </button>
                                ));
                            })()}

                            {/* Dropdown for remaining tags */}
                            <Show when={uniqueTags().length > 6}>
                                <PopupFilter 
                                    tags={uniqueTags()} 
                                    selectedTag={selectedTag()} 
                                    setSelectedTag={setSelectedTag} 
                                />
                            </Show>
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
