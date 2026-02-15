import { useCallback, useRef, useState } from "react";

export function useFilmCarousel(total: number) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [current, setCurrent] = useState(0);

    const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
        const el = scrollerRef.current;
        if (!el) return;
        const width = el.clientWidth || 1;
        el.scrollTo({ left: index * width, behavior });
    }, []);

    const next = useCallback(() => {
        setCurrent((cur) => {
            const isLast = cur === total - 1;
            const nxt = isLast ? 0 : cur + 1;
            scrollToIndex(nxt, isLast ? "auto" : "smooth");
            return nxt;
        });
    }, [scrollToIndex, total]);

    const prev = useCallback(() => {
        setCurrent((cur) => {
            const isFirst = cur === 0;
            const prv = isFirst ? total - 1 : cur - 1;
            scrollToIndex(prv, isFirst ? "auto" : "smooth");
            return prv;
        });
    }, [scrollToIndex, total]);

    const onScroll = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const width = el.clientWidth || 1;
        const idx = Math.round(el.scrollLeft / width);
        setCurrent((c) => (c === idx ? c : idx));
    }, []);

    return { scrollerRef, current, next, prev, onScroll };
}
