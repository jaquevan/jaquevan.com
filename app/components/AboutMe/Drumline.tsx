"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import snare from "@/public/snareline.png";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const Card = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--background);
    box-shadow: 0 8px 32px var(--shadow);
    display: grid;
    grid-template-columns: 1fr 1fr;
    animation: ${fadeUp} 0.5s ease-out;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 16px 48px var(--shadow);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        max-width: 560px;
        width: 95vw;
    }
`;

const ImagePanel = styled.div`
    position: relative;
    overflow: hidden;
    background: #000;
    cursor: pointer;

    &::after {
        content: '▶ Watch';
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        background: rgba(0, 0, 0, 0.45);
        opacity: 0;
        transition: opacity 0.25s ease;
        letter-spacing: 0.05em;
    }

    &:hover::after {
        opacity: 1;
    }

    &:hover img {
        transform: scale(1.04);
        filter: brightness(0.7);
    }

    @media (max-width: 768px) {
        min-height: 240px;
    }
`;

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease, filter 0.4s ease;
`;

const ContentPanel = styled.div`
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        padding: 2rem;
    }

    @media (max-width: 768px) {
        padding: 1.75rem 1.5rem;
    }
`;

const Label = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--secondary);
    font-weight: 600;
`;

const Title = styled.h2`
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(1.6rem, 2.5vw, 2rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
    background: linear-gradient(
        120deg,
        var(--text-primary) 40%,
        var(--secondary) 60%,
        var(--text-primary) 80%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    &:hover {
        animation: ${shimmer} 1.2s linear;
    }
`;

const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Chip = styled.span<{ $accent?: boolean }>`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1px solid ${p => p.$accent ? 'var(--secondary)' : 'var(--border)'};
    color: ${p => p.$accent ? 'var(--secondary)' : 'var(--text-secondary)'};
    background: ${p => p.$accent ? 'color-mix(in srgb, var(--secondary) 10%, transparent)' : 'transparent'};
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: var(--secondary);
        color: var(--secondary);
        background: color-mix(in srgb, var(--secondary) 10%, transparent);
    }
`;

const Description = styled.p`
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const WatchButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    width: fit-content;
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-primary);
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, gap 0.2s ease;

    &:hover {
        border-color: var(--secondary);
        color: var(--secondary);
        background: color-mix(in srgb, var(--secondary) 8%, transparent);
        gap: 0.9rem;
    }

    svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        fill: currentColor;
    }
`;

export default function Drumline() {
    return (
        <Card>
            <ImagePanel
                as="a"
                href="https://www.dropbox.com/scl/fi/bs1y1aj5300waev1ym5u3/1007252049.mp4?rlkey=rimy37xlmgo6kv28oskwdrrij&st=oavly9sq&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch BU Drumline performance"
            >
                <StyledImage
                    src={snare}
                    alt="BU Snare drum line performance"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </ImagePanel>

            <ContentPanel>
                <Label>extracurricular</Label>

                <Title>BU Drumline</Title>

                <Chips>
                    <Chip>Bass Drum &middot; &apos;23&ndash;&apos;24</Chip>
                    <Chip $accent>Snare &middot; &apos;24&ndash;present</Chip>
                    <Chip>Marching Band</Chip>
                </Chips>

                <Description>
                    No prior drumming experience before college &mdash; I worked my way onto
                    snare line from scratch. Switching instruments at a competitive level
                    is one of my proudest achievements, and it&apos;s taught me more about
                    discipline and teamwork than almost anything else.
                </Description>

                <WatchButton
                    href="https://www.dropbox.com/scl/fi/bs1y1aj5300waev1ym5u3/1007252049.mp4?rlkey=rimy37xlmgo6kv28oskwdrrij&st=oavly9sq&dl=0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Performance
                </WatchButton>
            </ContentPanel>
        </Card>
    );
}
