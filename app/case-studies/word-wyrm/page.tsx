'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import BackToProjects from "@/app/components/Projects/BackToProjects";
import NavBar from '@/app/components/NavBar';

// images
import team from '../../../public/word/team.png';
import problem from '../../../public/word/problem.png';
import persona from '../../../public/word/persona.png';
import interview from '../../../public/word/interview.png';
import hypothesis from '../../../public/word/hypothesis.png';
import validation from '../../../public/word/validation.png';
import crazy8 from '../../../public/word/crazy8.jpg';
import jobmap from '../../../public/word/jobmap.jpg';
import floop from '../../../public/word/floop.jpg';
import gaming from '../../../public/word/gaming-floopa.png';

const commonTextStyles = `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const element = ref.current;
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return { ref, isInView };
};



const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    ${commonTextStyles}
`;

const PrototypeButton = styled.a`
    display: inline-block;
    margin: 2rem auto 3rem;
    padding: 1rem 2.5rem;
    background: var(--text-primary, #333);
    color: var(--background, white);
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        opacity: 0.9;
    }

    @media (prefers-color-scheme: dark) {
        background: var(--text-primary, #e0e0e0);
        color: var(--background, #121212);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const HeroImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    width: 100%;
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: contain;
    }
`;

const Section = styled.section`
    margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 auto;
    padding-bottom: 0.5rem;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Paragraph = styled.p`
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--text-primary, #333);
    margin-bottom: 2rem;
    max-width: 70ch;

    @media (prefers-color-scheme: dark) {
        color: var(--text-primary, #e0e0e0);
    }
`;

const CenteredParagraph = styled(Paragraph)`
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    margin-bottom: 3.5rem;
`;

const DeliverableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
    max-width: 800px;
`;

const DeliverableTag = styled.span`
    background: var(--text-primary, #333);
    color: var(--background, white);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    @media (prefers-color-scheme: dark) {
        background: var(--text-primary, #e0e0e0);
        color: var(--background, #121212);
    }
`;

const Phase = styled.div`
    margin-bottom: 3rem;
`;

const PhaseTitle = styled.h3`
    font-size: 1.35rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary, #222);
`;

const CenteredPhaseTitle = styled(PhaseTitle)`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

const Grid = styled.div`
    display: grid;
    gap: 2rem;

    @media (min-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const ImageWrapper = styled.div`
    border-radius: 8px;

    img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const TeamSection = styled(Section)`
    text-align: center;
`;

const TeamDescription = styled.p`
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.125rem;
    line-height: 1.65;

    @media (prefers-color-scheme: dark) {
        color: var(--text-secondary, #b0b0b0);
    }
`;

const NextStepsSection = styled(Section)`
    padding: 3rem;
    text-align: center;
    background: linear-gradient(
            135deg,
            rgba(var(--primary-rgb, 0, 118, 255), 0.05) 0%,
            rgba(var(--primary-rgb, 0, 118, 255), 0.1) 100%
    );
    border: 1px solid rgba(var(--primary-rgb, 0, 118, 255), 0.1);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
                90deg,
                rgba(var(--primary-rgb, 0, 118, 255), 0.5),
                rgba(var(--primary-rgb, 0, 118, 255), 0.8)
        );
    }

    ${SectionTitle} {
        text-align: center;
        color: var(--text-primary);
        font-size: 2.4rem;
        margin-bottom: 1.5rem;
    }

    ${Paragraph} {
        margin: 0 auto;
        max-width: 600px;
        font-weight: 500;
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.8;
    }

    @media (prefers-color-scheme: dark) {
        background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.03) 0%,
                rgba(255, 255, 255, 0.05) 100%
        );
        border-color: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }
