import { createSignal, createResource, For } from "solid-js";
import ScrollReveal from "./ScrollReveal";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionWeek {
    days: ContributionDay[];
}

async function fetchContributions(username: string): Promise<ContributionWeek[]> {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const data = await response.json();

        const contributions: Map<string, { count: number; level: number }> = new Map();
        if (data.contributions) {
            for (const entry of data.contributions) {
                contributions.set(entry.date, { count: entry.count, level: entry.level });
            }
        }

        const weeks: ContributionWeek[] = [];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (52 * 7) - startDate.getDay());

        let currentWeek: ContributionDay[] = [];
        const d = new Date(startDate);

        while (d <= today) {
            const dateStr = d.toISOString().split("T")[0];
            const entry = contributions.get(dateStr) || { count: 0, level: 0 };
            currentWeek.push({ date: dateStr, count: entry.count, level: entry.level });

            if (currentWeek.length === 7) {
                weeks.push({ days: [...currentWeek] });
                currentWeek = [];
            }
            d.setDate(d.getDate() + 1);
        }
        if (currentWeek.length > 0) {
            weeks.push({ days: currentWeek });
        }

        return weeks;
    } catch (e) {
        console.error("Failed to fetch GitHub contributions:", e);
        return [];
    }
}

const LEVEL_COLORS = [
    "bg-white/10",
    "bg-[#c4b5fd]/60",
    "bg-[#a78bfa]/70",
    "bg-[#8b5cf6]/80",
    "bg-[#7c3aed]",
];

export default function GitHubChart() {
    const [weeks] = createResource(() => fetchContributions("HrushikeshAnandSarangi"));
    const [totalContributions, setTotalContributions] = createSignal(0);

    createResource(
        () => weeks(),
        (data) => {
            if (data) {
                const total = data.reduce((sum, week) =>
                    sum + week.days.reduce((s, d) => s + d.count, 0), 0);
                setTotalContributions(total);
            }
            return null;
        }
    );

    return (
        <section>
            <ScrollReveal>
                <div class="flex items-end justify-between mb-10">
                    <div>
                        <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent-light)] mb-4">
                            Open Source
                        </p>
                        <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-cream)]">
                            GitHub activity
                        </h2>
                    </div>
                    <a
                        href="https://github.com/HrushikeshAnandSarangi"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm font-semibold text-[var(--color-accent-light)] link-underline"
                    >
                        @HrushikeshAnandSarangi
                    </a>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div class="bg-[var(--color-deep-surface)] rounded-3xl p-6 md:p-8 border border-white/5 overflow-x-auto">
                    {weeks.loading && (
                        <div class="flex items-center justify-center py-12">
                            <div class="w-6 h-6 border-2 border-[var(--color-accent-light)] border-t-transparent rounded-full animate-spin" />
                            <span class="ml-3 text-sm text-[var(--color-cream)]/60">Loading contributions...</span>
                        </div>
                    )}

                    {weeks() && weeks()!.length > 0 && (
                        <>
                            <div class="flex gap-[3px]">
                                <For each={weeks()}>
                                    {(week) => (
                                        <div class="flex flex-col gap-[3px]">
                                            <For each={week.days}>
                                                {(day) => (
                                                    <div
                                                        class={`w-[11px] h-[11px] rounded-sm ${LEVEL_COLORS[day.level]} transition-all duration-300 hover:scale-150 hover:ring-2 hover:ring-[var(--color-accent-light)]/40 cursor-pointer`}
                                                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                                                    />
                                                )}
                                            </For>
                                        </div>
                                    )}
                                </For>
                            </div>

                            <div class="flex items-center justify-between mt-5">
                                <span class="text-xs text-[var(--color-cream)]/50">
                                    {totalContributions()} contributions in the last year
                                </span>
                                <div class="flex items-center gap-1.5 text-xs text-[var(--color-cream)]/50">
                                    <span>Less</span>
                                    <For each={LEVEL_COLORS}>
                                        {(color) => (
                                            <div class={`w-[11px] h-[11px] rounded-sm ${color}`} />
                                        )}
                                    </For>
                                    <span>More</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </ScrollReveal>
        </section>
    );
}
