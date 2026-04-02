"use client";

import styled from "styled-components";
import Terminal from "@/app/components/AboutMe/Terminal";
import AboutHero from "@/app/components/AboutMe/AboutHero";
import Background from "@/app/components/AboutMe/Background";
import Scroll from "@/app/components/AboutMe/Scroll";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    min-height: 100vh;
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    align-items: center;
    gap: 4rem;
    box-sizing: border-box; // include padding in width calculation

    @media screen and (max-width: 1024px) {
        gap: 3rem;
        padding: 1.5rem 1.5rem 3rem;
    }

    @media screen and (max-width: 768px) {
        gap: 2.5rem;
        padding: 1rem 1rem 2rem;
    }

    @media screen and (max-width: 480px) {
        gap: 2rem;
        padding: 1rem 0.5rem 2rem;
        width: 100%;
    }
`;

const TerminalSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box; // include padding in width calculation

    @media screen and (max-width: 768px) {
        width: 95%;
    }

    @media screen and (max-width: 480px) {
        width: 98%;
        padding: 0 0.5rem;
    }
`;

const ContentSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px) {
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
`;

export default function Main() {
    return (
        <PageWrapper>
            <HeroSection>
                <AboutHero />
                <TerminalSection>
                    <Terminal />
                </TerminalSection>
            </HeroSection>

            <ContentSection>
                <Background />
                <Scroll />
            </ContentSection>
        </PageWrapper>
    );
}