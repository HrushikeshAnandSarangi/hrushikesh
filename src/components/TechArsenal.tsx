import { createSignal, For } from "solid-js";
import ScrollReveal from "./ScrollReveal";

const devicon = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-original.svg`;
const deviconPlain = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-plain.svg`;
const simpleIcon = (n: string, hex = "ffffff") => `https://cdn.simpleicons.org/${n}/${hex}`;

interface TechItem { name: string; icon?: string }
interface TechCategory { title: string; items: TechItem[] }

const categories: TechCategory[] = [
    {
        title: "Programming Languages",
        items: [
            { name: "Python", icon: devicon("python") },
            { name: "C", icon: devicon("c") },
            { name: "C++", icon: devicon("cplusplus") },
            { name: "Rust", icon: simpleIcon("rust") },
            { name: "Java", icon: devicon("java") },
            { name: "TypeScript", icon: devicon("typescript") },
            { name: "JavaScript", icon: devicon("javascript") },
            { name: "SQL", icon: devicon("azuresqldatabase") },
            { name: "x86 Assembly" },
            { name: "WebAssembly", icon: devicon("wasm") },
        ],
    },
    {
        title: "Robotics & Autonomous Systems",
        items: [
            { name: "ROS", icon: simpleIcon("ros", "22314E") },
            { name: "ROS2", icon: simpleIcon("ros", "22314E") },
            { name: "Nav2 Stack" },
            { name: "RViz" },
            { name: "Gazebo" },
            { name: "MAVLink" },
        ],
    },
    {
        title: "Frontend",
        items: [
            { name: "React", icon: devicon("react") },
            { name: "Next.js", icon: devicon("nextjs") },
            { name: "SolidJS", icon: devicon("solidjs") },
            { name: "TailwindCSS", icon: devicon("tailwindcss") },
            { name: "Deoxis" },
            { name: "Web3.js", icon: simpleIcon("web3dotjs", "F16822") },
        ],
    },
    {
        title: "Backend Frameworks",
        items: [
            { name: "Flask", icon: deviconPlain("flask") },
            { name: "FastAPI", icon: simpleIcon("fastapi", "009688") },
            { name: "Django", icon: deviconPlain("django") },
            { name: "Node.js", icon: devicon("nodejs") },
            { name: "Spring Boot", icon: devicon("spring") },
            { name: "Drogon (C++)" },
            { name: "Axum (Rust)" },
            { name: "Actix (Rust)" },
        ],
    },
    {
        title: "Communication & APIs",
        items: [
            { name: "gRPC", icon: devicon("grpc") },
            { name: "Protocol Buffers", icon: devicon("protobuf") },
            { name: "REST APIs" },
            { name: "WebSockets" },
        ],
    },
    {
        title: "Databases & Data Layer",
        items: [
            { name: "MongoDB", icon: devicon("mongodb") },
            { name: "PostgreSQL", icon: devicon("postgresql") },
            { name: "SQLite", icon: devicon("sqlite") },
            { name: "Supabase", icon: devicon("supabase") },
            { name: "Firebase", icon: devicon("firebase") },
            { name: "Neon", icon: simpleIcon("neon", "00E5A0") },
            { name: "Prisma ORM", icon: devicon("prisma") },
        ],
    },
    {
        title: "Observability",
        items: [
            { name: "Prometheus", icon: simpleIcon("prometheus", "E6522C") },
            { name: "Grafana", icon: simpleIcon("grafana", "F46800") },
        ],
    },
    {
        title: "Cloud, DevOps & Infrastructure",
        items: [
            { name: "Azure", icon: devicon("azure") },
            { name: "Google Cloud", icon: devicon("googlecloud") },
            { name: "AWS", icon: devicon("amazonwebservices") },
            { name: "Cloudflare", icon: devicon("cloudflare") },
            { name: "Vercel", icon: simpleIcon("vercel", "ffffff") },
            { name: "Docker", icon: devicon("docker") },
            { name: "Kubernetes", icon: devicon("kubernetes") },
            { name: "Terraform", icon: simpleIcon("terraform", "844FBA") },
            { name: "GitHub Actions", icon: simpleIcon("githubactions", "2088FF") },
            { name: "Nginx", icon: devicon("nginx") },
            { name: "Supabase Cloud", icon: devicon("supabase") },
            { name: "Cloudinary", icon: simpleIcon("cloudinary", "3448C5") },
            { name: "Pingora" },
        ],
    },
    {
        title: "Tooling & Build Systems",
        items: [
            { name: "Git", icon: devicon("git") },
            { name: "GitLab", icon: devicon("gitlab") },
            { name: "Nix", icon: devicon("nixos") },
            { name: "Bun", icon: devicon("bun") },
            { name: "npm", icon: devicon("npm") },
            { name: "Cargo", icon: simpleIcon("rust", "DEA584") },
            { name: "CMake", icon: devicon("cmake") },
            { name: "Vim", icon: devicon("vim") },
            { name: "FFmpeg", icon: simpleIcon("ffmpeg", "007808") },
            { name: "GStreamer" },
        ],
    },
    {
        title: "Blockchain, Web3 & Crypto",
        items: [
            { name: "Bitcoin Protocol", icon: simpleIcon("bitcoin", "F7931A") },
            { name: "Solana Runtime", icon: simpleIcon("solana", "9945FF") },
            { name: "Anchor Framework" },
            { name: "Pinocchio Framework" },
            { name: "SPL Token Program" },
            { name: "RPC Node Interaction" },
        ],
    },
];

function CategoryAccordion(props: { cat: TechCategory; index: number }) {
    const [open, setOpen] = createSignal(props.index < 3); // first 3 open by default

    return (
        <div class="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm">
            <button
                onClick={() => setOpen(!open())}
                class="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.03] transition-colors duration-200 group cursor-pointer"
            >
                <span class="text-xs font-bold tracking-[0.15em] uppercase text-purple-300/80 group-hover:text-purple-300 transition-colors">
                    {props.cat.title}
                </span>
                <span class="text-xs text-gray-500 flex items-center gap-2">
                    <span>{props.cat.items.length}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="transition-transform duration-300"
                        style={{ transform: open() ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            <div
                class="overflow-hidden transition-all duration-300"
                style={{
                    "max-height": open() ? "400px" : "0px",
                    opacity: open() ? "1" : "0",
                }}
            >
                <div class="flex flex-wrap gap-2 px-5 pb-4 pt-1">
                    <For each={props.cat.items}>
                        {(item) => (
                            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 border border-white/6 bg-white/[0.03] hover:border-purple-500/25 hover:bg-purple-500/8 hover:text-white transition-all duration-200 cursor-default">
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt=""
                                        width="14"
                                        height="14"
                                        loading="lazy"
                                        class="select-none"
                                        style={{ "min-width": "14px" }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                    />
                                )}
                                {item.name}
                            </span>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}

export default function TechArsenal() {
    return (
        <section class="w-full py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0b1a 0%, #1a1333 50%, #0d0b1a 100%)" }}>
            <div class="absolute top-20 left-10 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" style={{ animation: "float-orb-slow 18s ease-in-out infinite" }} />

            <div class="max-w-4xl mx-auto relative z-10">
                <ScrollReveal>
                    <p class="text-sm font-medium tracking-[0.25em] uppercase text-purple-400 mb-4 text-center">Skills</p>
                    <h2 class="heading-serif text-4xl md:text-5xl text-white mb-12 text-center">Technologies & Frameworks</h2>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div class="space-y-2">
                        <For each={categories}>
                            {(cat, i) => <CategoryAccordion cat={cat} index={i()} />}
                        </For>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
