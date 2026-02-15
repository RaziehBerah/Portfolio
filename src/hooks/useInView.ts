import { useEffect, useState } from "react";

export function useInView<T extends Element>(
    ref: React.RefObject<T | null>,
    options?: IntersectionObserverInit
) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        }, options);

        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, options?.root, options?.rootMargin, options?.threshold]);

    return inView;
}
