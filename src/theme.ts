import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#050505",
                color: "#e6e6e6",
            },
        },
    },
    fonts: {
        heading: `'Cinzel', serif`,
        body: `'Inter', sans-serif`,
    },
    colors: {
        brand: {
            gold: "#cfb53b",
        },
    },
});
