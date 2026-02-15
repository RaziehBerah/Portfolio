import { Box, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useAboutSlideshowLite } from "../hooks/useAboutSlideshowLite";

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    // اسلایدشو فقط وقتی سکشن دیده میشه اجرا میشه
    const inView = useInView(sectionRef, { threshold: 0.25 });

    const { current, prev } = useAboutSlideshowLite({
        count: 11,
        startIndex: 2,
        intervalMs: 4500, // ✅ کمتر از قبل
        enabled: inView,
    });

    return (
        <Box ref={sectionRef} as="section" id="about" py={{ base: 16, md: 24 }}>
            <Container maxW="1200px">
                <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: 10, md: 14 }}
                    align="center"
                >
                    {/* ====== IMAGE SLIDESHOW ====== */}
                    <Box flex={{ base: "1", md: "1.25" }} w="100%">
                        <Box
                            position="relative"
                            w="100%"
                            maxW={{ base: "860px", md: "1020px" }}
                            mx={{ base: "auto", md: "0" }}
                            h={{ base: "460px", md: "600px" }}
                            overflow="hidden"
                            borderRadius="18px"
                            bg="black"
                        >
                            {/* عکس قبلی (پشت) */}
                            <Image
                                src={prev}
                                alt="Asghar Laei Portrait previous"
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

                            {/* عکس فعلی (رو) با fade نرم */}
                            <Image
                                src={current}
                                alt="Asghar Laei Portrait current"
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

                            {/* grayscale سبک‌تر از filter */}
                            <Box
                                position="absolute"
                                inset={0}
                                bg="rgba(0,0,0,0.22)"
                                mixBlendMode="saturation"
                                pointerEvents="none"
                                _hover={{ mixBlendMode: "normal", bg: "transparent" }}
                                transition="all .35s ease"
                            />

                            {/* گرادیانت سمت راست */}
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

                    {/* ====== TEXT ====== */}
                    <Box flex={{ base: "1", md: "0.9" }} w="100%">
                        <Heading
                            fontFamily="heading"
                            fontWeight="400"
                            textTransform="uppercase"
                            mb={4}
                            color="white"
                        >
                            About Me
                        </Heading>

                        {/* ✅ یکجا استایل همه پاراگراف‌ها */}
                        <Box
                            sx={{
                                "& p": {
                                    color: "rgba(255,255,255,0.65)",
                                    lineHeight: { base: "1.95", md: "1.85" },
                                    fontSize: { base: "0.75rem", md: "0.95rem" },
                                    mb: 4,

                                    // موبایل: خواناتر بدون فاصله‌های عجیب
                                    textAlign: { base: "start", md: "justify" },

                                    // برای دسکتاپ که justify میشه، انتهای پاراگراف طبیعی بمونه
                                    textAlignLast: { base: "auto", md: "left" },

                                    // بهتر شدن شکستن کلمات و جلوگیری از فاصله‌های بد
                                    hyphens: "auto",
                                    overflowWrap: "anywhere",
                                    wordBreak: "normal",
                                },
                            }}
                        >
                            <Text as="p">
                                I’m a Kurdish filmmaker from Iran, drawn to stories about people,
                                memory, and the quiet struggles that shape our lives. Since 2008 I’ve worked across
                                directing, cinematography, and editing, learning the craft through
                                hands on experience in different places and projects.
                            </Text>

                            <Text as="p">
                                Over the years, collaborating with both local and international
                                teams has shaped how I see filmmaking as a shared process. Alongside filmmaking, I’ve
                                mentored students who are now finding their own paths in the
                                industry.
                            </Text>

                            <Text as="p">
                                My background in psychology deeply influences my work, helping me
                                look closer at human behavior and emotional truth in performance
                                and storytelling. That curiosity even led me to write a book
                                exploring these ideas.
                            </Text>

                            <Text as="p" sx={{ mb: 6 }}>
                                Now based in Belfast and actively building new collaborations within
                                the industry, I’m interested in working with directors, producers,
                                and creative teams. If you think we might be a good fit, I’d be glad
                                to hear from you.
                            </Text>
                        </Box>

                        <Text
                            fontFamily="heading"
                            fontSize="xl"
                            textAlign="right"
                            fontStyle="italic"
                        >
                            Asghar Laei
                        </Text>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
