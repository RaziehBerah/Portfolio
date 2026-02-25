import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
    SimpleGrid,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image as ChakraImage,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { ContactFooter } from "../components/ContactFooter";
import { HiOutlineHome } from "react-icons/hi2";
import { AspectRatio } from "@chakra-ui/react";



type CategoryKey = "portrait" | "nature" | "details";

type Category = {
    key: CategoryKey;
    title: string;
    poster: string;
    images: string[];
};

function wrap(i: number, len: number) {
    if (len <= 0) return 0;
    return (i + len) % len;
}

/* ---------- IMAGES ---------- */

const HERO =
    "https://res.cloudinary.com/don6u8smb/image/upload/v1771877054/4_c7rthz.jpg";

const ABOUT_IMG =
    "https://res.cloudinary.com/don6u8smb/image/upload/v1772050179/DSC_9489_yi1qm2.jpg";


const CATEGORIES: Category[] = [
    {
        key: "portrait",
        title: "portrait",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/6_u3l1d6.jpg",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/6_u3l1d6.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/7_ka56cy.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/5_yu4zfk.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877056/2_dpqvbg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/3_eykrfe.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771977875/P_7_zog4gv.jpg"
        ],
    },
    {
        key: "nature",
        title: "nature",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/02_qgsysu.jpg",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/02_qgsysu.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877059/12_nfsglo.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877062/07_wxls4e.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877060/11_kxzy9c.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877058/10_amuqcg.jpg",
        ],
    },
    {
        key: "details",
        title: "details",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/1_cztlxs.jpg",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/1_cztlxs.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877058/9_sfvw8q.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/8_flreor.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877060/13_xotlu7.jpg",
        ],
    },
];

