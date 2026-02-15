import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import type { Credit } from "../types/portfolio";

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
            <Container maxW="1200px">
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

                <Stack spacing={6}>
                    {creditsByYear.map(([year, items]) => (
                        <Box key={year} border="1px solid rgba(255,255,255,0.08)" bg="rgba(10,10,10,0.55)" borderRadius="16px" p={{ base: 5, md: 7 }}>
                            <Flex align="baseline" justify="space-between" mb={4} gap={4}>
                                <Heading fontFamily="heading" fontWeight="400" letterSpacing="0.10em" textTransform="uppercase" fontSize={{ base: "lg", md: "xl" }} color="white">
                                    {year}
                                </Heading>

                                <Box fontSize="sm" color="rgba(255,255,255,0.78)" border="1px solid rgba(255,255,255,0.14)" px={3} py={1} borderRadius="999px" bg="rgba(0,0,0,0.35)">
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

                                        <Text color="rgba(255,255,255,0.9)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.8">
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
            </Container>
        </Box>
    );
}
