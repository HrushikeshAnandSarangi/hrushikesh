import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Footer from "~/components/Footer";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <div class="relative min-h-screen flex flex-col font-sans text-[var(--color-text)] z-10">
          <main class="flex-1 flex flex-col items-center">
            <Suspense>{props.children}</Suspense>
          </main>
          <Footer />
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
