import { createSignal, Show } from "solid-js";
import { action, cache, createAsync, useSubmission, reload } from "@solidjs/router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { connectDB } from "~/lib/db";
import { Post } from "~/lib/models";
import { requireAuth } from "~/lib/auth";

const getPosts = cache(async () => {
  "use server";
  await requireAuth();
  await connectDB();
  const posts = await Post.find().sort({ date: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}, "posts");

const savePostAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const topics = (formData.get("topics") as string)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (!title || !description) throw new Error("Title and description required");

  if (id) {
    await Post.findByIdAndUpdate(id, { title, description, topics, date: new Date() });
  } else {
    await Post.create({ title, description, topics });
  }
  return { success: true };
}, "save-post");

const deletePostAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  const id = formData.get("id") as string;
  if (id) await Post.findByIdAndDelete(id);
  return { success: true };
}, "delete-post");

export const route = { load: () => getPosts() };

export default function ManagePosts() {
  const posts = createAsync(() => getPosts());
  const saveSub = useSubmission(savePostAction);
  const deleteSub = useSubmission(deletePostAction);

  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [formState, setFormState] = createSignal({ title: "", description: "", topics: "" });

  const handleEdit = (post: any) => {
    setEditingId(post._id);
    setFormState({ 
      title: post.title || "", 
      description: post.description || "",
      topics: post.topics?.join(", ") || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormState({ title: "", description: "", topics: "" });
  };

  return (
    <div class="space-y-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Manage Posts</h1>
        <button onClick={handleCreateNew} class="px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-lg shadow hover:bg-black transition-colors">
          Create New Post
        </button>
      </div>

      {/* Editor Form */}
      <div class="bg-[var(--color-cream)] p-6 rounded-2xl shadow-sm border border-[var(--color-border)]">
        <h2 class="text-xl font-bold mb-4">{editingId() ? "Edit Post" : "New Post"}</h2>
        <form
          action={savePostAction}
          method="post"
          class="space-y-4"
          onSubmit={() => setTimeout(() => { reload(); handleCreateNew(); }, 100)} // basic optimistic reload
        >
          {editingId() && <input type="hidden" name="id" value={editingId()!} />}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input name="title" required value={formState().title} onInput={e => setFormState({...formState(), title: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Topics (comma separated)</label>
              <input name="topics" value={formState().topics} onInput={e => setFormState({...formState(), topics: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Description (Markdown Supported)</label>
            <textarea name="description" required value={formState().description} onInput={e => setFormState({...formState(), description: e.currentTarget.value})} rows="8" class="w-full px-3 py-2 border rounded-lg font-mono text-sm"></textarea>
            <Show when={formState().description}>
              <div class="mt-2 p-4 bg-white border border-[var(--color-border)] rounded-lg prose prose-sm max-w-none text-left" innerHTML={DOMPurify.sanitize(marked(formState().description, { async: false }) as string)} />
            </Show>
          </div>
          
          <div class="flex gap-2">
            <button type="submit" disabled={saveSub.pending} class="px-6 py-2 bg-[var(--color-deep)] text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50">
              {saveSub.pending ? "Saving..." : "Save Post"}
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
        {posts()?.map((post: any) => (
          <div class="bg-white p-4 rounded-xl shadow-sm border border-[var(--color-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 class="font-bold text-lg">{post.title}</h3>
              <p class="text-xs text-[var(--color-text-muted)]">{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(post)} class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                Edit
              </button>
              <form action={deletePostAction} method="post" onSubmit={() => setTimeout(() => reload(), 100)}>
                <input type="hidden" name="id" value={post._id} />
                <button type="submit" disabled={deleteSub.pending} class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {(!posts() || posts()?.length === 0) && (
          <p class="text-[var(--color-text-muted)] text-center py-8">No posts found.</p>
        )}
      </div>
    </div>
  );
}
