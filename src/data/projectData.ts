export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "kernal-module-framework",
        title: "Kernel Module Framework",
        description: "A lightweight framework for building and testing Linux kernel modules with hot-reload support and integrated debugging.",
        longDescription: `Building and testing Linux kernel modules typically requires tedious setup and repeated reboot cycles. This framework streamlines the entire workflow by providing a hot-reload mechanism, structured logging, and integrated GDB support.\n\nThe framework includes a custom build system on top of CMake, a userspace testing harness that simulates kernel APIs, and a CLI tool for scaffolding new modules. It supports both x86_64 and ARM architectures and has been used to develop several production device drivers.\n\nKey features include automatic symbol resolution, memory leak detection via custom allocators, and a CI pipeline template for automated module testing against multiple kernel versions.`,
        image: "/project-placeholder.png",
        tags: ["C", "Linux", "CMake", "GDB"],
        repoUrl: "https://github.com/HrushikeshAnandSarangi"
    },
    {
        slug: "distributed-task-scheduler",
        title: "Distributed Task Scheduler",
        description: "A fault-tolerant, horizontally scalable task scheduler built with Go, using Raft consensus for leader election.",
        longDescription: `This distributed task scheduler handles millions of scheduled jobs across a cluster of worker nodes. It uses the Raft consensus algorithm for leader election and log replication, ensuring no single point of failure.\n\nThe scheduler supports cron-like scheduling, one-off delayed tasks, and priority queues. Each node maintains a local WAL (Write-Ahead Log) for crash recovery. Communication between nodes uses gRPC with mutual TLS.\n\nThe dashboard, built with SolidJS, provides real-time visibility into task states, node health, and throughput metrics. In load testing, the system sustained 50k tasks/second with sub-10ms scheduling latency.`,
        image: "/project-placeholder.png",
        tags: ["Go", "Raft", "gRPC", "Redis"],
        repoUrl: "https://github.com/HrushikeshAnandSarangi"
    },
    {
        slug: "embedded-rtos-dashboard",
        title: "Embedded RTOS Dashboard",
        description: "Real-time monitoring dashboard for embedded systems running FreeRTOS, with live memory and task profiling.",
        longDescription: `Embedded systems engineers often lack real-time visibility into their RTOS task scheduling, memory usage, and interrupt latency. This dashboard bridges that gap by connecting to a target MCU over UART/SWD and streaming telemetry data.\n\nThe firmware-side agent is written in C and adds minimal overhead (~2KB flash, <1% CPU). It hooks into FreeRTOS trace macros to capture task switches, stack high-water marks, and heap fragmentation metrics.\n\nThe web dashboard, built with SolidJS and WebSerial API, renders live flame graphs, task timeline views, and memory maps. It supports STM32, ESP32, and Nordic nRF52 families out of the box.`,
        image: "/project-placeholder.png",
        tags: ["C", "FreeRTOS", "SolidJS", "WebSerial"],
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/HrushikeshAnandSarangi"
    },
    {
        slug: "network-packet-analyzer",
        title: "Network Packet Analyzer",
        description: "A high-performance packet capture and analysis tool written in Rust, with support for custom protocol dissectors.",
        longDescription: `Wireshark is powerful but heavy. This tool was designed for engineers who need a fast, scriptable, terminal-first packet analyzer. Built in Rust using raw sockets and zero-copy buffers, it captures packets at line rate on 10GbE interfaces.\n\nUsers can write custom protocol dissectors in a simple DSL that compiles to native code. The tool supports BPF filters, PCAP export, and real-time statistics (throughput, packet rates, protocol distribution).\n\nIt includes a TUI (terminal UI) built with ratatui for interactive analysis and a JSON export mode for integration with monitoring pipelines. Benchmarks show 3-5x faster capture than libpcap-based tools on commodity hardware.`,
        image: "/project-placeholder.png",
        tags: ["Rust", "Networking", "TUI", "BPF"],
        repoUrl: "https://github.com/HrushikeshAnandSarangi"
    },
    {
        slug: "infra-as-code-visualizer",
        title: "Infra-as-Code Visualizer",
        description: "An interactive tool that parses Terraform configs and renders a live, navigable graph of your infrastructure.",
        longDescription: `Understanding complex Terraform configurations with hundreds of resources and modules is challenging. This visualizer parses HCL files and generates an interactive dependency graph using D3.js force-directed layouts.\n\nFeatures include: module-level grouping with collapsible clusters, resource search and filtering, diff visualization between plan and state, and cost estimation integration with Infracost. The tool supports both CLI and web modes.\n\nThe parser is written in Go for speed and handles Terraform modules, data sources, and provider configurations. The web frontend uses SolidJS with canvas rendering for smooth interaction even with 1000+ resource graphs.`,
        image: "/project-placeholder.png",
        tags: ["Go", "Terraform", "D3.js", "SolidJS"],
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/HrushikeshAnandSarangi"
    }
];
