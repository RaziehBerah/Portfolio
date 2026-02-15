import { useEffect, useState } from "react";

export function useNavSolid(threshold = 40) {
    const [navSolid, setNavSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => setNavSolid(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return navSolid;
}
