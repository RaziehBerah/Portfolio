import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    src: string;
};

export function TeaserModal({ isOpen, onClose, title, src }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
            <ModalOverlay bg="rgba(0,0,0,0.75)" backdropFilter="blur(6px)" />

            <ModalContent
                bg="#0a0a0a"
                border="1px solid rgba(255,255,255,0.08)"
                borderRadius="16px"
            >
                <ModalHeader
                    fontFamily="heading"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    fontWeight="400"
                >
                    {title}
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody pb={6}>
                    <Box bg="black" borderRadius="12px" overflow="hidden">
                        {src ? (
                            <Box
                                as="iframe"
                                title={title}
                                src={src}
                                w="100%"
                                h="70vh"
                                border="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        ) : null}
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
