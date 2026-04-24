"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import styled from "styled-components";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

export interface Project {
    id: string;
    title: string;
    image: string;
    description: string;
    github: string | null;
    liveLink: string | null;
    devpost?: string | null; // Devpost link for hackathon projects
    hackathonWinner?: string; // Award won at hackathon
}

interface ProjectCardProps {
    project: Project;
}

// Typed interfaces for styled components with custom props
interface ImageContainerProps {
    $hasImage: boolean;
}

interface LinkButtonProps {
    $primary?: boolean;
}

// Styled components
const CardContainer = styled(motion.div)`
    width: 100%;
    max-width: 800px;
    height: 500px;
    margin: 0 auto;
    position: relative;
`;

const Card = styled.div`
    width: 110%;
    height: 100%;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    &:hover {
        transform: translateY(-5px);
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    }
`;

const ImageContainer = styled.div<ImageContainerProps>`
    height: 280px;
    width: 100%;
    position: relative;
    background-color: ${props => props.$hasImage ? "transparent" : "#7895ff"};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        z-index: 1;
        pointer-events: none;
    }
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(4px);
`;

const PlaceholderText = styled.div`
    color: white;
    font-weight: 500;
    font-size: 1.25rem;
`;

const ContentContainer = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 280px);
`;

const Title = styled.h3`
    margin: 0 0 16px 0;
    font-weight: 700;
    color: #3a46a7;
    font-size: 1.35rem;
    letter-spacing: -0.01em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Description = styled.p`
    margin: 0 0 24px 0;
    color: #555;
    line-height: 1.6;
    font-size: 0.95rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    flex-grow: 1;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
`;

const LinkButton = styled.a<LinkButtonProps>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    ${props => props.$primary ? `
        background-color: #4361ee;
        color: white;
        &:hover {
            background-color: #3a46a7;
        }
    ` : `
        color: #333;
        border: 1px solid #e0e0e0;
        &:hover {
            border-color: #ccc;
            background-color: rgba(0,0,0,0.04);
        }
    `}
`;

export default function ProjectCard({ project }: ProjectCardProps) {
    const primaryLink = project.liveLink || project.devpost || project.github;

    const handleCardClick = () => {
        if (primaryLink) window.open(primaryLink, "_blank", "noopener,noreferrer");
    };

    return (
        <CardContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                onClick={handleCardClick}
                style={{ cursor: primaryLink ? "pointer" : "default" }}
            >
                <ImageContainer $hasImage={Boolean(project.image)}>
                    {project.hackathonWinner && (
                        <WinnerBadge>{project.hackathonWinner}</WinnerBadge>
                    )}
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority={true}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center top",
                                transition: "transform 0.5s ease",
                            }}
                            quality={85}
                        />
                    ) : (
                        <PlaceholderText>Coming Soon</PlaceholderText>
                    )}
                </ImageContainer>

                <ContentContainer>
                    <Title>{project.title}</Title>
                    <Description>{project.description}</Description>

                    <ActionContainer>
                        {project.github && (
                            <LinkButton
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label="View Code"
                                data-cursor-color="#333333"
                                onClick={e => e.stopPropagation()}
                            >
                                <GitHubIcon fontSize="small" />
                                Code
                            </LinkButton>
                        )}

                        {project.devpost && (
                            <LinkButton
                                href={project.devpost}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label="Devpost"
                                data-cursor-color="#003E54"
                                onClick={e => e.stopPropagation()}
                            >
                                <LaunchIcon fontSize="small" />
                                Devpost
                            </LinkButton>
                        )}

                        {project.liveLink && (
                            <LinkButton
                                $primary
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label="Live Demo"
                                data-cursor-color="#4361ee"
                                onClick={e => e.stopPropagation()}
                            >
                                <LaunchIcon fontSize="small" />
                                Live Demo
                            </LinkButton>
                        )}
                    </ActionContainer>
                </ContentContainer>
            </Card>
        </CardContainer>
    );
}