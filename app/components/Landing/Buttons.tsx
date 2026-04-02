"use client";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FolderIcon from "@mui/icons-material/Folder";
import { gsap } from 'gsap';

const buttons = [
    {
        id: "linkedin",
        text: "LinkedIn",
        href: "https://www.linkedin.com/in/evan-jaquez-118b5b294/",
        icon: <LinkedInIcon />,
        color: "#0077b5",
        tooltip: "Connect on LinkedIn"
    },
    {
        id: "projects",
        text: "Projects",
        href: "/projects",
        icon: <FolderIcon />,
        color: "#00843D",
        tooltip: "View Projects"
    },
    {
        id: "github",
        text: "GitHub",
        href: "https://www.github.com/jaquevan",
        icon: <GitHubIcon />,
        color: "#343c40",
        tooltip: "View GitHub Profile"
    }
];

interface StyledButtonProps {
    $color?: string;
}

const ButtonContainer = styled.div`
    display: flex;
    gap: clamp(0.8rem, 2vw, 2rem);
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    width: 100%;
    margin: 5vh auto 1.75vh;

    @media (max-width: 1024px) {
        justify-content: center;
        gap: clamp(0.6rem, 2vw, 1.5rem);
        flex-wrap: wrap;
        margin: 1vh auto 0.5vh;
    }

    @media (max-width: 600px) {
        margin: 1.5vh auto 0.75vh;
        gap: 0.4rem;
    }

    @media (max-width: 480px) {
        margin: 1vh auto 0.5vh;
        gap: 0.35rem;
    }

    @media (max-width: 375px) {
        margin: 0.75vh auto 0.5vh;
        gap: 0.3rem;
    }

    @media (max-width: 320px) {
        margin: 0.5vh auto 0.35vh;
        gap: 0.25rem;
    }
`;

const Name = styled.h1`
    margin: 4vh 0 .5vh;
    padding: 0;
    font-size: clamp(2rem, 7vw, 4rem); /* cap the max to reduce clumping on small screens */
    line-height: 1.2;
    letter-spacing: normal;
    transition: letter-spacing 0.3s ease;
    text-align: center; // centered on all screen sizes

    &:hover {
        letter-spacing: 0.15rem;
    }

    @media (max-width: 1024px) {
        margin: 1vh 0 0.3vh;
        font-size: clamp(2rem, 6vw, 2.5rem);
    }

    @media (max-width: 768px) {
        font-size: clamp(2rem, 8vw, 3rem);
    }

    @media (max-width: 600px) {
        font-size: clamp(1.7rem, 7vw, 2.3rem);
        margin: 1vh 0 0.35vh;
        line-height: 1.1;
    }

    @media (max-width: 480px) {
        font-size: clamp(1.6rem, 7vw, 2.2rem);
        margin: 0.75vh 0 0.3vh;
    }

    @media (max-width: 375px) {
        font-size: clamp(1.5rem, 6.5vw, 2rem);
        margin: 0.6vh 0 0.25vh;
    }

    @media (max-width: 320px) {
        font-size: clamp(1.3rem, 6vw, 1.8rem);
        margin: 0.5vh 0 0.2vh;
    }
`;

const SubText = styled.h2`
    margin: 0;
    padding: 0;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-family: Monospaced, "JetBrains Mono", sans-serif;
    line-height: 1.2;
    text-align: center;
    

    @media (max-width: 768px) {
        font-size: clamp(0.9rem, 4vw, 1.2rem);
    }

    @media (max-width: 600px) {
        font-size: clamp(0.8rem, 3.5vw, 1rem);
        line-height: 1.1;
    }

    @media (max-width: 480px) {
        font-size: clamp(0.75rem, 3.5vw, 0.95rem);
    }

    @media (max-width: 375px) {
        font-size: clamp(0.7rem, 3vw, 0.9rem);
    }

    @media (max-width: 320px) {
        font-size: clamp(0.65rem, 2.8vw, 0.85rem);
    }
`;

const ButtonWrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    min-width: clamp(130px, 15vw, 160px);
    max-width: clamp(160px, 20vw, 200px);

    @media (max-width: 1024px) {
        max-width: 300px;
        flex: 0 1 calc(80% - 1rem);
    }

    @media (max-width: 768px) {
        flex: 0 1 calc(45% - 0.5rem);
        min-width: 120px;
        max-width: 160px;
    }

    @media (max-width: 600px) {
        flex: 0 1 calc(45% - 0.3rem);
        min-width: 95px;
        max-width: 130px;
    }

    @media (max-width: 480px) {
        flex: 0 1 calc(45% - 0.3rem);
        min-width: 90px;
        max-width: 120px;
    }

    @media (max-width: 375px) {
        flex: 0 1 calc(45% - 0.25rem);
        min-width: 85px;
        max-width: 110px;
    }
`;

const MonkeyImage = styled.img`
    position: absolute;
    top: -32px;
    right: 5px;
    width: 50px;
    height: 50px;
    object-fit: contain;
    opacity: 0;
    transform: translateY(15px) scale(0) rotate(45deg);
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
    z-index: 0;

    @media (max-width: 1024px) {
        width: 20px;
        height: 20px;
        top: -14px;
        right: 5px;


    }

    @media (max-width: 768px) {
        display: none;
    }

    @media (max-width: 600px) {
        display: none;
    }

    @media (max-width: 480px) {
        width: 22px;
        height: 22px;
        top: -16px;
    }

    @media (max-width: 375px) {
        width: 20px;
        height: 20px;
        top: -14px;
    }
`;

const StyledButton = styled.a<StyledButtonProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: clamp(0.6rem, 1.2vh, 0.9rem) clamp(1.2rem, 3vw, 2.2rem);
    border-radius: 10px;
    font-size: clamp(0.85rem, 1.5vw, 1.1rem);
    font-weight: 500;
    text-decoration: none;
    color: #fff;
    background: ${props => props.$color || "#2c3e50"};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 1;

    &:hover, &:focus {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1024px) {
        padding: 0.8rem 1rem;
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        padding: 0.7rem 0.9rem;
        font-size: 0.9rem;
    }

    @media (max-width: 600px) {
        padding: 0.45rem 0.6rem;
        font-size: 0.8rem;
    }

    @media (max-width: 480px) {
        padding: 0.4rem 0.55rem;
        font-size: 0.75rem;
    }

    @media (max-width: 375px) {
        padding: 0.35rem 0.5rem;
        font-size: 0.7rem;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(1.5rem, 2.5vw, 2.5rem);
    height: clamp(1.5rem, 2.5vw, 2.5rem);
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    flex-shrink: 0;
`;

const ButtonText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: calc(.5rem + 0.5vw);
`;

const fadeInScale = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -5px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0) scale(1);
    }
`;

const drawLine = keyframes`
    from {
        stroke-dashoffset: 50;
    }
    to {
        stroke-dashoffset: 0;
    }
`;

const TooltipWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
`;

const CustomTooltipContent = styled.div<{ $visible: boolean }>`
    position: absolute;
    background: rgba(18, 18, 18, 0.95);
    color: #ffffff;
    font-size: 0.7rem;
    font-family: "JetBrains Mono", monospace;
    padding: 4px 10px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
    opacity: ${props => props.$visible ? 1 : 0};
    animation: ${props => props.$visible ? fadeInScale : 'none'} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition: opacity 0.2s ease;

    /* Desktop: bottom */
    top: calc(100% + 14px);
    left: 50%;
    transform: translate(-50%, 0);

    /* Mobile/Tablet: right side */
    @media (max-width: 1024px) {
        display: none;

    }

    @media (max-width: 600px) {
        display: none;

    }
