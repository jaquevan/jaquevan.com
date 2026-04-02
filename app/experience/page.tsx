"use client";

import Nav from '@/app/components/NavBar';
import styled from 'styled-components';
import { Container } from '@mui/material';
import Image from 'next/image';

/* ── Layout ── */

const NavWrapper = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const PageContent = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 3rem 0 5rem;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (max-width: 768px) {
        padding: 2rem 1.25rem 4rem;
    }

    @media (max-width: 480px) {
        padding: 1.5rem 1rem 3rem;
    }
`;

const PageTitle = styled.h1`
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    margin: 0 0 2.5rem;
`;

const SectionHeading = styled.h2`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-secondary);
    margin: 3rem 0 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
`;

/* ── Entry ── */

const EntryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`;

const Entry = styled.div<{ $color: string }>`
    padding: 1.5rem 0 1.5rem 1.25rem;
    border-left: 2px solid ${p => p.$color};
    margin-left: 0.25rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 1.75rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${p => p.$color};
        flex-shrink: 0;
    }

    & + & {
        border-top: none;
        margin-top: 0;
    }
`;

const EntryHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    flex-wrap: wrap;
    margin-bottom: 0.2rem;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.15rem;
    }
`;

const Company = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    overflow-wrap: break-word;
    word-break: break-word;
    min-width: 0;
`;

const DateRange = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-secondary);
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 480px) {
        white-space: normal;
        font-size: 0.7rem;
    }
`;

const Role = styled.div`
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.15rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Location = styled.div`
    font-size: 0.78rem;
    color: var(--text-secondary);
    opacity: 0.7;
    margin-bottom: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
`;

const BulletList = styled.ul`
    margin: 0.5rem 0 0.75rem;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    li {
        font-size: 0.875rem;
        line-height: 1.65;
        color: var(--text-secondary);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow-wrap: break-word;
        word-break: break-word;
    }
`;

const ShortDesc = styled.p`
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--text-secondary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0.5rem 0 0.75rem;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
`;

const Tag = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    background: transparent;
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

const TechIcon = ({ name }: { name: string }) => (
    <div style={{ width: 13, height: 13, position: 'relative', flexShrink: 0 }}>
        <Image
            src={`/icons/${name.toLowerCase()}.svg`}
            alt={name}
            width={13}
            height={13}
            style={{ objectFit: 'contain' }}
        />
    </div>
);

/* ── Color palette ── */
const C = {
    red:    '#CC0000',
    green:  '#00843D',
    indigo: '#4338CA',
    orange: '#ED8B00',
    blue:   '#003DA5',
    teal:   '#008080',
};

