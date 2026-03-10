export default function DashboardOverview() {
  return (
    <div class="space-y-6">
      <h1 class="text-3xl font-serif font-bold text-[var(--color-deep)]">Dashboard Overview</h1>
      <p class="text-[var(--color-text-muted)]">Select from the menu to manage your Projects or Posts.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
          <h3 class="text-xl font-medium mb-2">Projects</h3>
          <p class="text-sm text-[var(--color-text-muted)] mb-4">Manage your portfolio projects.</p>
          <a href="/admin/dashboard/projects" class="text-[var(--color-accent)] hover:underline font-medium">Go to Projects →</a>
        </div>
        
        <div class="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
          <h3 class="text-xl font-medium mb-2">Posts</h3>
          <p class="text-sm text-[var(--color-text-muted)] mb-4">Manage your blog posts.</p>
          <a href="/admin/dashboard/posts" class="text-[var(--color-accent)] hover:underline font-medium">Go to Posts →</a>
        </div>
      </div>
    </div>
  );
}
