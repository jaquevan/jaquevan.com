"use client"

import { Container } from "@mui/material";
import NavBar from "@/app/components/NavBar";
import projects from "../components/Projects/projects";
import styled from "styled-components";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import LC from '@/public/LC-thumb.png';
import MapleImage from '@/public/cases/m3/MAPLE-thumb.png';
import BostonVoterImage from '@/public/cases/bv/BV-thumb.png';
import WordWyrmImage from '@/public/WW-thumb.png';

/* ─── Nav ─── */


/* ─── Page shell ─── */

const Page = styled.div`
    padding: 3rem 0 6rem;

    @media (max-width: 600px) {
        padding: 2rem 0 4rem;
    }
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid var(--border);
    margin: 4rem 0;
`;

/* ─── Two-column layout for case studies ─── */

const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    align-items: start;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const SidePanel = styled.aside`
    position: sticky;
    top: 80px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 800px) {
        position: static;
        border-bottom: 1px solid var(--border);
        padding-bottom: 1.25rem;
    }
`;

const SideTitle = styled.h1`
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.3;
`;

const SideLabel = styled.p`
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    margin: 0;
`;

const SideMeta = styled.p`
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: var(--lh-normal);
    color: var(--text-secondary);
    margin: 0.5rem 0 0;
`;

/* ─── Case study cards ─── */

const CaseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CaseCard = styled.div`
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    background: var(--background);
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
        box-shadow: 0 8px 28px var(--shadow);
        transform: translateY(-1px);
    }

    &:hover img {
        transform: scale(1.03);
    }

    &:hover [data-arrow] {
        transform: translateX(3px);
    }
`;

const CaseThumb = styled.div`
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    line-height: 0;

    img {
        width: 100% !important;
        height: auto !important;
        display: block;
        transition: transform 0.35s ease;
    }
`;

const CaseBody = styled.div`
    padding: 0.65rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const CaseRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
`;

const CaseTitle = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--text-primary);
`;

const CaseYear = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    flex-shrink: 0;
`;

const CaseSummary = styled.p`
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: var(--lh-snug);
    color: var(--text-secondary);
    margin: 0;
`;

const CaseFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.25rem;
`;

const CaseTags = styled.div`
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
`;

const CaseTag = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    padding: 0.15rem 0.45rem;
    border-radius: 3px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
`;

const CaseArrow = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    flex-shrink: 0;
    transition: transform 0.2s ease;
    display: inline-block;
`;

/* ─── Frontend projects ─── */

const FrontendHeader = styled.div`
    margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.3rem;
`;

const FrontendGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

const FrontendCard = styled.div`
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--background);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
        box-shadow: 0 8px 24px var(--shadow);
        transform: translateY(-1px);
    }
`;

const FrontendImageWrap = styled.div<{ $hasImage: boolean }>`
    position: relative;
    width: 100%;
    height: 160px;
    background: ${p => p.$hasImage ? 'var(--border)' : 'var(--primary)'};
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceholderText = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.7);
`;

const WinnerBadge = styled.span`
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--background);
    color: var(--text-primary);
    padding: 3px 8px;
    border-radius: 4px;
    font-size: var(--text-2xs);
    font-weight: 600;
    font-family: var(--font-mono);
    z-index: 2;
    border: 1px solid var(--border);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const FrontendContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.4rem;
`;

const FrontendTitle = styled.h3`
    margin: 0;
    font-weight: 600;
    color: var(--text-primary);
    font-size: var(--text-sm);
    font-family: var(--font-mono);
    line-height: var(--lh-tight);
`;

const FrontendDesc = styled.p`
    margin: 0;
    color: var(--text-secondary);
    line-height: var(--lh-snug);
    font-size: var(--text-sm);
    flex-grow: 1;
    font-family: var(--font-sans);
`;

const LinkRow = styled.div`
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-top: 0.4rem;
`;

const LinkBtn = styled.a<{ $primary?: boolean }>`
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 5px;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-decoration: none;
    transition: all 0.15s ease;
    border: 1px solid ${p => p.$primary ? 'var(--primary)' : 'var(--border)'};
    background: ${p => p.$primary ? 'var(--primary)' : 'transparent'};
    color: ${p => p.$primary ? '#fff' : 'var(--text-secondary)'};

    &:hover {
        border-color: var(--primary);
        color: ${p => p.$primary ? '#fff' : 'var(--primary)'};
        background: ${p => p.$primary ? 'var(--primary)' : 'color-mix(in srgb, var(--primary) 8%, transparent)'};
    }
`;

/* ─── Graphic Design gallery ─── */

const GDColumns = styled.div`
    columns: 4;
    column-gap: 0.45rem;

    @media (max-width: 1024px) { columns: 3; }
    @media (max-width: 640px)  { columns: 2; }
    @media (max-width: 380px)  { columns: 1; }
`;

const GDItem = styled.div`
    break-inside: avoid;
    margin-bottom: 0.45rem;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid var(--border);
    cursor: zoom-in;
    background: var(--border);

    img {
        display: block;
        width: 100%;
        height: auto;
        transition: transform 0.3s ease;
    }

    &:hover img {
        transform: scale(1.04);
    }
`;

const Overlay = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 2000;
    display: ${p => p.$open ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    padding: 2rem;
`;

