"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const HeroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    animation: ${fadeIn} 0.7s ease-out;

    @media screen and (max-width: 768px) {
        max-width: 350px;
    }
`;

const ProfileImageWrapper = styled.div`
    position: relative;
    width: 280px;
    height: 280px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.1);

    @media screen and (max-width: 768px) {
        width: 240px;
        height: 240px;
    }

    @media screen and (max-width: 480px) {
        width: 200px;
        height: 200px;
    }
`;

const InfoSection = styled.div`
    text-align: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-family: var(--font-mono);
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
`;

const Subtitle = styled.h2`
    font-size: var(--text-lg);
    font-family: var(--font-sans);
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
`;

const Minor = styled.h3`
    font-size: var(--text-base);
    font-family: var(--font-sans);
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
`;

const SocialIconsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
`;

const SocialButton = styled.div<{ $platform?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    color: #111;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${props => {
            if (props.$platform === 'linkedin') return '#0077b5';
            if (props.$platform === 'github') return '#6e5494';
            if (props.$platform === 'email') return '#8b5cf6';
            return 'rgba(255, 255, 255, 0.9)';
        }};
        color: white;
        transform: translateY(-5px) rotate(5deg);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        font-size: 1.8rem;
    }

    @media screen and (max-width: 480px) {
        width: 50px;
        height: 50px;

        svg {
            font-size: 1.6rem;
        }
    }
`;

export default function AboutHero() {
    return (
        <HeroContainer>
            <ProfileImageWrapper>
                <Image
                    src="/snare_close.png"
                    alt="Evan Jaquez - Snare Drum"
                    fill
                    sizes="(max-width: 768px) 240px, 280px"
                    style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                    priority
                    quality={90}
                />
            </ProfileImageWrapper>

            <InfoSection>
                <Title>Evan Jaquez</Title>
                <Subtitle>Computer Science & Economics</Subtitle>
                <Minor>Minor in Data Science</Minor>

                <SocialIconsContainer>
                    <Tooltip title="Connect on LinkedIn">
                        <Link href="https://www.linkedin.com/in/evan-jaquez-118b5b294/" target="_blank" aria-label="LinkedIn">
                            <SocialButton $platform="linkedin">
                                <LinkedInIcon />
                            </SocialButton>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Check my GitHub">
                        <Link href="https://github.com/jaquevan" target="_blank" aria-label="GitHub">
                            <SocialButton $platform="github">
                                <GitHubIcon />
                            </SocialButton>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Send me an Email">
                        <Link href="mailto:jaquevan@bu.edu" target="_blank" aria-label="Email">
                            <SocialButton $platform="email">
                                <EmailIcon />
                            </SocialButton>
                        </Link>
                    </Tooltip>
                </SocialIconsContainer>
            </InfoSection>
        </HeroContainer>
    );
}
