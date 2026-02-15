import { Box, Button, Container } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlay } from "react-icons/fi";

type Props = { accent: string; sectionRef?: React.RefObject<HTMLDivElement | null> };

export function ShowreelSection({ accent, sectionRef }: Props) {
    const [started, setStarted] = useState(false);

    // لینک Drive رو به preview تبدیل کن
    const showreelSrc = "https://drive.google.com/file/d/1iTZjeoXxp2yaoTNikKqoAwO7pc03ungD/preview";

    return (
        <Box as="section" id="showreel" py={{ base: 16, md: 24 }} ref={sectionRef as any}>
            <Container maxW="1200px">
                <Box
                    borderRadius="16px"
                    overflow="hidden"
                    border="1px solid rgba(255,255,255,0.08)"
                    boxShadow="0 18px 60px rgba(0,0,0,0.55)"
                    bg="black"
                    position="relative"
                >
                    {/* قاب ویدیو با نسبت 16:9 */}
                    <Box position="relative" w="100%" pt="56.25%" bg="black">
                        {started ? (
                            <Box
                                as="iframe"
                                src={showreelSrc}
                                position="absolute"
                                inset={0}
                                w="100%"
                                h="100%"
                                border="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        ) : (
                            <Box
                                position="absolute"
                                inset={0}
                                bgImage="url('media/images/Showrell.cover.jpg')"
                                bgSize="cover"
                                bgPosition="center"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            />
                        )}
                    </Box>

                    {!started && (
                        <Box
                            position="absolute"
                            inset={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="rgba(0,0,0,0.25)"
                            backdropFilter="blur(1px)"
                            cursor="pointer"
                            onClick={() => setStarted(true)}
                        >
                            <Button
                                leftIcon={<FiPlay />}
                                bg="rgba(0,0,0,0.55)"
                                color="white"
                                border="1px solid rgba(255,255,255,0.18)"
                                _hover={{ bg: accent, color: "black", borderColor: accent }}
                                borderRadius="999px"
                                px={7}
                            >
                                Play Showreel
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