export default function ExperiencePage() {
    return (
        <>
            <NavWrapper><Nav /></NavWrapper>
            <Container>
                <PageContent>

                    <PageTitle>Experience</PageTitle>
                    <EntryList>

                        <Entry $color={C.red}>
                            <EntryHeader>
                                <Company>Red Hat</Company>
                                <DateRange>May – Aug 2026</DateRange>
                            </EntryHeader>
                            <Role>UX Research Intern</Role>
                            <Location>Raleigh, NC</Location>
                            <Tags>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                                <Tag>UX Research</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.green}>
                            <EntryHeader>
                                <Company>Boston University Spark!</Company>
                                <DateRange>Sep 2025 – Present</DateRange>
                            </EntryHeader>
                            <Role>UX Design Project Manager</Role>
                            <Location>Boston, MA</Location>
                            <BulletList>
                                <li>Lead three cross-functional UX research and design teams (12+ members) through agile sprints</li>
                                <li>Act as liaison between Spark! leadership, clients, and student designers</li>
                                <li>Provide structured feedback on wireframes, prototypes, and user research</li>
                            </BulletList>
                            <Tags>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                                <Tag><TechIcon name="slack" />Slack</Tag>
                                <Tag>Notion</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.indigo}>
                            <EntryHeader>
                                <Company>Faculty of Computing &amp; Data Sciences, BU</Company>
                                <DateRange>Dec 2025 – Present</DateRange>
                            </EntryHeader>
                            <Role>Teaching Assistant — XC475</Role>
                            <Location>Boston, MA · On-site</Location>
                            <Tags>
                                <Tag><TechIcon name="react" />React</Tag>
                                <Tag><TechIcon name="ts" />TypeScript</Tag>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.orange}>
                            <EntryHeader>
                                <Company>La Colaborativa</Company>
                                <DateRange>May – Aug 2025</DateRange>
                            </EntryHeader>
                            <Role>UI/UX Design &amp; Web Development Intern</Role>
                            <Location>Chelsea, MA</Location>
                            <BulletList>
                                <li>Designed and developed the EcoDev platform serving 3000+ community members</li>
                                <li>Built a Strapi-based CMS with Next.js, TypeScript, and Tailwind empowering non-technical staff</li>
                                <li>Created a two-month Digital Equity curriculum used in classes of 25+ community members</li>
                            </BulletList>
                            <Tags>
                                <Tag><TechIcon name="ts" />TypeScript</Tag>
                                <Tag><TechIcon name="next" />Next.js</Tag>
                                <Tag><TechIcon name="tw" />Tailwind</Tag>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                                <Tag>Strapi</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.green}>
                            <EntryHeader>
                                <Company>Boston University Spark!</Company>
                                <DateRange>Jan 2025 – Present</DateRange>
                            </EntryHeader>
                            <Role>UX Intern — Special Initiatives</Role>
                            <Location>Boston, MA</Location>
                            <BulletList>
                                <li>Designed Figma prototypes for MAPLE Testimony and Boston Voter — work presented to Massachusetts legislators</li>
                                <li>Conducted client onboarding interviews shaping how Spark! selects partner organizations</li>
                                <li>Led client scoping and research synthesized into project proposals adopted into Spark!&apos;s pipeline</li>
                            </BulletList>
                            <Tags>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                                <Tag><TechIcon name="mui" />Material UI</Tag>
                                <Tag><TechIcon name="react" />React</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.blue}>
                            <EntryHeader>
                                <Company>Blue Dev Digital</Company>
                                <DateRange>Aug 2024 – Present</DateRange>
                            </EntryHeader>
                            <Role>Front-End Developer &amp; UX Researcher</Role>
                            <Location>Boston, MA</Location>
                            <ShortDesc>
                                Conducted user research and interviews to guide UX/UI decisions. Developed web applications with React, Next.js, and Tailwind CSS.
                            </ShortDesc>
                            <Tags>
                                <Tag><TechIcon name="react" />React</Tag>
                                <Tag><TechIcon name="next" />Next.js</Tag>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                            </Tags>
                        </Entry>

                    </EntryList>

                    <SectionHeading>Volunteer &amp; Other</SectionHeading>

                    <EntryList>

                        <Entry $color={C.teal}>
                            <EntryHeader>
                                <Company>Boston University, College of Arts &amp; Sciences</Company>
                                <DateRange>Aug 2025 – Present</DateRange>
                            </EntryHeader>
                            <Role>Course Grader — CS411: Software Engineering</Role>
                            <Location>Boston, MA</Location>
                            <BulletList>
                                <li>Mentor 120+ students during weekly office hours on frontend and UX design</li>
                                <li>Grade group projects with 3,000+ lines of code with feedback on scalability and system design</li>
                            </BulletList>
                            <Tags>
                                <Tag><TechIcon name="react" />React</Tag>
                                <Tag><TechIcon name="ts" />TypeScript</Tag>
                                <Tag>CSS</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.teal}>
                            <EntryHeader>
                                <Company>Hack4Impact Boston University</Company>
                                <DateRange>May 2025 – Present</DateRange>
                            </EntryHeader>
                            <Role>UI/UX Designer</Role>
                            <Location>Boston, MA</Location>
                            <ShortDesc>
                                Redesigning the organization&apos;s website to improve navigation, accessibility, and visual consistency for 350+ club members.
                            </ShortDesc>
                            <Tags>
                                <Tag><TechIcon name="figma" />Figma</Tag>
                                <Tag>Miro</Tag>
                                <Tag><TechIcon name="tw" />Tailwind CSS</Tag>
                            </Tags>
                        </Entry>

                        <Entry $color={C.teal}>
                            <EntryHeader>
                                <Company>Our National Conversation</Company>
                                <DateRange>Jul 2024 – May 2025</DateRange>
                            </EntryHeader>
                            <Role>Software Engineer Intern</Role>
                            <Location>Remote, USA</Location>
                            <ShortDesc>
                                Implemented front-end interfaces and improved user engagement and accessibility across new sites using React and Python.
                            </ShortDesc>
                            <Tags>
                                <Tag><TechIcon name="react" />React</Tag>
                                <Tag><TechIcon name="vite" />Vite</Tag>
                                <Tag><TechIcon name="tw" />Tailwind CSS</Tag>
                            </Tags>
                        </Entry>

                    </EntryList>

                </PageContent>
            </Container>
        </>
    );
}
