import React from "react";
import { Box, Container, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import portrait from "/media/images/portrait.jpg";

export function AboutSection() {
    return (
        <Box as="section" id="about" py={{ base: 12, md: 24 }}>
            <Container maxW="1200px">
                <Grid
                    templateColumns={{ base: "1fr", md: "1.15fr 0.9fr" }}
                    gap={{ base: 10, md: 16 }}
                    alignItems="stretch" // ✅ ستون‌ها در دسکتاپ هم‌ارتفاع میشن
                >
                    {/* ========= LEFT : PORTRAIT ========= */}
                    <GridItem>
                        <Box
                            position="relative"
                            w="100%"
                            h={{ base: "auto", md: "100%" }}     // ⭐ هم‌ارتفاع متن
                            minH={{ base: "420px", md: "100%" }}
                            maxW={{ base: "520px", md: "640px" }}
                            mx={{ base: "auto", md: 0 }}
                            borderRadius="18px"
                            overflow="hidden"
                            bg="black"
                        >
                            <Image
                                src={portrait}
                                alt="Asghar Laei Portrait"
                                w="100%"
                                h="100%"
                                objectFit="cover"   // ⭐ قاب رو کامل پر می‌کنه
                                objectPosition="center top" // اگر خواستی صورت بالاتر دیده بشه
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                            />

                            <Box position="absolute" inset={0} bg="rgba(0,0,0,0.10)" />
                            <Box
                                position="absolute"
                                top={0}
                                right={0}
                                bottom={0}
                                w={{ base: "28%", md: "26%" }}
                                bgGradient="linear(to-l, rgba(0,0,0,0.55), rgba(0,0,0,0))"
                            />
                        </Box>
                    </GridItem>



                    {/* ========= RIGHT : TEXT ========= */}
                    <GridItem>
                        <Box maxW={{ base: "100%", md: "520px" }} ml={{ base: 0, md: "auto" }}>
                            <Heading
                                fontFamily="heading"
                                fontWeight="400"
                                textTransform="uppercase"
                                color="white"
                                fontSize={{ base: "1.25rem", sm: "1.45rem", md: "3rem" }}
                                letterSpacing={{ base: "0.10em", md: "0.12em" }}
                                lineHeight={{ base: "1.2", md: "1.15" }}
                                mb={{ base: 4, md: 5 }}
                            >
                                About Me
                            </Heading>

                            <Box
                                sx={{
                                    "& p": {
                                        color: "rgba(255,255,255,0.74)",
                                        fontSize: { base: "0.92rem", sm: "0.98rem", md: "1.02rem" },
                                        lineHeight: { base: "1.85", md: "1.9" },
                                        mb: { base: 3.5, md: 4 },
                                        textAlign: { base: "start", md: "justify" },
                                        textAlignLast: { base: "auto", md: "left" },
                                        overflowWrap: "anywhere",
                                        hyphens: "auto",
                                    },
                                }}
                            >
                                <Text as="p">
                                    I’m a Kurdish filmmaker from Iran, drawn to stories about people,
                                    memory, and the quiet struggles that shape our lives. Since 2008
                                    I’ve worked across directing, cinematography, and editing,
                                    learning the craft through hands on experience in different
                                    places and projects.
                                </Text>

                                <Text as="p">
                                    Over the years, collaborating with both local and international
                                    teams has shaped how I see filmmaking as a shared process.
                                    Alongside filmmaking, I’ve mentored students who are now finding
                                    their own paths in the industry.
                                </Text>

                                <Text as="p">
                                    My background in psychology deeply influences my work, helping
                                    me look closer at human behavior and emotional truth in
                                    performance and storytelling. That curiosity even led me to
                                    write a book exploring these ideas.
                                </Text>

                                <Text as="p" sx={{ mb: { base: 5, md: 6 } }}>
                                    Now based in Belfast and actively building new collaborations
                                    within the industry, I’m interested in working with directors,
                                    producers, and creative teams. If you think we might be a good
                                    fit, I’d be glad to hear from you.
                                </Text>
                            </Box>

                            <Text
                                fontFamily="heading"
                                fontStyle="italic"
                                textAlign="right"
                                color="rgba(255,255,255,0.88)"
                                fontSize={{ base: "lg", md: "xl" }}
                                letterSpacing="0.06em"
                            >
                                Asghar Laei
                            </Text>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
}