export default function PhotographyPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [cat, setCat] = useState<CategoryKey>("portrait");
    const [index, setIndex] = useState(0);
    const [scale, setScale] = useState(1);

    const category = useMemo(
        () => CATEGORIES.find((c) => c.key === cat) ?? CATEGORIES[0],
        [cat]
    );

    const current = category.images[index];

    const openCat = (k: CategoryKey) => {
        setCat(k);
        setIndex(0);
        setScale(1);
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);
    const next = () => {
        setIndex((i) => wrap(i + 1, category.images.length));
        setScale(1);
    };
    const prev = () => {
        setIndex((i) => wrap(i - 1, category.images.length));
        setScale(1);
    };

    useEffect(() => {
        if (!isOpen) return;
        const k = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", k);
        return () => window.removeEventListener("keydown", k);
    }, [isOpen, category.images.length]);

    const wheelZoom = (e: React.WheelEvent) => {
        e.preventDefault();
        setScale((s) =>
            Math.min(4, Math.max(1, Number((e.deltaY > 0 ? s * 0.92 : s * 1.08).toFixed(3))))
        );
    };

    return (
        <Box bg="#050505" color="white">

            {/* HERO */}
            {/* HERO */}
            <Box position="relative" overflow="hidden">

                {/* responsive frame with correct photo ratio */}
                <AspectRatio ratio={3 / 2} maxH="85vh">
                    <Box position="relative" w="100%" h="100%">

                        {/* blurred cinematic background */}
                        <Image
                            src={HERO}
                            position="absolute"
                            inset={0}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            filter="blur(22px)"
                            transform="scale(1.12)"
                            opacity={0.45}
                        />

                        {/* main photo — FULLY visible */}
                        <Image
                            src={HERO}
                            position="relative"
                            w="100%"
                            h="100%"
                            objectFit="contain"
                        />

                    </Box>
                </AspectRatio>

                {/* dark overlay */}
                <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" pointerEvents="none" />

                {/* LEFT — Photography */}
                <Text
                    position="absolute"
                    top={{ base: "16px", md: "22px" }}
                    left={{ base: "16px", md: "24px" }}
                    zIndex={5}
                    color="white"
                    fontFamily="heading"
                    fontWeight="300"
                    fontSize={{ base: "26px", sm: "30px", md: "44px" }}
                    letterSpacing={{ base: "0.08em", md: "0.10em" }}
                    lineHeight="1"
                    textShadow="0 12px 40px rgba(0,0,0,.6)"
                    userSelect="none"
                >
                    Photography
                </Text>

                {/* RIGHT — Home icon */}
                <Box
                    as="a"
                    href="/"
                    position="absolute"
                    top={{ base: "16px", md: "22px" }}
                    right={{ base: "16px", md: "24px" }}
                    zIndex={5}
                    display="grid"
                    placeItems="center"
                    w={{ base: "38px", md: "44px" }}
                    h={{ base: "38px", md: "44px" }}
                    borderRadius="999px"
                    bg="rgba(255,255,255,.08)"
                    border="1px solid rgba(255,255,255,.18)"
                    backdropFilter="blur(6px)"
                    cursor="pointer"
                    transition="all .2s ease"
                    _hover={{
                        bg: "rgba(255,255,255,.18)",
                        transform: "scale(1.06)",
                    }}
                >
                    <HiOutlineHome size={35} color="white" />
                </Box>

            </Box>

            {/* ABOUT */}
            <Box py={{ base: 12, md: 14 }}>
                <Container maxW="1200px">
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="stretch">

                        {/* IMAGE */}
                        <GridItem display="flex">
                            <Box
                                flex="1"
                                borderRadius="16px"
                                overflow="hidden"
                                bg="black"
                                border="1px solid rgba(255,255,255,0.08)"
                            >
                                <Image
                                    src={ABOUT_IMG}
                                    w="100%"
                                    h="100%"
                                    objectFit="contain"
                                />
                            </Box>
                        </GridItem>

                        {/* TEXT */}
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
                                        As a cinematographer who has spent years experiencing the magic of capturing images, I remain fascinated by the power of light. how, in its presence or absence, it reveals and shapes the details of a subject with an almost magical touch.
                                    </Text>

                                    <Text as="p">
                                        Since my early days in film school, when I first connected with photography, the value of preserving a moment became clear to me. A photograph, for me, is a single instant offered to the viewer, one that quietly invites them to imagine the moments before and after it.
                                    </Text>

                                    <Text as="p">
                                        Over the years, alongside cinematography, photography has remained an essential part of my path. I see them as one continuous journey, each enriching the other and constantly shaping the way I look at the world around me.
                                    </Text>

                                    <Text as="p" sx={{ mb: { base: 5, md: 6 } }}>
                                        For me, photography is a journey into the world of light, into still frames that hold a subtle, living tension within them: a dialogue between light and shadow.
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

            {/* CATEGORIES */}
            <Box pb={16}>
                <Container maxW="1200px">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        {CATEGORIES.map((c) => (
                            <Box
                                key={c.key}
                                position="relative"
                                overflow="hidden"
                                borderRadius="18px"
                                cursor="pointer"
                                role="group"
                                onClick={() => openCat(c.key)}
                            >
                                <ChakraImage
                                    src={c.poster}
                                    h="620px"
                                    w="100%"
                                    objectFit="cover"
                                    transition="transform .35s ease"
                                    _groupHover={{ transform: "scale(1.05)" }}
                                />

                                <Box
                                    position="absolute"
                                    inset={0}
                                    display="grid"
                                    placeItems="center"
                                    bg="rgba(0,0,0,.25)"
                                >
                                    <Box
                                        px={10}
                                        py={3}
                                        border="1px solid rgba(255,255,255,.6)"
                                        letterSpacing="0.25em"
                                        textTransform="uppercase"
                                        bg="rgba(0,0,0,.25)"
                                    >
                                        See more →
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <ContactFooter />

            {/* LIGHTBOX */}
            <Modal isOpen={isOpen} onClose={close} size="full">
                <ModalOverlay bg="rgba(0,0,0,.9)" />
                <ModalContent bg="transparent">
                    <ModalBody p={0}>
                        <Box
                            position="fixed"
                            inset={0}
                            display="grid"
                            placeItems="center"
                            onWheel={wheelZoom}
                        >
                            <ChakraImage
                                src={current}
                                maxW="1200px"
                                maxH="100vh"
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                transform={`scale(${scale})`}
                            />

                            <IconButton aria-label="close" icon={<FiX />} onClick={close}
                                position="fixed" top={6} right={6} />

                            <IconButton aria-label="prev" icon={<FiChevronLeft />} onClick={prev}
                                position="fixed" left={6} top="50%" />

                            <IconButton aria-label="next" icon={<FiChevronRight />} onClick={next}
                                position="fixed" right={6} top="50%" />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    );
}