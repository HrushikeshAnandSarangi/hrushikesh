import { createSignal, Show, For } from "solid-js";
import { action, cache, createAsync, useSubmission, reload } from "@solidjs/router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { connectDB } from "~/lib/db";
import { Project } from "~/lib/models";
import { requireAuth } from "~/lib/auth";

const getProjects = cache(async () => {
  "use server";
  await requireAuth();
  await connectDB();
  const projects = await Project.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}, "projects");

const saveProjectAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const github = formData.get("github") as string;
  const gitlab = formData.get("gitlab") as string;
  const youtube = formData.get("youtube") as string;
  const tag = formData.get("tag") as string;
  
  // Extract dynamic Proof of Work entries
  const extraProofOfWork: {title: string, link: string}[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith("proofTitle_")) {
      const idx = key.split("_")[1];
      const powLink = formData.get(`proofLink_${idx}`) as string;
      if (value && powLink) extraProofOfWork.push({ title: value as string, link: powLink });
    }
  });

  let imageUrl = formData.get("imageUrl") as string;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0 && imageFile.name) {
    const { uploadImage } = await import("~/lib/cloudinary");
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    try {
      imageUrl = await uploadImage(buffer, "portfolio/projects");
    } catch (e) {
      console.error("Cloudinary upload failed", e);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  }
  const techStack = (formData.get("techStack") as string)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (!title || !description) throw new Error("Title and description required");

  if (id) {
    await Project.findByIdAndUpdate(id, { title, description, link, imageUrl, techStack, github, gitlab, youtube, tag, extraProofOfWork });
  } else {
    await Project.create({ title, description, link, imageUrl, techStack, github, gitlab, youtube, tag, extraProofOfWork });
  }
  return { success: true };
}, "save-project");

const deleteProjectAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  const id = formData.get("id") as string;
  if (id) await Project.findByIdAndDelete(id);
  return { success: true };
}, "delete-project");

export const route = { load: () => getProjects() };