const OverlayImg = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
`;

/* ─── Data ─── */

/*
 * Order matters — related pieces sit next to each other in the masonry.
 * Add a new path here when you drop an image into /public/gd/.
 */
const gdImages: string[] = [
    '/gd/CD-Design_copy.png',
    '/gd/cd-picture.jpg',
    '/gd/Billboard.png',
    '/gd/qr.png',
    '/gd/fleaslogo.jpg',
    '/gd/projection1.png',
    '/gd/projection2.png',
    '/gd/future.png',
    '/gd/Page1.jpg',
    '/gd/PersonalPattern.png',
];

const caseStudies = [
    {
        id: 1,
        title: 'Word Wyrm',
        year: 'Fall 2026',
        summary: 'Educational gaming platform using AI and gamification to make learning stick.',
        tags: ['EdTech', 'UX Design', 'Figma'],
        image: WordWyrmImage,
        link: '/case-studies/word-wyrm',
    },
    {
        id: 2,
        title: 'La Colaborativa',
        year: '2025',
        summary: 'Civic tech platform serving 3,000+ community members with economic development resources.',
        tags: ['Civic Tech', 'Next.js', 'UX Research'],
        image: LC,
        link: '/case-studies/la-colaborativa',
    },
    {
        id: 3,
        title: 'Boston Voter',
        year: '2025',
        summary: 'Voter engagement tool improving civic access for Boston\'s BIPOC communities.',
        tags: ['Civic Tech', 'Figma', 'UX Research'],
        image: BostonVoterImage,
        link: '/case-studies/boston-voter',
    },
    {
        id: 4,
        title: 'MAPLE 3.0',
        year: '2025',
        summary: 'Legislative transparency platform helping Massachusetts residents engage with lawmakers.',
        tags: ['Civic Tech', 'Figma'],
        image: MapleImage,
        link: '/case-studies/maple',
    },
];

export default function Projects() {
    const frontendCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    useEffect(() => {
        frontendCardRefs.current.forEach((card) => {
            if (!card) return;
            const onMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(card, { duration: 0.4, rotationY: x * 0.01, rotationX: -y * 0.01, transformPerspective: 1000, ease: "power2.out" });
            };
            const onLeave = () => gsap.to(card, { duration: 0.5, rotationY: 0, rotationX: 0, ease: "power2.out" });
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
        });
    }, []);

    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Page>

                    {/* ── Case Studies ── */}
                    <TwoCol>
                        <SidePanel>
                            <SideLabel>selected work</SideLabel>
                            <SideTitle>UX Case Studies</SideTitle>
                            <SideMeta>
                                Research-driven design for civic tech, education, and community platforms.
                            </SideMeta>
                        </SidePanel>

                        <CaseList>
                            {caseStudies.map((study) => (
                                <Link key={study.id} href={study.link} style={{ textDecoration: 'none' }}>
                                    <CaseCard>
                                        <CaseThumb>
                                            <Image
                                                src={study.image}
                                                alt={study.title}
                                                style={{ width: '100%', height: 'auto' }}
                                                sizes="(max-width: 800px) 100vw, 60vw"
                                            />
                                        </CaseThumb>
                                        <CaseBody>
                                            <CaseRow>
                                                <CaseTitle>{study.title}</CaseTitle>
                                                <CaseYear>{study.year}</CaseYear>
                                            </CaseRow>
                                            <CaseSummary>{study.summary}</CaseSummary>
                                            <CaseFooter>
                                                <CaseTags>
                                                    {study.tags.map(t => <CaseTag key={t}>{t}</CaseTag>)}
                                                </CaseTags>
                                                <CaseArrow data-arrow="true">→</CaseArrow>
                                            </CaseFooter>
                                        </CaseBody>
                                    </CaseCard>
                                </Link>
                            ))}
                        </CaseList>
                    </TwoCol>

                    <Divider />

                    {/* ── Frontend Projects ── */}
                    <FrontendHeader>
                        <SectionTitle>Frontend Projects</SectionTitle>
                    </FrontendHeader>

                    <FrontendGrid>
                        {projects.map((project, index) => (
                            <FrontendCard
                                key={project.id}
                                ref={(el) => { frontendCardRefs.current[index] = el; }}
                            >
                                <FrontendImageWrap $hasImage={Boolean(project.image)}>
                                    {project.hackathonWinner && (
                                        <WinnerBadge>{project.hackathonWinner}</WinnerBadge>
                                    )}
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <PlaceholderText>coming soon</PlaceholderText>
                                    )}
                                </FrontendImageWrap>
                                <FrontendContent>
                                    <FrontendTitle>{project.title}</FrontendTitle>
                                    <FrontendDesc>{project.description}</FrontendDesc>
                                    <LinkRow>
                                        {project.github && (
                                            <LinkBtn href={project.github} target="_blank" rel="noopener noreferrer">
                                                GitHub
                                            </LinkBtn>
                                        )}
                                        {project.devpost && (
                                            <LinkBtn href={project.devpost} target="_blank" rel="noopener noreferrer">
                                                Devpost
                                            </LinkBtn>
                                        )}
                                        {project.liveLink && (
                                            <LinkBtn $primary href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                                Live →
                                            </LinkBtn>
                                        )}
                                    </LinkRow>
                                </FrontendContent>
                            </FrontendCard>
                        ))}
                    </FrontendGrid>

                    <Divider />

                    {/* ── Graphic Design ── */}
                    <FrontendHeader>
                        <SectionTitle>Graphic Design</SectionTitle>
                    </FrontendHeader>

                    <GDColumns>
                        {gdImages.map((src) => (
                            <GDItem key={src} onClick={() => setLightboxSrc(src)}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="" loading="lazy" />
                            </GDItem>
                        ))}
                    </GDColumns>

                </Page>
            </Container>

            {/* Lightbox */}
            <Overlay $open={lightboxSrc !== null} onClick={() => setLightboxSrc(null)}>
                {lightboxSrc && <OverlayImg src={lightboxSrc} alt="" />}
            </Overlay>
        </>
    );
}
