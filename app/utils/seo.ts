import { SEOProps } from "../components/Metadata";
import { defaultOgImagePath } from "./site";

export const defaultSEO: SEOProps = {
    title: "Evan Jaquez",
    description: "Portfolio of Evan Jaquez, a Computer Science & Economics graduate from Boston University specializing in web development and UI/UX.",
    keywords: [
        "evan jaquez",
        "web developer",
        "software engineer",
        "react developer",
        "next.js",
        "boston university",
        "computer science",
        "portfolio",
        "front-end developer"
    ],
    ogType: "website",
    ogImage: defaultOgImagePath,
};

export const generatePageSEO = (pageSEO: Partial<SEOProps>): SEOProps => ({
    ...defaultSEO,
    ...pageSEO,
});