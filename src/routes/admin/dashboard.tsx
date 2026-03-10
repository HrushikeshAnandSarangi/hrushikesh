import { Title } from "@solidjs/meta";
import { action, cache, createAsync, redirect, A } from "@solidjs/router";
import { clearAuthCookie, requireAuth } from "~/lib/auth";

const checkAuthAndGetDashboardData = cache(async () => {
  "use server";
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) {
    throw redirect("/admin");
  }
  return { isAuthenticated };
}, "dashboard-data");

const logoutAction = action(async () => {
  "use server";
  await clearAuthCookie();
  throw redirect("/admin");
}, "logout-action");

export const route = {
  load: () => checkAuthAndGetDashboardData(),
};

export default function AdminDashboardLayout(props: any) {
  createAsync(() => checkAuthAndGetDashboardData());

  return (
    <div class="min-h-screen bg-[var(--color-surface)] flex flex-col md:flex-row text-[var(--color-text)]">
      <Title>Admin Dashboard</Title>
      
      {/* Sidebar */}
      <aside class="w-full md:w-64 bg-[var(--color-deep)] p-6 flex flex-col justify-between border-r border-[var(--color-border)] min-h-screen">
        <div>
          <h2 class="text-2xl font-serif font-bold text-[var(--color-cream)] mb-8">Admin / CMS</h2>
          <nav class="space-y-4">
            <A href="/admin/dashboard" end class="block text-[var(--color-cream)]/70 hover:text-white transition-colors py-2 px-3 rounded hover:bg-white/10" activeClass="bg-white/10 text-white font-medium">Overview</A>
            <A href="/admin/dashboard/projects" class="block text-[var(--color-cream)]/70 hover:text-white transition-colors py-2 px-3 rounded hover:bg-white/10" activeClass="bg-white/10 text-white font-medium">Projects</A>
            <A href="/admin/dashboard/posts" class="block text-[var(--color-cream)]/70 hover:text-white transition-colors py-2 px-3 rounded hover:bg-white/10" activeClass="bg-white/10 text-white font-medium">Posts</A>
          </nav>
        </div>
        
        <div>
          <form action={logoutAction} method="post">
            <button type="submit" class="w-full py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500 rounded-lg transition-colors font-medium">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Content */}
      <main class="flex-1 p-8 overflow-y-auto">
        {props.children}
      </main>
    </div>
  );
}