export default function ManageProjects() {
  const projects = createAsync(() => getProjects());
  const saveSub = useSubmission(saveProjectAction);
  const deleteSub = useSubmission(deleteProjectAction);

  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [formState, setFormState] = createSignal({
    title: "", description: "", link: "", imageUrl: "", techStack: "",
    github: "", gitlab: "", youtube: "", tag: ""
  });
  
  const [proofs, setProofs] = createSignal<{id: number, title: string, link: string}[]>([]);
  let proofIdCounter = 0;

  const handleEdit = (proj: any) => {
    setEditingId(proj._id);
    setFormState({
      title: proj.title || "",
      description: proj.description || "",
      link: proj.link || "",
      imageUrl: proj.imageUrl || "",
      techStack: proj.techStack?.join(", ") || "",
      github: proj.github || "",
      gitlab: proj.gitlab || "",
      youtube: proj.youtube || "",
      tag: proj.tag || ""
    });
    
    // Map existing proofs
    if (proj.extraProofOfWork) {
      setProofs(proj.extraProofOfWork.map((p: any) => ({
        id: proofIdCounter++,
        title: p.title,
        link: p.link
      })));
    } else {
      setProofs([]);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormState({ title: "", description: "", link: "", imageUrl: "", techStack: "", github: "", gitlab: "", youtube: "", tag: "" });
    setProofs([]);
  };

  const addProof = () => setProofs([...proofs(), { id: proofIdCounter++, title: "", link: "" }]);
  const removeProof = (id: number) => setProofs(proofs().filter(p => p.id !== id));
  const updateProof = (id: number, field: "title" | "link", val: string) => {
    setProofs(proofs().map(p => p.id === id ? { ...p, [field]: val } : p));
  };


  return (
    <div class="space-y-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Manage Projects</h1>
        <button onClick={handleCreateNew} class="px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-lg shadow hover:bg-black transition-colors">
          Create New Project
        </button>
      </div>

      {/* Editor Form */}
      <div class="bg-[var(--color-cream)] p-6 rounded-2xl shadow-sm border border-[var(--color-border)]">
        <h2 class="text-xl font-bold mb-4">{editingId() ? "Edit Project" : "New Project"}</h2>
        <form
          action={saveProjectAction}
          method="post"
          enctype="multipart/form-data"
          class="space-y-4"
          onSubmit={(e) => {
            const form = e.currentTarget;
            setTimeout(() => { reload(); handleCreateNew(); form.reset(); }, 300);
          }}
        >
          {editingId() && <input type="hidden" name="id" value={editingId()!} />}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input name="title" required value={formState().title} onInput={e => setFormState({...formState(), title: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Tag (e.g. Full Stack, ML)</label>
              <input name="tag" required value={formState().tag} onInput={e => setFormState({...formState(), tag: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
              <input name="techStack" value={formState().techStack} onInput={e => setFormState({...formState(), techStack: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Live Demo URL</label>
              <input name="link" value={formState().link} onInput={e => setFormState({...formState(), link: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">GitHub URL</label>
              <input name="github" value={formState().github} onInput={e => setFormState({...formState(), github: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">GitLab URL</label>
              <input name="gitlab" value={formState().gitlab} onInput={e => setFormState({...formState(), gitlab: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">YouTube URL</label>
              <input name="youtube" value={formState().youtube} onInput={e => setFormState({...formState(), youtube: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Image URL</label>
              <input name="imageUrl" value={formState().imageUrl} onInput={e => setFormState({...formState(), imageUrl: e.currentTarget.value})} class="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1">Or Upload Image (overrides URL)</label>
              <input type="file" name="image" accept="image/*" class="w-full px-3 py-2 border rounded-lg bg-white" />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1 flex justify-between">
                <span>Description (Markdown Supported)</span>
              </label>
              <textarea name="description" required value={formState().description} onInput={e => setFormState({...formState(), description: e.currentTarget.value})} rows="6" class="w-full px-3 py-2 border rounded-lg font-mono text-sm"></textarea>
              <Show when={formState().description}>
                <div class="mt-2 p-4 bg-white border border-[var(--color-border)] rounded-lg prose prose-sm max-w-none text-left" innerHTML={DOMPurify.sanitize(marked(formState().description, { async: false }) as string)} />
              </Show>
            </div>

            <div class="md:col-span-2 border-t border-[var(--color-border)] pt-4 mt-2">
              <div class="flex justify-between items-center mb-4">
                 <label class="block text-sm font-bold text-[var(--color-deep)]">Extra Proof of Work (Drive links, Docs, etc)</label>
                 <button type="button" onClick={addProof} class="px-3 py-1 bg-[var(--color-accent-surface)] text-[var(--color-accent)] text-sm font-medium rounded hover:bg-purple-200 transition-colors">+ Add Link</button>
              </div>
              <div class="space-y-3">
                 <For each={proofs()}>
                    {(proof) => (
                       <div class="flex gap-2 items-start">
                          <input required name={`proofTitle_${proof.id}`} placeholder="Title (e.g. Design Doc)" value={proof.title} onInput={e => updateProof(proof.id, "title", e.currentTarget.value)} class="flex-1 px-3 py-2 border rounded-lg text-sm" />
                          <input required name={`proofLink_${proof.id}`} placeholder="URL" value={proof.link} onInput={e => updateProof(proof.id, "link", e.currentTarget.value)} class="flex-[2] px-3 py-2 border rounded-lg text-sm" />
                          <button type="button" onClick={() => removeProof(proof.id)} class="p-2 text-red-500 hover:bg-red-50 rounded-lg">×</button>
                       </div>
                    )}
                 </For>
                 <Show when={proofs().length === 0}>
                    <p class="text-xs text-[var(--color-text-muted)] italic">No extra links added.</p>
                 </Show>
              </div>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button type="submit" disabled={saveSub.pending} class="px-6 py-2 bg-[var(--color-deep)] text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50">
              {saveSub.pending ? "Saving..." : "Save Project"}
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
        {projects()?.map((proj: any) => (
          <div class="bg-white p-4 rounded-xl shadow-sm border border-[var(--color-border)] flex justify-between items-center">
            <div>
              <h3 class="font-bold text-lg">{proj.title}</h3>
              <p class="text-sm text-gray-600 line-clamp-1">{proj.description}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  👁️ {proj.views || 0} views
                </span>
              </div>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(proj)} class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                Edit
              </button>
              <form action={deleteProjectAction} method="post" onSubmit={() => setTimeout(() => reload(), 100)}>
                <input type="hidden" name="id" value={proj._id} />
                <button type="submit" disabled={deleteSub.pending} class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {(!projects() || projects()?.length === 0) && (
          <p class="text-[var(--color-text-muted)] text-center py-8">No projects found.</p>
        )}
      </div>
    </div>
  );
}
