import React, { useEffect, useMemo, useState } from "react";
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
    AspectRatio,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { ContactFooter } from "../components/ContactFooter";
import { HiOutlineHome } from "react-icons/hi2";
import { cloudinaryImage, cloudinaryThumb } from "../data/cloudinary";

type CategoryKey = "portrait" | "nature" | "details" | "Jewellery" | "fests";

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
        key: "Jewellery",
        title: "Jewellery",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784036023/file_0000000096a871f4ae91564fc2093609_ykyzmg.png",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784038941/file_000000005fdc71f48c87cbd133e2f25a_imlhsx.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1773780757/4_qa0pck.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784040632/file_000000003f2c71f4a31b786a9fa4d5cd_srzegb.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784038940/file_0000000001ec71f4a91cd9238ac2d449_keyco2.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1773780759/1_f8fdu1.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784038941/file_00000000082071f4a90d7e3ffb3125e7_bdgu1o.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784042556/file_000000007fa471f49ee48c24cdb25fef_hnyhex.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784041764/file_00000000b32c71f4af05cb5f453118f0_kgvxth.png",
        ],
    },
    {
        key: "portrait",
        title: "portrait",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784037164/file_000000007bf471f4915c3e4a6e2cee91_xhtlr3.png",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/6_u3l1d6.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784042867/file_0000000070a871f4a22b6c63845e4869_loc4lk.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/7_ka56cy.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784042556/1000005138-03_mwmhao.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784042828/DSC_0883_1_bi3oub.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/5_yu4zfk.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877056/2_dpqvbg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784042828/DSC_0754_t1tht6.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784041875/IMG_20260517_173020_977_awln9p.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771977875/P_7_zog4gv.jpg",
        ],
    },
    {
        key: "nature",
        title: "nature",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784037273/file_00000000874c71f4a82f4190e27c314d_elekug.png",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877055/02_qgsysu.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784043055/DSC_0247_1_t9hjcc.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877059/12_nfsglo.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784043055/DSC_0581_hsb5tg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877062/07_wxls4e.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784043057/file_00000000f68c71fd96717a7c82150262_yvr5rj.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877060/11_kxzy9c.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784043223/DSC_6697_xououh.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877058/10_amuqcg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784043223/DSC_6689_dgrzgh.jpg",
        ],
    },
    {
        key: "details",
        title: "details",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784037410/file_00000000f1a471f4a57becb7e9e2989e_w9tx9q.png",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/1_cztlxs.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877058/9_sfvw8q.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877057/8_flreor.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1771877060/13_xotlu7.jpg",
        ],
    },
    {
        key: "fests",
        title: "fests",
        poster:
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045998/file_00000000a4d871f48e7374a406182c67_1_dfa9v3.png",
        images: [
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045884/1_sw7wg5.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045884/2_ad7si3.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045884/3_lrwbyg.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045884/4_zm1hkz.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045885/5_lry1j8.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045885/6_kcbr9k.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784061879/DOCS-QFT-SUN-210626JC028-1440x960_ljljgf.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784046248/7_h75o5d.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045885/8_lqepjd.png",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045887/9_icsyze.jpg",
            "https://res.cloudinary.com/don6u8smb/image/upload/v1784045888/10_bbc0g9.png",
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
            Math.min(
                4,
                Math.max(1, Number((e.deltaY > 0 ? s * 0.92 : s * 1.08).toFixed(3)))
            )
        );
    };

    return (
        <Box bg="#050505" color="white">
            <Box position="relative" overflow="hidden">
                <AspectRatio ratio={3 / 2} maxH="85vh">
                    <Box position="relative" w="100%" h="100%">
                        <Image
                            src={cloudinaryImage(HERO, 1600)}
                            position="absolute"
                            inset={0}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            filter="blur(22px)"
                            transform="scale(1.12)"
                            opacity={0.45}
                            alt="Photography hero background"
                        />

                        <Image
                            src={cloudinaryImage(HERO, 1600)}
                            position="relative"
                            w="100%"
                            h="100%"
                            objectFit="contain"
                            alt="Photography hero"
                        />
                    </Box>
                </AspectRatio>

                <Box
                    position="absolute"
                    inset={0}
                    bg="rgba(0,0,0,.35)"
                    pointerEvents="none"
                />

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

            <Box py={{ base: 12, md: 14 }}>
                <Container maxW="1200px">
                    <Grid
                        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                        gap={10}
                        alignItems="stretch"
                    >
                        <GridItem display="flex">
                            <Box
                                flex="1"
                                borderRadius="16px"
                                overflow="hidden"
                                bg="black"
                                border="1px solid rgba(255,255,255,0.08)"
                            >
                                <Image
                                    src={cloudinaryImage(ABOUT_IMG, 1200)}
                                    w="100%"
                                    h="100%"
                                    objectFit="contain"
                                    alt="About Asghar Laei"
                                    loading="lazy"
                                />
                            </Box>
                        </GridItem>

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
                                            fontSize: {
                                                base: "0.92rem",
                                                sm: "0.98rem",
                                                md: "1.02rem",
                                            },
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
                                        As a cinematographer who has spent years experiencing the magic
                                        of capturing images, I remain fascinated by the power of light.
                                        how, in its presence or absence, it reveals and shapes the
                                        details of a subject with an almost magical touch.
                                    </Text>

                                    <Text as="p">
                                        Since my early days in film school, when I first connected with
                                        photography, the value of preserving a moment became clear to
                                        me. A photograph, for me, is a single instant offered to the
                                        viewer, one that quietly invites them to imagine the moments
                                        before and after it.
                                    </Text>

                                    <Text as="p">
                                        Over the years, alongside cinematography, photography has
                                        remained an essential part of my path. I see them as one
                                        continuous journey, each enriching the other and constantly
                                        shaping the way I look at the world around me.
                                    </Text>

                                    <Text as="p" sx={{ mb: { base: 5, md: 6 } }}>
                                        For me, photography is a journey into the world of light, into
                                        still frames that hold a subtle, living tension within them: a
                                        dialogue between light and shadow.
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
                                h="620px"
                                bg="black"
                            >
                                {/* عکس اول گالری در لایه زیرین */}
                                <ChakraImage
                                    src={cloudinaryThumb(c.images[0], 900)}
                                    position="absolute"
                                    inset={0}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    alt=""
                                    loading="lazy"
                                />

                                {/* عکس پوستر روی عکس اول */}
                                <ChakraImage
                                    src={cloudinaryThumb(c.poster, 900)}
                                    position="absolute"
                                    inset={0}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    opacity={0.5}
                                    transition="transform .35s ease, opacity .35s ease"
                                    _groupHover={{
                                        transform: "scale(1.05)",
                                        opacity: 0.6,
                                    }}
                                    alt={c.title}
                                    loading="lazy"
                                />

                                <Box
                                    position="absolute"
                                    inset={0}
                                    bg="rgba(0,0,0,.10)"
                                    pointerEvents="none"
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <ContactFooter />

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
                                src={cloudinaryImage(current, 1600)}
                                maxW="1200px"
                                maxH="100vh"
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                transform={`scale(${scale})`}
                                alt="Gallery image"
                            />

                            <IconButton
                                aria-label="close"
                                icon={<FiX />}
                                onClick={close}
                                position="fixed"
                                top={6}
                                right={6}
                            />

                            <IconButton
                                aria-label="prev"
                                icon={<FiChevronLeft />}
                                onClick={prev}
                                position="fixed"
                                left={6}
                                top="50%"
                            />

                            <IconButton
                                aria-label="next"
                                icon={<FiChevronRight />}
                                onClick={next}
                                position="fixed"
                                right={6}
                                top="50%"
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}