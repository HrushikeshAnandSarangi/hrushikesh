import { createSignal, Show } from "solid-js";
import { action, cache, createAsync, useSubmission, reload } from "@solidjs/router";
import { connectDB } from "~/lib/db";
import { Book } from "~/lib/models";
import { requireAuth } from "~/lib/auth";

const getBooks = cache(async () => {
  "use server";
  await requireAuth();
  await connectDB();
  const books = await Book.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(books));
}, "books");

const saveBookAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !description || !imageUrl) throw new Error("Title, description, and image URL required");

  if (id) {
    await Book.findByIdAndUpdate(id, { title, description, imageUrl });
  } else {
    await Book.create({ title, description, imageUrl });
  }
  return { success: true };
}, "save-book");

const deleteBookAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  const id = formData.get("id") as string;
  if (id) await Book.findByIdAndDelete(id);
  return { success: true };
}, "delete-book");

export const route = { load: () => getBooks() };

export default function ManageBooks() {
  const books = createAsync(() => getBooks());
  const saveSub = useSubmission(saveBookAction);
  const deleteSub = useSubmission(deleteBookAction);

  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [formState, setFormState] = createSignal({ title: "", description: "", imageUrl: "" });

  const handleEdit = (book: any) => {
    setEditingId(book._id);
    setFormState({ 
      title: book.title || "", 
      description: book.description || "",
      imageUrl: book.imageUrl || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormState({ title: "", description: "", imageUrl: "" });
  };

  return (
    <div class="space-y-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Manage Books</h1>
        <button onClick={handleCreateNew} class="px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-lg shadow hover:bg-black transition-colors">
          Add New Book
        </button>
      </div>

      {/* Editor Form */}
      <div class="bg-[var(--color-cream)] p-6 rounded-2xl shadow-sm border border-[var(--color-border)]">
        <h2 class="text-xl font-bold mb-4">{editingId() ? "Edit Book" : "New Book"}</h2>
        <form
          action={saveBookAction}
          method="post"
          class="space-y-4"
          onSubmit={() => setTimeout(() => { reload(); handleCreateNew(); }, 100)}
        >
          {editingId() && <input type="hidden" name="id" value={editingId()!} />}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input name="title" required value={formState().title} onInput={e => setFormState({...formState(), title: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Image URL</label>
              <input type="url" name="imageUrl" required value={formState().imageUrl} onInput={e => setFormState({...formState(), imageUrl: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" required value={formState().description} onInput={e => setFormState({...formState(), description: e.currentTarget.value})} rows="4" class="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>

          <Show when={saveSub.error}>
            <p class="text-red-500 text-sm">{saveSub.error.message}</p>
          </Show>
          
          <div class="flex gap-2">
            <button type="submit" disabled={saveSub.pending} class="px-6 py-2 bg-[var(--color-deep)] text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50">
              {saveSub.pending ? "Saving..." : "Save Book"}
            </button>
            <Show when={editingId()}>
              <button type="button" onClick={handleCreateNew} class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel Edit
              </button>
            </Show>
          </div>
        </form>
      </div>

      {/* List */}
      <div class="grid gap-4">
        {books()?.map((book: any) => (
          <div class="bg-white p-4 rounded-xl shadow-sm border border-[var(--color-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="flex gap-4 items-center">
              <img src={book.imageUrl || "/project-placeholder.png"} class="w-12 h-16 object-cover rounded shadow-sm border border-gray-200" alt={book.title} />
              <div>
                <h3 class="font-bold text-lg">{book.title}</h3>
                <p class="text-xs text-[var(--color-text-muted)] max-w-lg line-clamp-1">{book.description}</p>
              </div>
            </div>
            <div class="flex gap-2 flex-shrink-0 mt-4 md:mt-0">
              <button onClick={() => handleEdit(book)} class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                Edit
              </button>
              <form action={deleteBookAction} method="post" onSubmit={() => setTimeout(() => reload(), 100)}>
                <input type="hidden" name="id" value={book._id} />
                <button type="submit" disabled={deleteSub.pending} class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {(!books() || books()?.length === 0) && (
          <p class="text-[var(--color-text-muted)] text-center py-8">No books found.</p>
        )}
      </div>
    </div>
  );
}
