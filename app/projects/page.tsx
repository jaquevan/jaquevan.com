"use client"

import { Container, Grid } from "@mui/material";
import NavBar from "@/app/components/NavBar";
import projects from "../components/Projects/projects";
import styled from "styled-components";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import case study images
import LC from '@/public/LC-thumb.png';
import MapleImage from '@/public/cases/m3/MAPLE-thumb.png';
import BostonVoterImage from '@/public/cases/bv/BV-thumb.png';
import WordWyrmImage from '@/public/WW-thumb.png';

const NavWrapper = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin: 3rem 0;
    font-family: 'JetBrains Mono', monospace;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 2rem;
        margin: 2rem 0;
    }
`;

// UX Case Studies Section
const CaseStudiesSection = styled.section`
    margin-bottom: 4rem;
`;

const CaseStudyCard = styled.div`
    position: relative;
    border-radius: 7px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-size: cover;
    background-position: center;

    &:hover .tooltip {
        opacity: 1;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
    z-index: 2;
    max-width: 85%;
    text-align: center;
    line-height: 1.5;
    white-space: normal;
    word-wrap: break-word;

    @media (max-width: 768px) {
        bottom: 1.25rem;
        font-size: 0.9rem;
        padding: 0.65rem 1.1rem;
        max-width: 88%;
        line-height: 1.4;
    }

    @media (max-width: 600px) {
        bottom: 1rem;
        font-size: 0.8rem;
        padding: 0.55rem 0.95rem;
        max-width: 90%;
        border-radius: 8px;
    }

    @media (max-width: 480px) {
        bottom: 0.75rem;
        font-size: 0.75rem;
        padding: 0.5rem 0.8rem;
        max-width: 92%;
        line-height: 1.35;
    }

    @media (max-width: 375px) {
        bottom: 0.6rem;
        font-size: 0.7rem;
        padding: 0.45rem 0.7rem;
        max-width: 94%;
    }
`;

// Frontend Projects Section
const FrontendSection = styled.section`
    margin: 4rem 0;
`;

// Project Management Section
const ProjectManagementSection = styled.section`
    margin: 4rem 0;
`;

const FrontendCard = styled.div`
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    height: 100%;
    display: flex;
    flex-direction: column;
`;

interface ImageContainerProps {
    $hasImage: boolean;
}

const FrontendImageContainer = styled.div<ImageContainerProps>`
    position: relative;
    width: 100%;
    height: 200px;
    background: ${props => props.$hasImage ? "transparent" : "#00843D"};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceholderText = styled.div`
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
    font-family: 'JetBrains Mono', monospace;
`;

const WinnerBadge = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FrontendContent = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const FrontendTitle = styled.h3`
    margin: 0 0 0.75rem 0;
    font-weight: 700;
    color: #3a46a7;
    font-size: 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.3;
`;

const FrontendDescription = styled.p`
    margin: 0 0 1.25rem 0;
    color: #555;
    line-height: 1.6;
    font-size: 0.95rem;
    flex-grow: 1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

interface LinkButtonProps {
    $primary?: boolean;
}

const LinkButton = styled.a<LinkButtonProps>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.2s ease;
    font-family: 'JetBrains Mono', monospace;

    ${props => props.$primary ? `
        background-color: #00843D;
        color: white;
        &:hover {
            background-color: #006d31;
        }
    ` : `
        color: #333;
        border: 1px solid #e0e0e0;
        background: white;
        &:hover {
            border-color: #00843D;
            color: #00843D;
        }
    `}
`;

const caseStudies = [
    {
        id: 1,
        title: 'LearnWyrm',
        image: WordWyrmImage,
        link: '/case-studies/word-wyrm',
        summary: 'Educational gaming platform designed to make learning engaging and effective through gamification and AI-powered instruction.'
    },
    {
        id: 2,
        title: 'La Colaborativa',
        image: LC,
        link: '/case-studies/la-colaborativa',
        summary: 'Economic development platform serving 3000+ community members with essential programs and resources.'
    },
    {
        id: 3,
        title: 'MAPLE 3.0',
        image: MapleImage,
        link: '/case-studies/maple',
        summary: 'Legislative transparency tool helping Massachusetts residents engage with their lawmakers.'
    },
    {
        id: 4,
        title: 'Boston Voter',
        image: BostonVoterImage,
        link: '/case-studies/boston-voter',
        summary: 'Civic engagement platform connecting Boston voters with legislative information and community resources.'
    },
];

export default function Projects() {
    const caseStudyRefs = useRef<(HTMLDivElement | null)[]>([]);
    const frontendCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Cursor-following animation for case study cards - more subtle
        caseStudyRefs.current.forEach((card) => {
            if (!card) return;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(card, {
                    duration: 0.4,
                    x: x * 0.02,
                    y: y * 0.02,
                    rotationY: x * 0.015,
                    rotationX: -y * 0.015,
                    transformPerspective: 1000,
                    ease: "power2.out",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.12)"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    ease: "power2.out",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

        // Cursor-following animation for frontend cards - very subtle
        frontendCardRefs.current.forEach((card) => {
            if (!card) return;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(card, {
                    duration: 0.4,
                    x: x * 0.015,
                    y: y * 0.015,
                    rotationY: x * 0.01,
                    rotationX: -y * 0.01,
                    transformPerspective: 1000,
                    ease: "power2.out",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    ease: "power2.out",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <>
            <NavWrapper>
                <NavBar />
            </NavWrapper>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Title>UX Case Studies</Title>

                <CaseStudiesSection>
                    <Grid container spacing={3}>
                        {caseStudies.map((study, index) => (
                            <Grid item xs={12} sm={6} md={6} key={study.id}>
                                <Link href={study.link} style={{ textDecoration: 'none' }}>
                                    <CaseStudyCard
                                        ref={(el) => { caseStudyRefs.current[index] = el; }}
                                        style={{ backgroundImage: `url(${study.image.src})` }}
                                    >
                                        <Tooltip className="tooltip">{study.summary}</Tooltip>
                                    </CaseStudyCard>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </CaseStudiesSection>

                <FrontendSection>
                    <Title>Frontend Projects</Title>
                    <Grid container spacing={3}>
                        {projects.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} key={project.id}>
                                <FrontendCard ref={(el) => { frontendCardRefs.current[index] = el; }}>
                                    <FrontendImageContainer $hasImage={Boolean(project.image)}>
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
                                            <PlaceholderText>Coming Soon</PlaceholderText>
                                        )}
                                    </FrontendImageContainer>
                                    <FrontendContent>
                                        <FrontendTitle>{project.title}</FrontendTitle>
                                        <FrontendDescription>{project.description}</FrontendDescription>
                                        <ActionContainer>
                                            {project.github && (
                                                <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
                                                    GitHub
                                                </LinkButton>
                                            )}
                                            {project.devpost && (
                                                <LinkButton href={project.devpost} target="_blank" rel="noopener noreferrer">
                                                    Devpost
                                                </LinkButton>
                                            )}
                                            {project.liveLink && (
                                                <LinkButton $primary href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                                    Live Demo
                                                </LinkButton>
                                            )}
                                        </ActionContainer>
                                    </FrontendContent>
                                </FrontendCard>
                            </Grid>
                        ))}
                    </Grid>
                </FrontendSection>

                {/* Project Management Section - Currently Hidden */}
                {/* <ProjectManagementSection>
                    <Title>Project Management</Title>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Link href="/pm/bu-spark" style={{ textDecoration: 'none' }}>
                                <FrontendCard>
                                    <FrontendImageContainer $hasImage={false}>
                                        <PlaceholderText>BU Spark!</PlaceholderText>
                                    </FrontendImageContainer>
                                    <FrontendContent>
                                        <FrontendTitle>Boston University Spark!</FrontendTitle>
                                        <FrontendDescription>
                                            UX design projects for civic tech clients including BlackFacts Redesign and UniteBoston BIRD platform
                                        </FrontendDescription>
                                        <ActionContainer>
                                            <LinkButton $primary href="/pm/bu-spark">
                                                View Projects
                                            </LinkButton>
                                        </ActionContainer>
                                    </FrontendContent>
                                </FrontendCard>
                            </Link>
                        </Grid>
                    </Grid>
                </ProjectManagementSection> */}
            </Container>
        </>
    );
}