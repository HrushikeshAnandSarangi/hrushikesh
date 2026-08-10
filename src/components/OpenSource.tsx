import { Show, For } from "solid-js";
import ScrollReveal from "./ScrollReveal";
import type { OpenSourceOrg } from "~/lib/github";

export default function OpenSource(props: { orgs: OpenSourceOrg[] }) {
    return (
        <section>
            <ScrollReveal>
                <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
                    Open Source
                </p>
                <h2 class="heading-serif text-4xl md:text-5xl text-[var(--color-text)] mb-14">
                    Organisations I've contributed to
                </h2>
            </ScrollReveal>

            <Show
                when={props.orgs.length > 0}
                fallback={<p class="text-center text-[var(--color-text-muted)] italic py-10">No open source contributions found.</p>}
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <For each={props.orgs}>
                        {(org, i) => (
                            <ScrollReveal delay={0.12 * (i() + 1)}>
                                <div class="h-full flex flex-col bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl p-7 border border-[var(--color-border)] card-hover">
                                    <div class="flex items-center gap-4 mb-5">
                                        <img
                                            src={org.avatarUrl}
                                            alt={org.name}
                                            loading="lazy"
                                            class="w-14 h-14 shrink-0 rounded-xl object-cover border border-[var(--color-border)]"
                                        />
                                        <div class="min-w-0 flex-1">
                                            <h3 class="text-lg font-bold text-[var(--color-text)] truncate">{org.name}</h3>
                                            <p class="text-xs font-semibold text-[var(--color-text-muted)] truncate">@{org.login}</p>
                                        </div>
                                        <span class="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--color-accent-surface)] text-[var(--color-accent)]">
                                            {org.prCount} PR{org.prCount !== 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    <Show when={org.description}>
                                        <p class="text-sm leading-relaxed text-[var(--color-text-muted)] mb-6 line-clamp-3">
                                            {org.description}
                                        </p>
                                    </Show>

                                    <div class="mt-auto flex flex-wrap gap-x-6 gap-y-2">
                                        <a
                                            href={org.htmlUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300 link-underline"
                                        >
                                            Organisation
                                            <span>↗</span>
                                        </a>
                                        <a
                                            href={org.prsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300"
                                        >
                                            View my PRs
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}
                    </For>
                </div>
            </Show>
        </section>
    );
}
