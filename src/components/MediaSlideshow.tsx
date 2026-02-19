import { Box, Image } from "@chakra-ui/react";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useAboutSlideshowLite } from "../hooks/useAboutSlideshowLite";

type Props = {
    count: number;
    startIndex?: number;
    intervalMs?: number;
    enabled?: boolean;
    maxW?: any;
    h?: any;
    borderRadius?: string | number;
};

export function MediaSlideshow({
    count,
    startIndex = 2,
    intervalMs = 4500,
    enabled = true,

    // ✅ پیش‌فرض جدید: فول عرض (برای اینکه تو Awards هم چپ خالی نمونه)
    maxW = "100%",

    h = { base: "460px", md: "600px" },
    borderRadius = "18px",
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { threshold: 0.25 });

    const { current, prev } = useAboutSlideshowLite({
        count,
        startIndex,
        intervalMs,
        enabled: enabled && inView,
    });

    // ✅ اگر فول‌عرضه، دیگه auto نذار که وسط نیفته
    const mxValue =
        maxW === "100%" ? "0" : { base: "auto", md: "0" };

    return (
        <Box ref={ref} w="100%">
            <Box
                position="relative"
                w="100%"
                maxW={maxW}
                mx={mxValue}
                h={h}
                overflow="hidden"
                borderRadius={borderRadius}
                bg="black"
            >
                <Image
                    src={prev}
                    alt="slideshow previous"
                    position="absolute"
                    inset={0}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="center"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                />

                <Image
                    src={current}
                    alt="slideshow current"
                    position="absolute"
                    inset={0}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="center"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    animation="aboutFade 0.9s ease both"
                    sx={{
                        "@keyframes aboutFade": {
                            "0%": { opacity: 0 },
                            "100%": { opacity: 1 },
                        },
                    }}
                />

                <Box
                    position="absolute"
                    inset={0}
                    bg="rgba(0,0,0,0.22)"
                    mixBlendMode="saturation"
                    pointerEvents="none"
                    _hover={{ mixBlendMode: "normal", bg: "transparent" }}
                    transition="all .35s ease"
                />

                <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    w={{ base: "34%", md: "30%" }}
                    pointerEvents="none"
                    bgGradient="linear(to-l, rgba(0,0,0,0.55), rgba(0,0,0,0))"
                />
            </Box>
        </Box>
    );
}
