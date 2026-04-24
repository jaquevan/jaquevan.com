"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled, { keyframes, css } from "styled-components";

// Assets
import Train from "@/public/t.svg";
import City from "@/public/city.png";

// Animation keyframes
const moveTrain = keyframes`
    0% {
        transform: translateX(-100%);
    }
    15% {
        transform: translateX(-60%);
    }
    50% {
        transform: translateX(10%);
    }
    85% {
        transform: translateX(8%);
    }
    100% {
        transform: translateX(100%);
    }
`;

const hop = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
`;

const TrackContainer = styled.div`
    position: relative;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-top: -120px;
    margin-bottom: 0;
    padding-bottom: 0;
    /*
     * city.png is 2937×532 — aspect ratio ≈ 5.52:1.
     * background-size: 100% auto scales the image to the full container width
     * and lets the height follow proportionally, so the top is never cropped.
     * Height = 100vw × (532/2937) ≈ 18.12vw; we add a small buffer → 19vw.
     */
    height: clamp(120px, 19vw, 460px);
    background: url(${City.src}) no-repeat center bottom;
    background-size: 100% auto;
    overflow: visible;
    display: block;
    line-height: 0;
    font-size: 0;
    z-index: 1;

    @media (max-width: 1024px) {
        margin-top: 0;
    }
`;

const TrainContainer = styled.div`
    position: absolute;
    bottom: 0; // train sits on the city floor
    left: 0;
    display: flex;
    align-items: flex-end; // aligns train to bottom of container
    justify-content: flex-start;
    width: 100%;
    animation: ${moveTrain} 10s ease-out infinite; // train animation movement
    will-change: transform;
    z-index: 5; // keeps train above city background
    pointer-events: none;
    padding-bottom: 2px; // tiny padding for visual refinement

    @media (max-width: 1024px) {
        bottom: 0; // consistent floor placement on all screen sizes
    }
`;


const TrainHitBox = styled.div<{
    $isAnimating: boolean;
}>`
    display: flex;
    align-items: flex-end;
    pointer-events: auto;
    position: relative;
    transform-origin: bottom center;
    padding: 10px;
    margin: -10px;
    will-change: transform;

    ${props => props.$isAnimating && css`
        animation: ${hop} 0.4s cubic-bezier(0.33, 1, 0.68, 1);
    `}
`;

const TrainImageWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    pointer-events: none;
`;

const TrainImage = styled(Image)`
    width: 20vw; // responsive train car width based on viewport
    max-width: 250px; // maximum train car size
    height: auto;
    margin-right: -1px; // connects train cars seamlessly

    @media (max-width: 1200px) {
        width: 22vw; // slightly wider on medium screens
        max-width: 220px;
    }

    @media (max-width: 768px) {
        width: 22vw; // smaller on tablets
        max-width: 100px; // much smaller to fit container
    }

    @media (max-width: 480px) {
        width: 20vw; // smaller for phones
        max-width: 80px; // much smaller max
    }

    @media (max-width: 375px) {
        width: 18vw; // smaller for small phones
        max-width: 70px; // smaller to fit container
    }

    @media (max-width: 320px) {
        width: 16vw; // smallest for tiny screens
        max-width: 60px; // smallest max
    }
`;

export default function TrainAnimation() {
    const [trainCount, setTrainCount] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Adjust number of train cars based on screen width
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1200) {
                setTrainCount(4);
            } else {
                setTrainCount(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleHover = () => {
        setIsAnimating(false);
        // Force reflow to restart animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        });
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
    };

    return (
        <TrackContainer aria-label="Animated train scene with city background">
            <TrainContainer>
                <TrainHitBox
                    $isAnimating={isAnimating}
                    onMouseEnter={handleHover}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <TrainImageWrapper>
                        {[...Array(trainCount)].map((_, index) => (
                            <TrainImage
                                key={`train-car-${index}`}
                                src={Train}
                                alt={`Boston T Train Car ${index + 1}`}
                                priority={index === 0}
                            />
                        ))}
                    </TrainImageWrapper>
                </TrainHitBox>
            </TrainContainer>
        </TrackContainer>
    );
}