import { createSignal, Show } from "solid-js";
import { action, cache, createAsync, useSubmission, reload } from "@solidjs/router";
import { connectDB } from "~/lib/db";
import { Message } from "~/lib/models";
import { requireAuth } from "~/lib/auth";

const getMessages = cache(async () => {
  "use server";
  await requireAuth();
  await connectDB();
  const messages = await Message.find().sort({ date: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}, "messages");

const deleteMessageAction = action(async (formData: FormData) => {
  "use server";
  await requireAuth();
  await connectDB();
  const id = formData.get("id") as string;
  if (id) await Message.findByIdAndDelete(id);
  return { success: true };
}, "delete-message");

export const route = { load: () => getMessages() };

export default function ManageMessages() {
  const messages = createAsync(() => getMessages());
  const deleteSub = useSubmission(deleteMessageAction);

  return (
    <div class="space-y-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Inbox</h1>
      </div>

      <div class="grid gap-4">
        {messages()?.map((msg: any) => (
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border)] flex flex-col gap-4 relative">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-[var(--color-text)]">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} class="text-sm text-blue-600 hover:underline">{msg.email}</a>
                <p class="text-xs text-[var(--color-text-muted)] mt-1">{new Date(msg.date).toLocaleString()}</p>
              </div>
              <form action={deleteMessageAction} method="post" onSubmit={() => setTimeout(() => reload(), 100)}>
                <input type="hidden" name="id" value={msg._id} />
                <button type="submit" disabled={deleteSub.pending} class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </form>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-xl border border-[var(--color-border)]">
              <p class="text-[var(--color-text)] whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        ))}
        
        {(!messages() || messages()?.length === 0) && (
          <div class="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center">
            <span class="text-4xl block mb-4">📭</span>
            <h3 class="text-xl font-bold text-[var(--color-text)] mb-2">Inbox Zero!</h3>
            <p class="text-[var(--color-text-muted)]">You don't have any new messages right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