`;

const PrototypeLink = styled.a`
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.875rem 2rem;
    background: var(--text-primary, #333);
    color: var(--background, white);
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (prefers-color-scheme: dark) {
        background: var(--text-primary, #e0e0e0);
        color: var(--background, #121212);
    }
`;

const Citation = styled.figcaption`
    font-size: 0.9rem;
    color: var(--text-secondary, #666);
    text-align: center;
    margin-top: 0.5rem;
    font-style: italic;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (prefers-color-scheme: dark) {
        color: var(--text-secondary, #999);
    }
`;

const SlideImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto 4rem;
    width: 100%;
    max-width: 800px;

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.01);
        }
    }

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 0 1rem;
    }
`;

interface TitleWrapperProps {
    children: React.ReactNode;
}

const TitleWrapper: React.FC<TitleWrapperProps> = ({ children }) => {
    const { ref, isInView } = useInView();
    return (
        <SectionTitle ref={ref} className={isInView ? 'visible' : ''}>
            {children}
        </SectionTitle>
    );
};

export default function LearnWyrm() {
    return (
        <>
            <Container>
                <NavBar />
                <BackToProjects url="/projects" />

                <HeroImage>
                    <Image src={gaming} alt="LearnWyrm Gaming Dragon Mascot" priority />
                    <Citation>Mascot, Floopa, Gaming.</Citation>
                </HeroImage>

                <ButtonWrapper>
                    <PrototypeButton
                        href="https://word-wyrm.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Prototype
                    </PrototypeButton>
                </ButtonWrapper>

                <Section>
                    <TitleWrapper>Project Overview</TitleWrapper>
                    <CenteredParagraph>
                        LearnWyrm is an educational gaming platform designed to make learning
                        engaging and effective through gamification and AI-powered instruction. The project
                        focuses on transforming traditional learning methods into interactive,
                        memorable experiences that work for any subject or skill.
                    </CenteredParagraph>

                    <TitleWrapper>Deliverables</TitleWrapper>
                    <DeliverableContainer>
                        <DeliverableTag>Problem & Research</DeliverableTag>
                        <DeliverableTag>Hypothesis & Validation</DeliverableTag>
                        <DeliverableTag>Ideation</DeliverableTag>
                        <DeliverableTag>Journey Mapping</DeliverableTag>
                        <DeliverableTag>Feedback & Iteration</DeliverableTag>
                    </DeliverableContainer>
                </Section>

                <Section>
                    <Phase>
                        <CenteredPhaseTitle>Phase I: Problem & Research</CenteredPhaseTitle>

                        <SlideImage>
                            <Image src={problem} alt="Problem" />
                            <Citation>Initial problem space exploration and analysis</Citation>
                        </SlideImage>

                        <CenteredParagraph>
                            We began by defining the problem: traditional learning often relies on worksheets and drills that
                            are boring and passive. Through user interviews and persona development, we uncovered the
                            importance of intuitive design and the need to balance fun with measurable learning outcomes
                            across any subject area.
                        </CenteredParagraph>




                    </Phase>

                    <Phase>
                        <CenteredPhaseTitle>Interviews and User Research</CenteredPhaseTitle>

                        <SlideImage>
                            <Image src={interview} alt="User Interviews" />
                            <Citation>User interview insights and key findings from 10+ interviews</Citation>
                        </SlideImage>
                        <SlideImage>
                            <Image src={persona} alt="Persona" />
                            <Citation>Validated Earlyvangelist</Citation>
                        </SlideImage>


                        <CenteredPhaseTitle>Phase II: Hypothesis & Validation</CenteredPhaseTitle>
                        <CenteredParagraph>
                            Based on our research, we developed hypotheses about user behavior and classroom integration.
                            We conducted validation sessions with teachers and students to refine these assumptions,
                            ensuring we stayed grounded in real user needs.
                        </CenteredParagraph>
                        <SlideImage>
                        <Image src={validation} alt="Validation" />
                        <Citation>Validation session results and insights from using Reddit</Citation>
                        </SlideImage>
                            <SlideImage>
                                <Image src={hypothesis} alt="Hypothesis" />
                                <Citation>Key hypotheses and testing framework</Citation>
                            </SlideImage>


                    </Phase>

                    <Phase>
                        <CenteredPhaseTitle>Phase III: Ideation & Design Sprint</CenteredPhaseTitle>
                        <CenteredParagraph>
                            Using techniques like Crazy 8s brainstorming, we rapidly generated a wide range of solutions.
                            These sketches helped us explore both playful and practical ideas for gamifying learning practice.
                            We mapped user journeys to capture teacher and student workflows. This gave us visibility into
                            key pain points and opportunities where AI-powered gamification could enhance learning experiences
                            across different subjects and learning contexts.
                        </CenteredParagraph>
                        <Grid>
                            <ImageWrapper>
                                <Image src={crazy8} alt="Crazy 8s Ideation" />
                                <Citation>Rapid ideation sketches and concepts</Citation>
                            </ImageWrapper>
                            <ImageWrapper>
                                <Image src={jobmap} alt="Job Map" />
                                <Citation>User journey map highlighting key touchpoints</Citation>
                            </ImageWrapper>
                            <ImageWrapper>
                                <Image src={floop} alt="Feedback Loop" />
                                <Citation>Feedback implementation and iteration process</Citation>
                            </ImageWrapper>
                        </Grid>
                    </Phase>

                </Section>

                <TeamSection>
                    <SlideImage>
                        <Image src={team} alt="Project Team" />
                    </SlideImage>
                    <TeamDescription>
                        Our interdisciplinary team combines expertise in education technology, game design,
                        and learning science to create an effective solution.
                    </TeamDescription>
                </TeamSection>

                <NextStepsSection>
                    <TitleWrapper>Next Steps</TitleWrapper>
                    <Paragraph>
                        This project is currently in active development. Check out the live prototype below,
                        which is updated weekly with new features and improvements as we continue refining
                        the platform based on user feedback and testing.
                    </Paragraph>
                    <PrototypeLink
                        href="https://word-wyrm.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Live Prototype
                    </PrototypeLink>
                </NextStepsSection>
            </Container>
        </>
    );
}