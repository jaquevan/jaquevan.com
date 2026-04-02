import type { Metadata } from "next";
import "../app/global.css";
import ClientThemeProvider from './ClientThemeProvider';
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeMetaTags from './components/ThemeMetaTags';


export const metadata: Metadata = {
    title: {
        default: "Evan Jaquez",
        template: "%s | Evan Jaquez"
    },
    description: "Evan Jaquez (Evan J) is a Computer Science and Economics student at Boston University (BU), specializing in UX research, UI/UX design, and frontend development. Incoming UX Research Intern at Red Hat. Portfolio showcasing projects at La Colaborativa, Boston Voter, MAPLE, and Word Wyrm.",
    keywords: [
        // Name variations
        "Evan Jaquez",
        "Evan J",
        "Evan Jacques",
        "Evan Jacquez",
        "Evan BU",
        "Evan Jaquez Boston University",
        "Evan J BU",
        // Professional titles
        "UX Researcher",
        "UX Designer",
        "UI/UX Designer",
        "Frontend Developer",
        "Software Engineer",
        "Web Developer",
        // Companies & Internships
        "Red Hat",
        "Red Hat UX Research Intern",
        "Red Hat Intern",
        "La Colaborativa",
        "Boston University Spark",
        "BU Spark",
        // Education
        "Computer Science",
        "Boston University",
        "BU Computer Science",
        "BU Economics",
        // Technical skills
        "React Developer",
        "Next.js Developer",
        "TypeScript Developer",
        "Figma",
        "Tailwind CSS",
        "Strapi CMS",
        // Projects
        "Boston Voter",
        "MAPLE 3.0",
        "Word Wyrm",
        "Trailblazer Boston Hacks",
        // Expertise
        "Civic Tech",
        "Digital Equity",
        "Web Accessibility",
        "User Research",
        "Usability Testing",
        "Raleigh NC UX",
        "Portfolio",
        "Hackathon Winner",
        "Boston Hacks 2025"
    ],
    authors: [{ name: "Evan Jaquez" }],
    creator: "Evan Jaquez",
    publisher: "Evan Jaquez",
    metadataBase: new URL('https://jaquevan.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://jaquevan.com",
        title: "Evan Jaquez | UX Researcher & Designer",
        description: "Portfolio of Evan Jaquez — incoming UX Research Intern at Red Hat, CS & Economics student at Boston University. UX design, frontend development, and civic technology. Projects: La Colaborativa, Boston Voter, MAPLE.",
        siteName: "Evan Jaquez Portfolio",
        images: [
            {
                url: '/snare_close.png',
                width: 1200,
                height: 630,
                alt: 'Evan Jaquez - Software Engineer & UX Researcher/Designer',
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Evan Jaquez — UX Researcher & Designer, Red Hat Intern",
        description: "Portfolio of Evan Jaquez — incoming UX Research Intern at Red Hat, CS & Econ student at BU. UX design, frontend dev, civic tech.",
        images: ['/snare_close.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "cNUcHnHa-COy90552cdEao-BX0AVr6kkW8NgNe-4TGM",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Evan Jaquez",
        "alternateName": ["Evan J", "Evan Jacques", "Evan Jacquez"],
        "url": "https://jaquevan.com",
        "jobTitle": ["UX Researcher", "UX Designer", "Frontend Developer"],
        "worksFor": [
            {
                "@type": "Organization",
                "name": "Red Hat",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Raleigh",
                    "addressRegion": "NC"
                }
            }
        ],
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Boston University",
            "sameAs": "https://www.bu.edu"
        },
        "description": "Evan Jaquez (also known as Evan J) is a Computer Science and Economics student at Boston University, incoming UX Research Intern at Red Hat, specializing in UX research, UI/UX design, and frontend development. Known for work on La Colaborativa, Boston Voter, and MAPLE projects.",
        "knowsAbout": [
            "Software Engineering",
            "Frontend Development",
            "Full Stack Development",
            "UI/UX Design",
            "Computer Science",
            "Data Science",
            "Economics",
            "Web Development",
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Python",
            "Tailwind CSS",
            "Strapi CMS",
            "Civic Technology",
            "Educational Technology",
            "Digital Equity",
            "Web Accessibility",
            "Mobile-First Design"
        ],
        "award": [
            "Boston Hacks 2025 Winner - Trailblazer",
            "MLH Adobe Award - Camelitics"
        ],
        "sameAs": [
            "https://github.com/jaquevan",
            "https://www.linkedin.com/in/evan-jaquez-118b5b294/"
        ],
        "mainEntityOfPage": {
            "@type": "ProfilePage",
            "@id": "https://jaquevan.com"
        }
    };

    return (
        <html lang="en">
        <head>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </head>
        <body>
        <StyledComponentsRegistry>
            <ClientThemeProvider>
                <ThemeMetaTags />
                {children}
            </ClientThemeProvider>
        </StyledComponentsRegistry>
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    );
}