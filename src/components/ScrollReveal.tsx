import { onMount, onCleanup, type JSX, type ParentComponent } from "solid-js";

interface ScrollRevealProps {
    class?: string;
    children: JSX.Element;
    delay?: number;
    threshold?: number;
}

const ScrollReveal: ParentComponent<ScrollRevealProps> = (props) => {
    let ref: HTMLDivElement | undefined;

    onMount(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: props.threshold ?? 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(ref);

        onCleanup(() => observer.disconnect());
    });

    return (
        <div
            ref={ref}
            class={`reveal ${props.class || ""}`}
            style={props.delay ? { "transition-delay": `${props.delay}s` } : undefined}
        >
            {props.children}
        </div>
    );
};

export default ScrollReveal;
