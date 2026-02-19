import React from "react";
import { Box, Container, Flex, Link, Stack, Icon } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function ContactFooter() {
    const [hovered, setHovered] = React.useState<number | null>(null);

    const items = [
        { href: "mailto:laeiasghar@gmail.com", icon: FiMail, label: "Email", external: false },
        { href: "https://www.linkedin.com/in/asghar-laei-29a740336", icon: FaLinkedinIn, label: "LinkedIn", external: true },
        { href: "https://www.instagram.com/asgharlaei", icon: FaInstagram, label: "Instagram", external: true },
    ] as const;

    const active = "white";
    const dim = "rgba(255,255,255,0.35)";

    return (
        <Box
            as="footer"
            id="contact"
            bg="black"
            borderTop="1px solid rgba(255,255,255,0.06)"
            py={{ base: 14, md: 16 }}
        >
            <Container maxW="1200px">
                <Flex justify="center">
                    <Stack direction="row" spacing={{ base: 10, md: 12 }}>
                        {items.map((it, i) => {
                            const color = hovered === null ? active : hovered === i ? active : dim;

                            return (
                                <Link
                                    key={it.label}
                                    href={it.href}
                                    isExternal={it.external}
                                    aria-label={it.label}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(i)}
                                    onBlur={() => setHovered(null)}
                                >
                                    <Icon
                                        as={it.icon}
                                        boxSize={{ base: 5, md: 6 }}
                                        color={color}
                                        transition="color 180ms ease"
                                    />
                                </Link>
                            );
                        })}
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
}
