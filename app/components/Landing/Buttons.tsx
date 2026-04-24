"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FolderIcon from "@mui/icons-material/Folder";
import { gsap } from "gsap";

const Name = styled.h1`
    margin: 4vh 0 0.5vh;
    padding: 0;
    font-size: clamp(2rem, 7vw, 4rem);
    line-height: 1.2;
    letter-spacing: normal;
    transition: letter-spacing 0.3s ease;
    text-align: center;

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
`;

const SubText = styled.h2`
    margin: 0;
    padding: 0;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-family: var(--font-mono);
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
`;

/* Outer column that stacks both rows */
const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin: 5vh 0 1.75vh;

    @media (max-width: 1024px) {
        margin: 1.5vh 0 0.5vh;
    }

    @media (max-width: 600px) {
        gap: 0.55rem;
        margin: 1.5vh 0 0.75vh;
    }

    @media (max-width: 375px) {
        gap: 0.45rem;
        margin: 0.75vh 0 0.5vh;
    }
`;

/* Top row: LinkedIn + GitHub circles */
const IconRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    @media (max-width: 600px) {
        gap: 0.55rem;
    }
`;

const CircleButton = styled.a<{ $bgColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    color: #111;
    text-decoration: none;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease,
                color 0.3s ease,
                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                box-shadow 0.3s ease;

    &:hover {
        background-color: ${p => p.$bgColor};
        color: #fff;
        transform: translateY(-5px) rotate(5deg);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        font-size: 1.8rem;
    }

    @media (max-width: 600px) {
        width: 44px;
        height: 44px;
        svg { font-size: 1.5rem; }
    }

    @media (max-width: 375px) {
        width: 40px;
        height: 40px;
        svg { font-size: 1.4rem; }
    }
`;

/* Bottom row: Projects button — extra gap above the icon row */
const ProjectsWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 1.25rem;
`;

const ProjectsButton = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 50px;
    padding: 0 2rem;
    border-radius: 10px;
    background-color: #00843d;
    color: #fff;
    font-size: var(--text-base);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
    white-space: nowrap;

    &:hover {
        transform: translateY(-2px);
        background-color: #007535;
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        font-size: 1.2rem;
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        height: 44px;
        padding: 0 1.5rem;
        font-size: 0.85rem;
    }

    @media (max-width: 375px) {
        height: 40px;
        padding: 0 1.2rem;
        font-size: 0.8rem;
    }
`;

const MonkeyImage = styled.img<{ $visible: boolean }>`
    position: absolute;
    top: -36px;
    right: 6px;
    width: 48px;
    height: 48px;
    object-fit: contain;
    opacity: ${p => p.$visible ? 1 : 0};
    transform: ${p =>
        p.$visible
            ? "translateY(0) scale(1) rotate(0deg)"
            : "translateY(15px) scale(0) rotate(45deg)"};
    transition: opacity 0.3s ease,
                transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;

    @media (max-width: 768px) {
        display: none;
    }
`;

export default function EnhancedButtons() {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLHeadingElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);
    const [hoveredProjects, setHoveredProjects] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.fromTo(nameRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0);
            tl.fromTo(subTextRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 }, 0.1);
            tl.fromTo(groupRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35 }, 0.25);
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            <Name ref={nameRef}>Evan Jaquez</Name>
            <SubText ref={subTextRef}>UX Researcher &amp; Designer</SubText>

            <ButtonGroup ref={groupRef} role="navigation" aria-label="Social links and navigation">
                {/* Row 1 — icon circles */}
                <IconRow>
                    <CircleButton
                        href="https://www.linkedin.com/in/evan-jaquez-118b5b294/"
                        target="_blank"
                        rel="noopener noreferrer"
                        $bgColor="#0077b5"
                        aria-label="Connect on LinkedIn"
                    >
                        <LinkedInIcon />
                    </CircleButton>

                    <CircleButton
                        href="https://www.github.com/jaquevan"
                        target="_blank"
                        rel="noopener noreferrer"
                        $bgColor="#24292e"
                        aria-label="View GitHub Profile"
                    >
                        <GitHubIcon />
                    </CircleButton>
                </IconRow>

                {/* Row 2 — Projects button */}
                <ProjectsWrapper
                    onMouseEnter={() => setHoveredProjects(true)}
                    onMouseLeave={() => setHoveredProjects(false)}
                >
                    <MonkeyImage
                        src="/Classic_dart_monkey.webp"
                        alt=""
                        $visible={hoveredProjects}
                    />
                    <ProjectsButton href="/projects" aria-label="View Projects">
                        <FolderIcon />
                        Projects
                    </ProjectsButton>
                </ProjectsWrapper>
            </ButtonGroup>
        </>
    );
}
