"use client";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Typography, Tooltip } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Link from 'next/link';
import Image from 'next/image';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
`;


const colors = {
    darkBg: "#111111",
    accent: "#4bb97d",
    lightText: "#F8F8F8",
    midGray: "#333333",
    highlight: "#34D399",
    darkAccent: "#006631"
};

const FooterWrapper = styled.footer`
    background: linear-gradient(to bottom, #0a0a0a 0%, ${colors.darkBg} 100%);
    color: ${colors.lightText};
    padding: 2rem 0 0;
    position: relative;
    overflow: hidden;
    animation: ${fadeIn} 0.8s ease-out;
    border-top: 1px solid rgba(52, 211, 153, 0.1);
`;

const GreyLine = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(128, 128, 128, 0.3);
    margin-bottom: 3rem;
`;

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 0.7fr 1.1fr 0.7fr;
    gap: 4rem;
    padding: 0 2.5rem 3.5rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: start;
    align-items: flex-start;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
        padding: 0 1.5rem 2.5rem;
        align-items: center;
    }

    @media (max-width: 768px) {
        padding: 0 1rem 2rem;
    }
`;

const BrandColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;

    @media (max-width: 968px) {
        align-items: center;
        text-align: center;
    }
`;

const NavColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: flex-start;
    padding-right: 2rem;
    align-self: center;

    @media (max-width: 968px) {
        align-items: center;
        padding-right: 0;
        margin-top: 2rem;
        align-self: center;
    }
`;

const ImagePlaceholder = styled.div`
    width: 100%;
    max-width: 340px;
    aspect-ratio: 1.1;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.3);
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    box-shadow: 0 6px 24px rgba(0,0,0,0.08);
    overflow: hidden;
    position: relative;

    @media (max-width: 968px) {
        display: none;
    }
`;

const LogoText = styled(Typography)`
    color: ${colors.lightText};
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 2px;
    margin-bottom: 0.75rem;
    font-size: 2.2rem;
    background: linear-gradient(135deg, ${colors.lightText} 0%, ${colors.highlight} 50%, ${colors.accent} 100%);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: letter-spacing 0.3s ease;
    position: relative;
    width: max-content;
    max-width: 100%;

    /* Reserve space for expanded text */
    &::after {
        content: 'jaquevan';
        position: absolute;
        left: 0;
        top: 0;
        letter-spacing: 6px;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        pointer-events: none;
    }

    &:hover {
        letter-spacing: 6px;
    }

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Tagline = styled(Typography)`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    margin-bottom: 1.75rem;
    line-height: 1.8;
    font-family: var(--font-sans);
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

// const NavTitle = styled.div`
//     color: ${colors.lightText};
//     font-size: 0.9rem;
//     font-weight: 600;
//     text-transform: lowercase;
//     letter-spacing: 2px;
//     margin-bottom: 1.25rem;
//     font-family: 'JetBrains Mono', monospace;
// `;


const FooterLink = styled(Link)`
    font-family: var(--font-sans);
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    font-size: 1.25rem;
    text-align: left;
    font-weight: 500;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    padding: 0.6rem 0;
    position: relative;
    width: fit-content;

    &::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%) scale(0);
        width: 6px;
        height: 6px;
        background: ${colors.highlight};
        border-radius: 50%;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &:hover {
        color: ${colors.highlight};
        letter-spacing: 0.5px;
        padding-left: 4px;

        &::before {
            transform: translateY(-50%) scale(1);
        }

        & svg {
            transform: rotate(360deg) scale(1.15);
        }
    }

    & svg {
        font-size: 1.15rem;
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        opacity: 0.8;
    }

    @media (max-width: 968px) {
        justify-content: center;
        width: auto;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;

        &:hover {
            transform: translateY(-2px);
            padding-left: 0;
        }
    }
`;

const SocialIconsContainer = styled.div`
    display: flex;
    gap: 1.25rem;
    margin-top: 0.5rem;
    align-items: flex-start;

    @media (max-width: 968px) {
        justify-content: center;
        align-items: center;
    }
`;

const SocialButton = styled.div<{ $platform?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
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
        font-size: 2rem;
    }
`;

const BottomBar = styled.div`
    background: transparent;
    padding: 1.5rem 2rem;
    text-align: center;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.25);
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.03);

    & span {
        color: rgba(255, 255, 255, 0.3);
        font-weight: 400;
    }

    @media (max-width: 768px) {
        padding: 1.25rem 1.5rem;
        font-size: 0.7rem;
    }
`;

const CurrentTime = styled.div`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 1.25rem;
    display: inline-block;

    @media (max-width: 968px) {
        text-align: center;
    }

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

export default function Footer() {
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Set initial time immediately
        const updateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;

            setCurrentDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`);
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <FooterWrapper>
            <GreyLine />
            <ContentContainer>
                <BrandColumn>
                    <LogoText variant="h3">jaquevan</LogoText>
                    <Tagline variant="body2">
                        Computer Science & Economics. <br />
                        Minor in Data Science <br />
                        Boston University, Boston MA
                    </Tagline>

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

                    <CurrentTime>
                        {mounted ? currentDateTime : ''}
                    </CurrentTime>
                </BrandColumn>

                <NavColumn>
                    <FooterLink href="/">
                        <HomeIcon fontSize="small" /> Home
                    </FooterLink>
                    <FooterLink href="/about">
                        <CodeIcon fontSize="small" /> About Me
                    </FooterLink>
                    <FooterLink href="/experience">
                        <EmailIcon fontSize="small" /> Experience
                    </FooterLink>
                    <FooterLink href="/projects">
                        <DesignServicesIcon fontSize="small" /> Projects
                    </FooterLink>
                </NavColumn>

                <ImagePlaceholder>
                    <Image
                        src="/snare_close.png"
                        alt="Snare Drum Closeup"
                        fill
                        sizes="(max-width: 968px) 0px, 340px"
                        style={{ objectFit: 'cover', borderRadius: '16px', filter: 'grayscale(100%)' }}
                    />
                </ImagePlaceholder>
            </ContentContainer>

            <BottomBar>
                © {new Date().getFullYear()} <span>Evan Jaquez</span>
            </BottomBar>
        </FooterWrapper>
    );
}
