import { createSignal } from "solid-js";
import { action, useSubmission, redirect } from "@solidjs/router";
import { setAuthCookie, createToken } from "~/lib/auth";
import { connectDB } from "~/lib/db";
import { User } from "~/lib/models";
import bcrypt from "bcryptjs";

const loginAction = action(async (formData: FormData) => {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return new Error("Username and password are required.");
  }

  await connectDB();
  const user = await User.findOne({ username });
  if (!user) {
    return new Error("Invalid username or password.");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Error("Invalid username or password.");
  }

  const token = await createToken({ id: user._id, username: user.username });
  await setAuthCookie(token);
  throw redirect("/admin/dashboard");
}, "login-action");

export default function AdminLogin() {
  const submission = useSubmission(loginAction);

  return (
    <div class="min-h-screen bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 text-[var(--color-text)]">
      <div class="max-w-md w-full bg-[var(--color-cream)] rounded-2xl p-8 shadow-xl border border-[var(--color-border)]">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-serif text-[var(--color-deep)] font-bold mb-2">Admin Login</h1>
          <p class="text-[var(--color-text-muted)] text-sm">Sign in to manage your portfolio</p>
        </div>

        <form action={loginAction} method="post" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2 text-[var(--color-text)]" for="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              class="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-black transition-all"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-[var(--color-text)]" for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-black transition-all"
              placeholder="Enter password"
            />
          </div>

          {submission.result instanceof Error && (
            <div class="p-3 bg-red-100 text-red-700 text-sm rounded-xl">
              {submission.result.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submission.pending}
            class="w-full py-3 px-4 bg-[var(--color-accent)] hover:bg-black text-white rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {submission.pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
