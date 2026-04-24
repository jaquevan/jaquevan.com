"use client";
import styled from "styled-components";
import Content from "@/app/components/Landing/Content";
import Buttons from "@/app/components/Landing/Buttons";
import DraggableTerminal from "@/app/components/Landing/DraggableTerminal";

const StyledBody = styled.div`
    overflow-x: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 1rem 0 0;
    min-height: 100vh;
    padding-bottom: env(safe-area-inset-bottom);

    @media (max-width: 768px) {
        padding: 0.5rem 0 0;
        padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
    }

    @media (max-width: 430px) {
        padding-bottom: calc(env(safe-area-inset-bottom) + 30px);
    }
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    width: min(90%, 1200px);
    margin: 0 auto;
    position: relative;
    flex: 1;
    font-family: monospace;

    @media (max-width: 1440px) {
        width: min(92%, 1200px);
    }

    @media (max-width: 1024px) {
        width: min(94%, 1000px);
    }

    @media (max-width: 768px) {
        width: 95%;
    }

    @media (max-width: 480px) {
        width: 96%;
    }

    @media (max-width: 375px) {
        width: 98%;
    }
`;

const MainContentArea = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    gap: 2rem;
    padding-bottom: 140px;

    @media (max-width: 1024px) {
        align-items: center;
        gap: 0.5rem;
        padding-bottom: 100px;
        padding-top: 0;
    }

    @media (max-width: 768px) {
        gap: 1rem;
        padding-bottom: 80px;
        padding-top: 0.5rem;
    }

    @media (max-width: 480px) {
        gap: 0.5rem;
        padding-bottom: 140px;
    }

    @media (max-width: 430px) {
        gap: 0.4rem;
        padding-bottom: 150px;
    }

    @media (max-width: 393px) {
        gap: 0.3rem;
        padding-bottom: 160px;
    }

    @media (max-width: 375px) {
        gap: 0.2rem;
        padding-bottom: 170px;
    }

    @media (max-width: 360px) {
        padding-bottom: 180px;
    }
`;

/* Left-side hero block with name, subtitle, buttons */
const HeroBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
    max-width: 500px;

    @media (min-height: 800px) {
        margin-top: 8vh;
    }

    @media (max-width: 1024px) {
        max-width: 100%;
        margin-top: 0;
    }
`;

const CityWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    pointer-events: none;
    line-height: 0;
`;

export default function Main() {
    return (
        <StyledBody>
            <MainSection>
                <MainContentArea>
                    <HeroBlock>
                        <Buttons />
                    </HeroBlock>

                    {/*
                        DraggableTerminal is position:fixed on desktop (escapes flow)
                        and position:relative on mobile (appears in flow after buttons)
                    */}
                    <DraggableTerminal />

                    <CityWrapper>
                        <Content />
                    </CityWrapper>
                </MainContentArea>
            </MainSection>
        </StyledBody>
    );
}
