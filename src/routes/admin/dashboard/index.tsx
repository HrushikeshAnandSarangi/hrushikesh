import { cache, createAsync } from "@solidjs/router";
import { connectDB } from "~/lib/db";
import { Analytics } from "~/lib/models";
import { requireAuth } from "~/lib/auth";

const getAnalytics = cache(async () => {
  "use server";
  await requireAuth();
  await connectDB();
  const analytics = await Analytics.find().lean();
  return JSON.parse(JSON.stringify(analytics));
}, "analytics");

export const route = {
  load: () => getAnalytics()
};

export default function DashboardOverview() {
  const analytics = createAsync(() => getAnalytics());

  const getViews = (path: string) => {
    const entry = analytics()?.find((a: any) => a.path === path);
    return entry?.views || 0;
  };

  return (
    <div class="space-y-6">
      <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Dashboard Overview</h1>
      <p class="text-[var(--color-text-muted)]">Select from the menu to manage your Projects or Posts.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-medium mb-1">Projects</h3>
            <div class="mb-4">
              <span class="text-3xl font-bold text-[var(--color-deep)]">{getViews('/projects')}</span>
              <span class="text-xs font-semibold text-[var(--color-text-muted)] ml-1">Total Page Views</span>
            </div>
            <p class="text-sm text-[var(--color-text-muted)] mb-4">Manage your portfolio projects.</p>
            <a href="/admin/dashboard/projects" class="text-[var(--color-accent)] hover:underline font-medium">Go to Projects →</a>
          </div>
        </div>
        
        <div class="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-medium mb-1">Posts</h3>
            <div class="mb-4">
               <span class="text-3xl font-bold text-[var(--color-deep)]">{getViews('/blogs')}</span>
               <span class="text-xs font-semibold text-[var(--color-text-muted)] ml-1">Total Page Views</span>
            </div>
            <p class="text-sm text-[var(--color-text-muted)] mb-4">Manage your blog posts.</p>
            <a href="/admin/dashboard/posts" class="text-[var(--color-accent)] hover:underline font-medium">Go to Posts →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
