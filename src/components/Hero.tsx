import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

type Props = {
    onShowreelClick: () => void;
};

export function Hero({ onShowreelClick }: Props) {
    return (
        <Box
            as="header"
            id="hero"
            minH="100vh"
            position="relative"
            overflow="hidden"
            pt="80px"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            textAlign="center"
        >
            <Box position="absolute" inset={0} zIndex={0}>
                <Image src="https://res.cloudinary.com/don6u8smb/image/upload/v1773786035/Hero_r7cq1s.jpg" alt="Cinematic Background" w="100%" h="100%" objectFit="cover" />
                <Box position="absolute" inset={0} bgGradient="linear(to-b, rgba(0,0,0,0.25), rgba(5,5,5,1))" />
            </Box>

            <Box zIndex={1} pb={{ base: 20, md: 10 }} px={4}>
                <Heading
                    fontFamily="heading"
                    fontWeight="400"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                    color="white"
                    mb={4}
                >
                    Asghar Laei
                </Heading>

                <Text opacity={0.85} letterSpacing={{ base: "0.12em", md: "0.2em" }} textTransform="uppercase" fontSize={{ base: "sm", md: "md" }} mb={4}>
                    Cinematographer | Filmmaker | Editor
                </Text>
                <Text
                    maxW="720px"
                    mx="auto"
                    opacity={0.75}
                    fontSize={{ base: "md", md: "xl" }}
                    lineHeight="1.7"
                    mb={4}
                    mt={0}
                >
                    Visual storytelling through cinematography and video production across film and digital media
                </Text>
                <Button
                    onClick={onShowreelClick}
                    variant="outline"
                    borderColor="rgba(255,255,255,0.18)"
                    bg="rgba(0,0,0,0.45)"
                    color="white"
                    px={{ base: 8, md: 10 }}
                    py={7}
                    letterSpacing="0.18em"
                    textTransform="uppercase"
                    fontSize="sm"
                    _hover={{ bg: "white", color: "black", borderColor: "white", transform: "translateY(-2px)" }}
                    transition="all .22s ease"
                >
                    View Showreel
                </Button>
            </Box>
        </Box>
    );
}
