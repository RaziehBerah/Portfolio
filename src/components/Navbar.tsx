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
        <Container maxW="1200px" py={4}>
          <Flex align="center" justify="space-between">
            <Text fontFamily="heading" fontWeight="700" letterSpacing="0.12em" fontSize="lg" color="white">
              ASGHAR LAEI
            </Text>

            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  fontSize="sm"
                  color="rgba(255,255,255,0.86)"
                  _hover={{ color: "white" }}
                  position="relative"
                  pb={1}
                  sx={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: "1px",
                      width: "0%",
                      background: accent,
                      transition: "width .18s ease",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                >
                  {it.label}
                </Link>
              ))}
            </HStack>

            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              variant="ghost"
              color="white"
              display={{ base: "inline-flex", md: "none" }}
              onClick={mobileNav.onOpen}
              _hover={{ bg: "rgba(255,255,255,0.08)" }}
            />
          </Flex>
        </Container>
      </Box>

      <Drawer isOpen={mobileNav.isOpen} placement="right" onClose={mobileNav.onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.7)" />
        <DrawerContent bg="#000">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={16}>
            <Stack spacing={6}>
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onNavClick}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  fontSize="md"
                  color="white"
                  _hover={{ color: accent }}
                >
                  {it.label}
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
