import { Box, Button, Container, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function ContactFooter() {
    return (
        <Box as="footer" id="contact" bg="black" py={{ base: 14, md: 16 }} borderTop="1px solid rgba(255,255,255,0.06)" textAlign="center">
            <Container maxW="1200px">
                <Heading fontFamily="heading" fontWeight="400" letterSpacing="0.10em" textTransform="uppercase" color="white" fontSize={{ base: "xl", md: "2xl" }} mb={6}>
                    Contact Me
                </Heading>

                <Flex justify="center">
                    <Stack direction={{ base: "column", sm: "row" }} spacing={3} w="100%" justify="center">
                        <Button
                            as={Link}
                            href="mailto:laeiasghar@gmail.com"
                            leftIcon={<FiMail />}
                            bg="rgba(255,255,255,0.06)"
                            color="white"
                            border="1px solid rgba(255,255,255,0.14)"
                            _hover={{ bg: "rgba(255,255,255,0.10)" }}
                            borderRadius="999px"
                            px={6}
                        >
                            Email
                        </Button>

                        <Button
                            as={Link}
                            href="https://www.linkedin.com/in/asghar-laei-29a740336?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            isExternal
                            leftIcon={<FaLinkedinIn />}
                            bg="rgba(255,255,255,0.06)"
                            color="white"
                            border="1px solid rgba(255,255,255,0.14)"
                            _hover={{ bg: "rgba(255,255,255,0.10)" }}
                            borderRadius="999px"
                            px={6}
                        >
                            LinkedIn
                        </Button>

                        <Button
                            as={Link}
                            href="https://www.instagram.com/asgharlaei?igsh=OTF6OXRyOTVzeWVi"
                            isExternal
                            leftIcon={<FaInstagram />}
                            bg="rgba(255,255,255,0.06)"
                            color="white"
                            border="1px solid rgba(255,255,255,0.14)"
                            _hover={{ bg: "rgba(255,255,255,0.10)" }}
                            borderRadius="999px"
                            px={6}
                        >
                            Instagram
                        </Button>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
}
