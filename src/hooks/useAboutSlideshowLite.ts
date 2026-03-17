import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
    images: string[];
    intervalMs?: number;
    enabled?: boolean;
};

export function useAboutSlideshowLite({
    images,
    intervalMs = 4500,
    enabled = true,
}: Options) {
    const list = useMemo(() => images.filter(Boolean), [images]);
    const [idx, setIdx] = useState(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (idx >= list.length) {
            setIdx(0);
        }
    }, [idx, list.length]);

    useEffect(() => {
        if (!enabled || list.length <= 1) return;

        const next = list[(idx + 1) % list.length];
        const img = new window.Image();
        img.src = next;
    }, [enabled, idx, list]);

    useEffect(() => {
        if (!enabled || list.length <= 1) {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        if (timerRef.current !== null) return;

        timerRef.current = window.setInterval(() => {
            setIdx((i) => (i + 1) % list.length);
        }, intervalMs);

        return () => {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [enabled, intervalMs, list.length]);

    const current = list.length ? list[idx] : "";
    const prev = list.length ? list[(idx - 1 + list.length) % list.length] : "";

    return {
        current,
        prev,
        hasImages: list.length > 0,
    };
}