import { Box, Container, Flex, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import type { Film } from "../types/portfolio";
import { useFilmCarousel } from "../hooks/useFilmCarousel";

type Props = {
    films: Film[];
    accent: string;
    onPlayTeaser: (title: string, src: string) => void;
};

export function FilmsSection({ films, accent, onPlayTeaser }: Props) {
    const { scrollerRef, next, prev, onScroll } = useFilmCarousel(films.length);

    return (
        <Box as="section" id="short-films" py={{ base: 16, md: 24 }}>
            <Container maxW="1200px">
                <Heading
                    fontFamily="heading"
                    fontWeight="400"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    textAlign="center"
                    color="white"
                    mb={6}
                    fontSize={{ base: "2xl", md: "4xl" }}
                >
                    My Short Films
                </Heading>

                <Box position="relative">
                    {/* ✅ FIX: روی موبایل دکمه‌ها روی پوستر باشند نه روی متن */}
                    <IconButton
                        aria-label="Previous film"
                        icon={<FiChevronLeft />}
                        onClick={prev}
                        position="absolute"
                        left={{ base: 2, md: 3 }}
                        top={{ base: "230px", md: "50%" }} // ✅ موبایل: وسط پوستر (نه وسط کل کارت)
                        transform="translateY(-50%)"
                        zIndex={10}
                        borderRadius="999px"
                        bg="rgba(0,0,0,0.55)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.14)"
                        backdropFilter="blur(10px)"
                        _hover={{ bg: accent, color: "black", borderColor: accent }}
                    />

                    <IconButton
                        aria-label="Next film"
                        icon={<FiChevronRight />}
                        onClick={next}
                        position="absolute"
                        right={{ base: 2, md: 3 }}
                        top={{ base: "230px", md: "50%" }} // ✅ موبایل: وسط پوستر
                        transform="translateY(-50%)"
                        zIndex={10}
                        borderRadius="999px"
                        bg="rgba(0,0,0,0.55)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.14)"
                        backdropFilter="blur(10px)"
                        _hover={{ bg: accent, color: "black", borderColor: accent }}
                    />

                    <Box
                        ref={scrollerRef}
                        onScroll={onScroll}
                        overflowX="auto"
                        w="100%"
                        sx={{
                            scrollSnapType: "x mandatory",
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        <Flex w="100%" gap={0} align="stretch">
                            {films.map((f) => (
                                <Box
                                    key={f.id}
                                    flex="0 0 100%"
                                    minW="100%"
                                    flexShrink={0}
                                    sx={{ scrollSnapAlign: "start" }}
                                >
                                    <Box px={{ base: 2, md: 6 }} py={{ base: 2, md: 3 }}>
                                        <Box
                                            borderRadius="16px"
                                            overflow="hidden"
                                            border="1px solid rgba(255,255,255,0.09)"
                                            bg="rgba(10,10,10,0.65)"
                                            boxShadow="0 14px 55px rgba(0,0,0,0.55)"
                                        >
                                            <Flex direction={{ base: "column", md: "row" }} align="stretch">
                                                <Box
                                                    w={{ base: "100%", md: "38%" }}
                                                    bg="black"
                                                    borderRight={{ base: "none", md: "1px solid rgba(255,255,255,0.08)" }}
                                                >
                                                    <Box
                                                        w="100%"
                                                        h={{ base: "420px", md: "520px" }}
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        bg="black"
                                                    >
                                                        <Image
                                                            src={f.poster}
                                                            alt={`${f.title} Poster`}
                                                            w="100%"
                                                            h="100%"
                                                            objectFit="contain"
                                                            objectPosition="center"
                                                        />
                                                    </Box>
                                                </Box>

                                                <Box
                                                    w={{ base: "100%", md: "62%" }}
                                                    p={{ base: 5, md: 7 }}
                                                    minH={{ base: "auto", md: "520px" }}
                                                    display="flex"
                                                    flexDir="column"
                                                >
                                                    <Flex justify="space-between" align="flex-start" gap={4}>
                                                        <Heading
                                                            fontFamily="heading"
                                                            fontWeight="400"
                                                            letterSpacing="0.08em"
                                                            textTransform="uppercase"
                                                            fontSize={{ base: "xl", md: "2xl" }}
                                                            color="white"
                                                        >
                                                            {f.title}
                                                        </Heading>

                                                        <Box
                                                            fontSize="sm"
                                                            color="rgba(255,255,255,0.78)"
                                                            border="1px solid rgba(255,255,255,0.16)"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="999px"
                                                            bg="rgba(0,0,0,0.40)"
                                                            lineHeight={1}
                                                            mt={1}
                                                            whiteSpace="nowrap"
                                                        >
                                                            {f.year}
                                                        </Box>
                                                    </Flex>

                                                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                                                        {f.tags.map((t) => (
                                                            <Box
                                                                key={t}
                                                                px={3}
                                                                py={1}
                                                                borderRadius="999px"
                                                                border="1px solid rgba(207,181,59,0.25)"
                                                                bg="rgba(207,181,59,0.10)"
                                                                fontSize="sm"
                                                                color="rgba(255,255,255,0.92)"
                                                            >
                                                                {t}
                                                            </Box>
                                                        ))}
                                                    </HStack>

                                                    <Text
                                                        mt={5}
                                                        color="rgba(255,255,255,0.88)"
                                                        fontSize={{ base: "sm", md: "md" }}
                                                        lineHeight={{ base: "1.95", md: "1.85" }}
                                                        whiteSpace="pre-line"
                                                        textAlign={{ base: "left", md: "justify" }}
                                                        sx={{ textAlignLast: "left", hyphens: "auto" }}
                                                    >
                                                        {f.synopsis}
                                                    </Text>

                                                    <Flex mt="auto" pt={6} align="center">
                                                        <IconButton
                                                            aria-label={`Play teaser: ${f.title}`}
                                                            icon={<FiPlay />}
                                                            onClick={() => onPlayTeaser(f.title, f.teaser)}
                                                            borderRadius="999px"
                                                            size="md"
                                                            bg="rgba(0,0,0,0.55)"
                                                            color="white"
                                                            border="1px solid rgba(255,255,255,0.18)"
                                                            backdropFilter="blur(10px)"
                                                            _hover={{
                                                                bg: accent,
                                                                color: "black",
                                                                borderColor: accent,
                                                                transform: "translateY(-1px)",
                                                            }}
                                                            transition="all .18s ease"
                                                        />
                                                        <Text ml={3} fontSize="sm" opacity={0.7}>
                                                            Play Teaser
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
