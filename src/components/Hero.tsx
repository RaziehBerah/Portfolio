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
                <Image src="media/images/1.jpg" alt="Cinematic Background" w="100%" h="100%" objectFit="cover" />
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

                <Text opacity={0.75} letterSpacing={{ base: "0.12em", md: "0.2em" }} textTransform="uppercase" fontSize={{ base: "sm", md: "md" }} mb={8}>
                    Cinematographer | Filmmaker | Editor
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
