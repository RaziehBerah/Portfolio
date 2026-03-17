import { Box, Image } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useAboutSlideshowLite } from "../hooks/useAboutSlideshowLite";

type Props = {
    intervalMs?: number;
    enabled?: boolean;
    maxW?: any;
    h?: any;
    borderRadius?: string | number;
};

export function MediaSlideshow({
    intervalMs = 3500,
    enabled = true,
    maxW = "100%",
    h = { base: "460px", md: "600px" },
    borderRadius = "18px",
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { threshold: 0.02 });

    const images = useMemo(
        () => [
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786629/2_cofzoq.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786629/3_qyn1us.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786630/4_f7xouq.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786630/5_rfrscc.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786630/6_n4szjl.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773787017/photo_5895292885706411570_y_cis05w.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786799/7_lbf8ao.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786647/9_oykcdg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786647/10_l1oyp1.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786647/11_pewcqi.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/f_auto,q_auto/v1773786648/12_ba7kqr.jpg",
        ],
        []
    );

    const shouldLoad = enabled && inView;

    const { current, prev, hasImages } = useAboutSlideshowLite({
        images,
        intervalMs,
        enabled: shouldLoad,
    });

    const mxValue = maxW === "100%" ? "0" : { base: "auto", md: "0" };

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
                {shouldLoad && hasImages ? (
                    <>
                        <Image
                            src={prev}
                            alt="slideshow previous"
                            position="absolute"
                            inset={0}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            objectPosition="center"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            pointerEvents="none"
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
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
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
                    </>
                ) : null}
            </Box>
        </Box>
    );
}