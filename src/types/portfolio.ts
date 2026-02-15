export type Film = {
    id: string;
    title: string;
    year: string;
    tags: string[];
    synopsis: string;
    poster: string;
    teaser: string;
};

export type Credit = {
    year: string;
    type: "Award" | "Jury Prize" | "Nomination" | "Official Selection";
    festival: string;
    country: string;
    film: string;
    title: string;
};

export type NavItem = { label: string; href: string };
