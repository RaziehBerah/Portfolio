import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import type { Credit } from "../types/portfolio";
import { MediaSlideshow } from "../components/MediaSlideshow";

type Props = { credits: Credit[]; accent: string };

export function AwardsSection({ credits, accent }: Props) {
    const creditsByYear = useMemo(() => {
        const grouped = new Map<string, Credit[]>();
        credits
            .slice()
            .sort((a, b) => Number(b.year) - Number(a.year))
            .forEach((c) => {
                if (!grouped.has(c.year)) grouped.set(c.year, []);
                grouped.get(c.year)!.push(c);
            });
        return Array.from(grouped.entries());
    }, [credits]);

    return (
        <Box as="section" id="awards" py={{ base: 16, md: 24 }}>

            {/* ✅ کانتینر عریض‌تر برای حذف فضای خالی چپ و راست */}
            <Container
                maxW={{ base: "1200px", lg: "1400px", xl: "1600px" }}
                px={{ base: 4, md: 6 }}
            >
                <Heading
                    fontFamily="heading"
                    fontWeight="400"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    textAlign="center"
                    color="white"
                    mb={10}
                    fontSize={{ base: "2xl", md: "4xl" }}
                >
                    Awards & Selections
                </Heading>

                {/* ✅ دو ستونه */}
                <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: 10, md: 10 }}
                    align="stretch"
                >
                    {/* ===== LEFT: SLIDESHOW ===== */}
                    <Box flex={{ base: "1", md: "1" }} w="100%">
                        <MediaSlideshow
                            count={11}
                            startIndex={2}
                            intervalMs={4500}
                            h={{ base: "420px", md: "600px" }}   // ارتفاع مرجع
                            maxW="100%"                          // مهم: تا ته ستون
                        />
                    </Box>

                    {/* ===== RIGHT: AWARDS LIST (SCROLL ON DESKTOP) ===== */}
                    <Box flex={{ base: "1", md: "1" }} w="100%">
                        <Box
                            h={{ base: "auto", md: "600px" }}     // برابر با اسلایدشو در دسکتاپ
                            overflowY={{ base: "visible", md: "auto" }}
                            pr={{ base: 0, md: 2 }}
                            sx={{
                                "&::-webkit-scrollbar": { width: "10px" },
                                "&::-webkit-scrollbar-thumb": {
                                    background: "rgba(255,255,255,0.18)",
                                    borderRadius: "999px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: "999px",
                                },
                                scrollbarWidth: "thin",
                                scrollbarColor: "rgba(255,255,255,0.18) rgba(255,255,255,0.06)",
                            }}
                        >
                            <Stack spacing={6}>
                                {creditsByYear.map(([year, items]) => (
                                    <Box
                                        key={year}
                                        border="1px solid rgba(255,255,255,0.08)"
                                        bg="rgba(10,10,10,0.55)"
                                        borderRadius="16px"
                                        p={{ base: 5, md: 7 }}
                                    >
                                        <Flex align="baseline" justify="space-between" mb={4} gap={4}>
                                            <Heading
                                                fontFamily="heading"
                                                fontWeight="400"
                                                letterSpacing="0.10em"
                                                textTransform="uppercase"
                                                fontSize={{ base: "lg", md: "xl" }}
                                                color="white"
                                            >
                                                {year}
                                            </Heading>

                                            <Box
                                                fontSize="sm"
                                                color="rgba(255,255,255,0.78)"
                                                border="1px solid rgba(255,255,255,0.14)"
                                                px={3}
                                                py={1}
                                                borderRadius="999px"
                                                bg="rgba(0,0,0,0.35)"
                                            >
                                                {items.length}
                                            </Box>
                                        </Flex>

                                        <Stack spacing={3}>
                                            {items.map((c, idx) => (
                                                <Flex
                                                    key={`${c.title}-${c.festival}-${idx}`}
                                                    direction={{ base: "column", md: "row" }}
                                                    gap={{ base: 1, md: 4 }}
                                                    align={{ base: "flex-start", md: "baseline" }}
                                                    borderTop={idx === 0 ? "none" : "1px solid rgba(255,255,255,0.06)"}
                                                    pt={idx === 0 ? 0 : 3}
                                                >
                                                    <Box minW={{ base: "auto", md: "170px" }} fontSize="sm">
                                                        <Box
                                                            as="span"
                                                            color="black"
                                                            bg={accent}
                                                            px={2}
                                                            py={0.5}
                                                            borderRadius="999px"
                                                            fontSize="xs"
                                                            textTransform="uppercase"
                                                            letterSpacing="0.08em"
                                                        >
                                                            {c.type}
                                                        </Box>
                                                    </Box>

                                                    <Text
                                                        color="rgba(255,255,255,0.9)"
                                                        fontSize={{ base: "sm", md: "md" }}
                                                        lineHeight="1.8"
                                                    >
                                                        <Box as="span" color="white">
                                                            {c.title}
                                                        </Box>
                                                        {", "}
                                                        {c.festival} ({c.country})
                                                        {", "}
                                                        <Box as="span" fontStyle="italic">
                                                            {c.film}
                                                        </Box>
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
