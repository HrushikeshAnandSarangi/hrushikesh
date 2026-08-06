import { A, cache, createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import ScrollReveal from "~/components/ScrollReveal";
import { connectDB } from "~/lib/db";
import { Book } from "~/lib/models";
import { incrementPageView } from "~/lib/analytics";

const getBooks = cache(async () => {
    "use server";
    await connectDB();
    await incrementPageView('/books');
    const books = await Book.find().sort({ _id: -1 }).lean();
    return JSON.parse(JSON.stringify(books));
}, "all-books");

export const route = { load: () => getBooks() };

export default function BooksPage() {
    const books = createAsync(() => getBooks());

    return (
        <div class="w-full py-24 px-6 bg-animated">
            <div class="max-w-5xl mx-auto">
                <A href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] mb-10 link-underline">
                    ← Back to Home
                </A>

                <ScrollReveal>
                    <p class="text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">Bookshelf</p>
                    <h1 class="heading-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">My Reading List</h1>
                    <p class="text-lg text-[var(--color-text-muted)] mb-14 max-w-xl">
                        A collection of books that have inspired me, taught me, or changed how I view the world.
                    </p>
                </ScrollReveal>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Show when={books() && books()?.length > 0} fallback={
                        <div class="col-span-full text-center py-20 bg-white/30 backdrop-blur-sm rounded-3xl border border-[var(--color-border)]">
                            <span class="text-4xl mb-4 block">📚</span>
                            <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">My shelf is currently empty</h3>
                            <p class="text-[var(--color-text-muted)]">Check back later for some good reads!</p>
                        </div>
                    }>
                        {books()?.map((b: any, i: number) => (
                            <ScrollReveal delay={0.12 * ((i % 10) + 1)}>
                                <div class="bg-[var(--color-surface)]/70 backdrop-blur-sm rounded-3xl border border-[var(--color-border)] h-full overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div class="h-64 w-full bg-[var(--color-cream)] p-8 flex justify-center items-center border-b border-[var(--color-border)]/50">
                                        <img
                                            src={b.imageUrl || "/project-placeholder.png"}
                                            alt={b.title}
                                            class="h-full w-auto object-contain drop-shadow-2xl rounded-sm group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div class="p-7 flex-1 flex flex-col">
                                        <h3 class="text-xl font-bold text-[var(--color-text)] mb-3 leading-snug">{b.title}</h3>
                                        <p class="text-sm text-[var(--color-text-muted)] leading-relaxed">{b.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </Show>
                </div>
            </div>
        </div>
    );
}
