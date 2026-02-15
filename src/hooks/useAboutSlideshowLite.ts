import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
    count?: number;
    startIndex?: number;
    intervalMs?: number;
    enabled?: boolean;
};

export function useAboutSlideshowLite({
    count = 11,
    startIndex = 2,
    intervalMs = 6000,
    enabled = true,
}: Options = {}) {
    const list = useMemo(
        () => Array.from({ length: count }, (_, i) => `media/images/${i + startIndex}.jpg`),
        [count, startIndex]
    );

    const [idx, setIdx] = useState(0);

    // ✅ محافظ برای StrictMode (جلوگیری از interval دو تایی)
    const timerRef = useRef<number | null>(null);

    // ✅ preload عکس بعدی (جلوگیری از فلش/پرش هنگام لود)
    useEffect(() => {
        const next = list[(idx + 1) % list.length];
        const img = new Image();
        img.src = next;
    }, [idx, list]);

    useEffect(() => {
        if (!enabled || list.length <= 1) {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        if (timerRef.current) return; // already running

        timerRef.current = window.setInterval(() => {
            setIdx((i) => (i + 1) % list.length);
        }, intervalMs);

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [enabled, intervalMs, list.length]);

    const current = list[idx];
    const prev = list[(idx - 1 + list.length) % list.length];

    return { current, prev };
}