`;

const TooltipPath = styled.svg<{ $visible: boolean }>`
    position: absolute;
    pointer-events: none;
    z-index: 999;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.2s ease;

    &.desktop-scribble {
        /* Desktop: vertical scribble at bottom */
        top: calc(100% - 2px);
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 22px;

        @media (max-width: 1024px) {
            display: none;
        }

        path {
            stroke: var(--text-primary);
            stroke-width: 1.7;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 60;
            stroke-dashoffset: ${props => props.$visible ? 0 : 60};
            animation: ${props => props.$visible ? drawLine : 'none'} 2.5s ease-out;
            opacity: 0.63;
        }
    }

    &.mobile-line {
        /* Mobile/Tablet: horizontal straight line to the right */
        display: none;

        @media (max-width: 1024px) {
            display: none;
        }

        @media (max-width: 600px) {
            display: none;
        }

        line {
            stroke: var(--text-primary);
            stroke-width: 1.5;
            stroke-dasharray: 10;
            stroke-dashoffset: ${props => props.$visible ? 0 : 10};
            animation: ${props => props.$visible ? drawLine : 'none'} 0.3s ease-out;
            opacity: 0.63;
        }
    }
`;

export default function EnhancedButtons() {
    const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLHeadingElement>(null);
    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: { ease: "power2.out" }
            });

            // Snappy text animations
            timeline.fromTo(nameRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4 },
                0
            );

            timeline.fromTo(subTextRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3 },
                0.1
            );

            // Quick button animations with stagger
            buttonRefs.current.forEach((button, index) => {
                if (!button) return;

                timeline.fromTo(button,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.3 },
                    0.25 + (index * 0.05)
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Name ref={nameRef}>Evan Jaquez</Name>
            <SubText ref={subTextRef}>UX Designer & Researcher</SubText>
            <ButtonContainer role="navigation" aria-label="Social links and navigation">
                {buttons.map((button, index) => (
                    <TooltipWrapper key={button.id}>
                        <CustomTooltipContent $visible={hoveredButton === button.id}>
                            {button.tooltip}
                        </CustomTooltipContent>
                        <TooltipPath $visible={hoveredButton === button.id} className="desktop-scribble">
                            <path d="M 12 0 Q 14 2, 10 4 Q 6 5, 10 7 Q 14 8, 10 10 Q 8 11, 10 13 Q 12 14, 12 14" />
                        </TooltipPath>
                        <TooltipPath $visible={hoveredButton === button.id} className="mobile-line">
                            <line x1="0" y1="1" x2="8" y2="1" />
                        </TooltipPath>
                        <ButtonWrapper
                            ref={(el) => { buttonRefs.current[index] = el; }}
                            onMouseEnter={(e) => {
                                setHoveredButton(button.id);
                                if (button.id === "projects") {
                                    const monkey = e.currentTarget.querySelector('img');
                                    if (monkey) {
                                        gsap.to(monkey, {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            rotation: 0,
                                            duration: 0.4,
                                            ease: "back.out(1.7)"
                                        });
                                    }
                                }
                            }}
                            onMouseLeave={(e) => {
                                setHoveredButton(null);
                                if (button.id === "projects") {
                                    const monkey = e.currentTarget.querySelector('img');
                                    if (monkey) {
                                        gsap.to(monkey, {
                                            opacity: 0,
                                            y: 15,
                                            scale: 0,
                                            rotation: 45,
                                            duration: 0.3,
                                            ease: "power2.in"
                                        });
                                    }
                                }
                            }}
                        >
                            {button.id === "projects" && (
                                <MonkeyImage src="/Classic_dart_monkey.webp" alt="" />
                            )}
                            <StyledButton
                                href={button.href}
                                target={button.href.startsWith("http") ? "_blank" : "_self"}
                                rel={button.href.startsWith("http") ? "noopener noreferrer" : ""}
                                $color={button.color}
                                aria-label={button.tooltip}
                            >
                                <IconWrapper className="icon">
                                    {button.icon}
                                </IconWrapper>
                                <ButtonText>{button.text}</ButtonText>
                            </StyledButton>
                        </ButtonWrapper>
                    </TooltipWrapper>
                ))}
            </ButtonContainer>
        </>
    );
}