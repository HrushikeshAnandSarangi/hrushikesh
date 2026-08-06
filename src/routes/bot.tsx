import { createAsync } from "@solidjs/router";
import { cache } from "@solidjs/router";
import { connectDB } from "~/lib/db";
import { Project } from "~/lib/models";

const getBotData = cache(async () => {
  "use server";
  await connectDB();
  const projects = await Project.find().sort({ _id: -1 }).lean();
  return { 
    projects: JSON.parse(JSON.stringify(projects))
  };
}, "bot-data");

export const route = { load: () => getBotData() };

export default function BotPage() {
  const data = createAsync(() => getBotData());

  return (
    <article class="w-full max-w-4xl mx-auto p-8 prose prose-invert font-sans">
      <header class="mb-12 border-b border-white/20 pb-8">
        <h1 class="text-4xl font-bold mb-4 text-[var(--color-text)]">Hrushikesh Anand Sarangi</h1>
        <p class="text-xl text-[var(--color-text-muted)] mb-6">Systems engineer by obsession, Industrial Designer by accident.</p>
        <div class="flex gap-4 text-[var(--color-accent)]">
          <a href="https://github.com/HrushikeshAnandSarangi" class="hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/hrushikesh-anand-sarangi-645b02269/" class="hover:underline">LinkedIn</a>
          <a href="https://x.com/AnandHrushikesh" class="hover:underline">X (Twitter)</a>
          <a href="mailto:hrushikeshsarangi7@gmail.com" class="hover:underline">Email</a>
        </div>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-[var(--color-text)]">About Me</h2>
        <p class="text-[var(--color-text-muted)] mb-4 leading-relaxed">
          I study Industrial Design at NIT Rourkela, which means I was supposed to spend my time thinking about ergonomics and product aesthetics. I still do but somewhere along the way I also started building deployment infrastructure, integrating ML inference engines via native FFI, writing ground station software for UAVs, and tinkering with blockchain VM constraints on Solana. The common thread isn't a stack. It's curiosity about how things actually work underneath.
        </p>
        <p class="text-[var(--color-text-muted)] leading-relaxed">
          Industrial Design taught me that constraints aren't obstacles, they're where the interesting decisions happen. I've carried that into every system I've built since.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-[var(--color-text)]">Experience</h2>
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-medium text-[var(--color-accent)]">Open Source Contributor @ WarpLLM</h3>
            <p class="text-sm text-[var(--color-text-muted)] mb-2">Aug 2026 - Present</p>
            <p class="text-[var(--color-text)]">Helping build WarpLLM — a blazingly fast router for LLMs. Contributing to low-latency request routing and load distribution across inference backends, optimizing the path between prompts and models for maximum throughput.</p>
          </div>
          <div>
            <h3 class="text-xl font-medium text-[var(--color-accent)]">SDE Intern @ Auric Ai Labs</h3>
            <p class="text-sm text-[var(--color-text-muted)] mb-2">April 2026 - July 2026</p>
            <p class="text-[var(--color-text)]">Developing software for cutting-edge AI-powered autonomous tactical unmanned systems for the Indian Defense Forces. Contributing to robust engineering and mission-focused design to ensure technological superiority in defense applications.</p>
          </div>
          <div>
            <h3 class="text-xl font-medium text-[var(--color-accent)]">Full Stack Intern @ N6T Technologies(formerly Clinqo)</h3>
            <p class="text-sm text-[var(--color-text-muted)] mb-2">2025</p>
            <p class="text-[var(--color-text)]">Engineered a full-stack EHR integration with Sysmex Analyzers, fully automating lab data entry to eliminate manual transcription errors and ensure data integrity. Handled client-side troubleshooting and production deployment, translating clinical requirements directly into software patches to maintain system stability.</p>
          </div>
          <div>
            <h3 class="text-xl font-medium text-[var(--color-accent)]">Web Developer @ IEEE Indiscon</h3>
            <p class="text-sm text-[var(--color-text-muted)] mb-2">2024-2025</p>
            <p class="text-[var(--color-text)]">Sole maintainer of the official IEEE INDISCON 2025 conference website. Responsible for keeping the site stable, updated, and performant throughout the conference lifecycle — translating event requirements into web updates under real deadline pressure.</p>
          </div>
          <div>
            <h3 class="text-xl font-medium text-[var(--color-accent)]">Freelancer @ Stealth Startup</h3>
            <p class="text-sm text-[var(--color-text-muted)] mb-2">2024 — Present</p>
            <p class="text-[var(--color-text)]">Independently contracted to build and deliver client web applications end to end. Handled requirements gathering, architecture decisions, frontend and backend implementation, and deployment.</p>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-[var(--color-text)]">Projects</h2>
        <div class="space-y-8">
          {data()?.projects?.map((p: any) => (
            <div class="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
              <h3 class="text-xl font-medium text-[var(--color-accent)] mb-2">{p.title}</h3>
              <p class="text-[var(--color-text)] mb-4">{p.description}</p>
              <div class="flex flex-col gap-1 text-sm">
                {p.link && <p><span class="text-[var(--color-text-muted)]">Link:</span> <a href={p.link} class="text-[var(--color-accent)] hover:underline">{p.link}</a></p>}
                {p.github && <p><span class="text-[var(--color-text-muted)]">GitHub:</span> <a href={p.github} class="text-[var(--color-accent)] hover:underline">{p.github}</a></p>}
                {p.techStack && p.techStack.length > 0 && <p><span class="text-[var(--color-text-muted)]">Stack:</span> <span class="text-[var(--color-text)]">{p.techStack.join(", ")}</span></p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
