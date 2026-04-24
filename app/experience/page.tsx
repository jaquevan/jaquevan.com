"use client";

import Nav from '@/app/components/NavBar';
import styled from 'styled-components';
import { Container } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import Image from 'next/image';

/* ── Layout ── */

const PageContent = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 2.5rem 0 6rem;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (max-width: 768px) { padding: 2rem 1.25rem 4rem; }
    @media (max-width: 480px) { padding: 1.5rem 1rem 3rem; }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0 0 1.5rem;
    flex-wrap: wrap;
`;

const PageTitle = styled.h1`
    font-family: var(--font-mono);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: var(--lh-tight);
`;

const ResumeButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 600;
    color: #fff;
    background: #00843D;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.9rem;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s ease, transform 0.2s ease;

    svg {
        font-size: 1rem;
    }

    &:hover {
        background: #007535;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const SectionHeading = styled.h2`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-secondary);
    margin: 3rem 0 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
`;

/* ── Timeline ── */

const EntryList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Entry = styled.div<{ $color: string }>`
    padding: 1.25rem 0 1.25rem 1.5rem;
    border-left: 2px solid ${p => p.$color}44;
    margin-left: 0.25rem;
    position: relative;

    /* Dot */
    &::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 1.6rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${p => p.$color};
        border: 2px solid var(--background);
    }
`;

/* ── Entry internals ── */

const EntryHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    flex-wrap: wrap;
    margin-bottom: 0.1rem;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.1rem;
    }
`;

const Company = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--text-primary);
    overflow-wrap: break-word;
    word-break: break-word;
    min-width: 0;
`;

const DateRange = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 480px) {
        white-space: normal;
    }
`;

const Role = styled.div`
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin-bottom: 0.1rem;
    font-family: var(--font-sans);
`;

const Location = styled.div`
    font-size: var(--text-xs);
    color: var(--text-secondary);
    opacity: 0.6;
    margin-bottom: 0.65rem;
    font-family: var(--font-mono);
`;

const BulletList = styled.ul`
    margin: 0.4rem 0 0.65rem;
    padding-left: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.28rem;

    li {
        font-size: var(--text-sm);
        line-height: var(--lh-normal);
        color: var(--text-secondary);
        font-family: var(--font-sans);
        overflow-wrap: break-word;
        word-break: break-word;
    }
`;

const ShortDesc = styled.p`
    font-size: var(--text-sm);
    line-height: var(--lh-normal);
    color: var(--text-secondary);
    font-family: var(--font-sans);
    margin: 0.4rem 0 0.65rem;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.4rem;
`;

const Tag = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    padding: 0.18rem 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    background: transparent;
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

const TechIcon = ({ name }: { name: string }) => (
    <div style={{ width: 12, height: 12, position: 'relative', flexShrink: 0 }}>
        <Image
            src={`/icons/${name.toLowerCase()}.svg`}
            alt={name}
            width={12}
            height={12}
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
            <Nav />
            <Container>
                <PageContent>

                    <TitleRow>
                        <PageTitle>Experience</PageTitle>
                        <ResumeButton
                            href="/Resume_Jaquez_SP26-3.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DescriptionIcon />
                            Resume
                        </ResumeButton>
                    </TitleRow>

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
