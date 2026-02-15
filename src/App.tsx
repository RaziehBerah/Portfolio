import { Box, useDisclosure } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";

import { FILMS } from "./data/films";
import { CREDITS } from "./data/credits";
import { NAV_ITEMS } from "./data/nav";

import { useNavSolid } from "./hooks/useNavSolid";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ShowreelSection } from "./components/ShowreelSection";
import { FilmsSection } from "./components/FilmsSection";
import { AwardsSection } from "./components/AwardsSection";
import { TeaserModal } from "./components/TeaserModal";
import { ContactFooter } from "./components/ContactFooter";

export default function App() {
  const accent = "#cfb53b";

  const navSolid = useNavSolid(40);

  const showreelSectionRef = useRef<HTMLDivElement | null>(null);

  const teaser = useDisclosure();
  const [teaserSrc, setTeaserSrc] = useState("");
  const [teaserTitle, setTeaserTitle] = useState("Teaser");

  const goToShowreel = () => {
    showreelSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openTeaser = (title: string, src: string) => {
    setTeaserTitle(title);
    setTeaserSrc(src);
    teaser.onOpen();
  };

  const closeTeaser = () => {
    setTeaserSrc("");
    teaser.onClose();
  };

  // اگر دوست داشتی بعداً accent رو از theme بگیری، این useMemo رو حذف کن.
  const navItems = useMemo(() => NAV_ITEMS, []);

  return (
    <Box bg="#050505" color="#e6e6e6">
      <Navbar items={navItems} navSolid={navSolid} accent={accent} />

      <Hero onShowreelClick={goToShowreel} />

      <AboutSection />

      <ShowreelSection accent={accent} sectionRef={showreelSectionRef} />

      <FilmsSection films={FILMS} accent={accent} onPlayTeaser={openTeaser} />

      <AwardsSection credits={CREDITS} accent={accent} />

      <TeaserModal isOpen={teaser.isOpen} onClose={closeTeaser} title={teaserTitle} src={teaserSrc} />

      <ContactFooter />
    </Box>
  );
}
