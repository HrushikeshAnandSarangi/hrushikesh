export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tag: string;
    excerpt: string;
    content: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "writing-linux-kernel-modules",
        title: "Writing Your First Linux Kernel Module",
        date: "Feb 10, 2026",
        tag: "Systems",
        excerpt: "A hands-on guide to building, loading, and debugging Linux kernel modules from scratch — no prior kernel experience needed.",
        content: [
            "If you've ever wondered what happens below the surface of your operating system, writing a kernel module is the best way to find out. Unlike userspace programs, kernel modules run with full hardware access and no safety net — which makes them both powerful and exciting to work with.",
            "In this guide, we'll walk through setting up a development environment, writing a minimal 'hello world' module, understanding the module lifecycle (init and exit), and using dmesg to observe your module in action. We'll also cover Makefiles for out-of-tree builds and how to pass parameters to your module at load time.",
            "Once you have the basics down, we'll explore character device drivers — the gateway to creating custom hardware interfaces. You'll learn about file_operations structs, registering devices with the kernel, and implementing read/write handlers that userspace programs can interact with through /dev.",
            "Debugging kernel code is where things get interesting. We'll set up QEMU with GDB for safe kernel debugging, use printk levels effectively, and explore tools like ftrace and perf for understanding runtime behavior without rebooting constantly.",
            "By the end of this guide, you'll have a working kernel module, a character device driver, and the confidence to dive deeper into the Linux kernel source tree. The kernel isn't as scary as it looks — it's just C with some conventions."
        ]
    },
    {
        slug: "building-high-performance-go-services",
        title: "Building High-Performance Services in Go",
        date: "Jan 25, 2026",
        tag: "Backend",
        excerpt: "Lessons learned from building Go services that handle 50k+ requests per second — from profiling to zero-allocation patterns.",
        content: [
            "Go's simplicity makes it easy to get a service running, but getting it to perform well under heavy load requires understanding its runtime internals. Over the past year, I've built several high-throughput services and want to share the patterns that made the biggest difference.",
            "The first lesson is to profile before optimizing. Go's built-in pprof tool is incredibly powerful — CPU profiles, heap profiles, goroutine dumps, and block profiles are all just an HTTP endpoint away. I'll show you how to read flame graphs and identify the hot paths that actually matter.",
            "Memory allocations are the silent performance killer in Go. Every allocation creates work for the garbage collector, which means GC pauses and increased latency. We'll explore sync.Pool for object reuse, stack-allocated variables, and the art of writing zero-allocation hot paths.",
            "Concurrency patterns matter more than raw goroutine counts. We'll look at worker pools with bounded concurrency, channel-based pipelines, and when to use sync.Mutex vs sync.RWMutex vs atomic operations. The wrong concurrency pattern can make your service slower, not faster.",
            "Finally, we'll discuss connection pooling for databases and external services, HTTP/2 and gRPC configuration tuning, and how to use Go's race detector and benchmarking tools to ensure your optimizations actually work. Performance is a feature — treat it like one."
        ]
    },
    {
        slug: "demystifying-container-runtimes",
        title: "Demystifying Container Runtimes",
        date: "Dec 15, 2025",
        tag: "DevOps",
        excerpt: "What actually happens when you run 'docker run'? A deep dive into namespaces, cgroups, and the OCI runtime spec.",
        content: [
            "Containers feel like magic — type 'docker run' and suddenly you have an isolated environment with its own filesystem, network, and process tree. But there's no magic involved, just clever use of Linux kernel features that have existed for over a decade.",
            "The foundation of containers is Linux namespaces. Each namespace type (PID, Network, Mount, UTS, User, IPC, Cgroup) provides isolation for a specific system resource. We'll use the unshare() system call to create namespaces manually and understand what Docker does behind the scenes.",
            "Control groups (cgroups) are the other half of the equation. While namespaces provide isolation (what a process can see), cgroups provide resource limits (what a process can use). We'll explore cgroup v2 hierarchies, setting memory and CPU limits, and how the OOM killer interacts with containerized processes.",
            "The OCI (Open Container Initiative) runtime spec standardizes how containers are created and run. We'll trace through the lifecycle: pulling an image (just a tarball of layers), creating a rootfs via overlayfs, generating an OCI runtime config, and finally calling runc to set up namespaces and cgroups.",
            "Understanding these internals isn't just academic — it helps you debug container issues, write better Dockerfiles, optimize image sizes, and make informed decisions about container security. Once you see containers as 'processes with extra kernel features,' everything clicks."
        ]
    }
];
