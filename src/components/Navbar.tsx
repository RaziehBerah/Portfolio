// src/components/Navbar.tsx
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import type { NavItem } from "../types/portfolio";

import { Link as RouterLink, useNavigate } from "react-router-dom";

type Props = {
  items: NavItem[];
  navSolid: boolean;
  accent: string;
};

export function Navbar({ items, navSolid, accent }: Props) {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();

  const onNavClick = () => {
    if (mobileNav.isOpen) mobileNav.onClose();
  };

  // Photography (به جای window.open)
  const goPhotography = () => {
    navigate("/photography");
    onNavClick();
  };

  // Contact جدا
  const contactItem = items.find((it) => it.label.toLowerCase() === "contact");
  const nonContactItems = items.filter((it) => it.label.toLowerCase() !== "contact");

  const underlineHover = {
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "2px",
      width: "0%",
      background: accent,
      transition: "width .18s ease",
    },
    "&:hover::after": { width: "100%" },
  };

  const isHashLink = (href: string) => href.startsWith("#");

  return (
    <>
      {/* NAVBAR */}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={navSolid ? "rgba(5,5,5,0.92)" : "rgba(5,5,5,0.55)"}
        backdropFilter="blur(12px)"
        borderBottom="1px solid rgba(255,255,255,0.08)"
        transition="background .2s ease"
      >
        <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }} py={{ base: 4, md: 6 }}>
          <Flex align="center" justify="space-between" w="100%">
            {/* LOGO (اگر خواستی clickable بشه، می‌تونی as={RouterLink} to="/" کنی) */}
            <Text
              fontFamily="heading"
              fontWeight="700"
              letterSpacing="0.14em"
              fontSize={{ base: "lg", md: "2xl" }}
              color="white"
              whiteSpace="nowrap"
            >
              ASGHAR LAEI
            </Text>

            {/* DESKTOP NAV */}
            <HStack spacing={{ md: 7, lg: 8 }} display={{ base: "none", md: "flex" }}>
              {nonContactItems.map((it) => (
                <Link
                  key={it.href}
                  {...(isHashLink(it.href)
                    ? { href: it.href }
                    : { as: RouterLink, to: it.href })}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  fontSize="md"
                  color="rgba(255,255,255,0.88)"
                  _hover={{ color: "white" }}
                  position="relative"
                  pb={1}
                  sx={underlineHover}
                >
                  {it.label}
                </Link>
              ))}

              {/* Photography */}
              <Link
                as="button"
                onClick={goPhotography}
                textTransform="uppercase"
                letterSpacing="0.14em"
                fontSize="md"
                color="rgba(255,255,255,0.88)"
                position="relative"
                pb={1}
                _hover={{ color: "white" }}
                sx={underlineHover}
              >
                PHOTOGRAPHY
              </Link>

              {/* Contact */}
              {contactItem && (
                <Link
                  key={contactItem.href}
                  {...(isHashLink(contactItem.href)
                    ? { href: contactItem.href }
                    : { as: RouterLink, to: contactItem.href })}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  fontSize="md"
                  color="rgba(255,255,255,0.88)"
                  _hover={{ color: "white" }}
                  position="relative"
                  pb={1}
                  sx={underlineHover}
                >
                  {contactItem.label}
                </Link>
              )}
            </HStack>

            {/* MOBILE: فقط همبرگر */}
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              variant="ghost"
              color="white"
              onClick={mobileNav.onOpen}
              display={{ base: "flex", md: "none" }}
              _hover={{ bg: "rgba(255,255,255,0.08)" }}
              _active={{ bg: "rgba(255,255,255,0.10)" }}
              size="md"
            />
          </Flex>
        </Container>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={mobileNav.isOpen} placement="right" onClose={mobileNav.onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.7)" />
        <DrawerContent bg="#000">
          <DrawerCloseButton color="white" />

          <DrawerBody pt={16}>
            <Stack spacing={6}>
              {nonContactItems.map((it) => (
                <Link
                  key={it.href}
                  {...(isHashLink(it.href)
                    ? { href: it.href }
                    : { as: RouterLink, to: it.href })}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  fontSize="lg"
                  color="white"
                  _hover={{ color: accent }}
                >
                  {it.label}
                </Link>
              ))}

              {/* Photography داخل دراور */}
              <Link
                as="button"
                onClick={goPhotography}
                textTransform="uppercase"
                letterSpacing="0.12em"
                fontSize="lg"
                color="white"
                textAlign="left"
                _hover={{ color: accent }}
              >
                Photography ↗
              </Link>

              {contactItem && (
                <Link
                  key={contactItem.href}
                  {...(isHashLink(contactItem.href)
                    ? { href: contactItem.href }
                    : { as: RouterLink, to: contactItem.href })}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  fontSize="lg"
                  color="white"
                  _hover={{ color: accent }}
                >
                  {contactItem.label}
                </Link>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}