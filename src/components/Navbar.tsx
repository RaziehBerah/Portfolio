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

type Props = {
  items: NavItem[];
  navSolid: boolean;
  accent: string;
};

export function Navbar({ items, navSolid, accent }: Props) {
  const mobileNav = useDisclosure();

  const onNavClick = () => {
    if (mobileNav.isOpen) mobileNav.onClose();
  };

  // ✅ حتماً در تب/پنجره جدید باز شود
  const openPhotography = () => {
    window.open("/photography", "_blank", "noopener,noreferrer");
    onNavClick();
  };

  // ✅ Contact رو آخر نگه می‌داریم، Photography رو قبلش میاریم
  const contactItem = items.find((it) => it.label.toLowerCase() === "contact");
  const nonContactItems = items.filter(
    (it) => it.label.toLowerCase() !== "contact"
  );

  const underlineHover = {
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "2px", // کمی ضخیم‌تر
      width: "0%",
      background: accent,
      transition: "width .18s ease",
    },
    "&:hover::after": { width: "100%" },
  };

  return (
    <>
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
        {/* ✅ کمی بزرگ‌تر: py بیشتر + فونت بزرگ‌تر */}
        <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }} py={{ base: 5, md: 6 }}>
          <Flex align="center" justify="space-between" w="100%">
            {/* Left corner */}
            <Text
              fontFamily="heading"
              fontWeight="700"
              letterSpacing="0.14em"
              fontSize={{ base: "xl", md: "2xl" }} // بزرگ‌تر
              color="white"
              whiteSpace="nowrap"
            >
              ASGHAR LAEI
            </Text>

            {/* Right side (Desktop nav) */}
            <HStack spacing={{ md: 7, lg: 8 }} display={{ base: "none", md: "flex" }}>
              {/* سایر آیتم‌ها (بدون Contact) */}
              {nonContactItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  fontSize={{ md: "md", lg: "md" }} // بزرگ‌تر از قبل
                  color="rgba(255,255,255,0.88)"
                  _hover={{ color: "white" }}
                  position="relative"
                  pb={1}
                  sx={underlineHover}
                >
                  {it.label}
                </Link>
              ))}

              {/* ✅ Photography قبل Contact */}
              <Link
                as="button"
                onClick={openPhotography}
                textTransform="uppercase"
                letterSpacing="0.14em"
                fontSize={{ md: "md", lg: "md" }}
                color="rgba(255,255,255,0.88)"
                position="relative"
                pb={1}
                _hover={{ color: "white" }}
                sx={underlineHover}
              >
                PHOTOGRAPHY
              </Link>

              {/* Contact آخر */}
              {contactItem && (
                <Link
                  key={contactItem.href}
                  href={contactItem.href}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  fontSize={{ md: "md", lg: "md" }}
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

            {/* Mobile right buttons */}
            <HStack spacing={2} display={{ base: "flex", md: "none" }}>
              <Link
                as="button"
                onClick={openPhotography}
                textTransform="uppercase"
                letterSpacing="0.14em"
                fontSize="md" // بزرگ‌تر
                color="rgba(255,255,255,0.88)"
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ bg: "rgba(255,255,255,0.08)", color: "white" }}
                _active={{ bg: "rgba(255,255,255,0.10)" }}
              >
                Photography
              </Link>

              <IconButton
                aria-label="Open menu"
                icon={<FiMenu />}
                variant="ghost"
                color="white"
                onClick={mobileNav.onOpen}
                _hover={{ bg: "rgba(255,255,255,0.08)" }}
                _active={{ bg: "rgba(255,255,255,0.10)" }}
                size="md"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={mobileNav.isOpen}
        placement="right"
        onClose={mobileNav.onClose}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.7)" />
        <DrawerContent bg="#000">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={16}>
            <Stack spacing={6}>
              {/* توی موبایل هم Photography قبل Contact */}
              {nonContactItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  fontSize="lg" // بزرگ‌تر
                  color="white"
                  _hover={{ color: accent }}
                >
                  {it.label}
                </Link>
              ))}

              <Link
                as="button"
                onClick={openPhotography}
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
                  href={contactItem.href}
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