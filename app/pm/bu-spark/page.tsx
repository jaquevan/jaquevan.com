'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import BackToProjects from "@/app/components/Projects/BackToProjects";
import NavBar from '@/app/components/NavBar';
import { Grid } from "@mui/material";

const commonTextStyles = `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    ${commonTextStyles}
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
    font-family: 'JetBrains Mono', monospace;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #666;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
    line-height: 1.6;

    @media (max-width: 600px) {
        font-size: 1rem;
        margin-bottom: 3rem;
    }
`;

const ProjectsSection = styled.section`
    margin: 3rem 0;
`;

const ProjectCard = styled.div`
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
`;

interface ImageContainerProps {
    $hasImage: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
    position: relative;
    width: 100%;
    height: 200px;
    background: ${props => props.$hasImage ? "transparent" : "#00843D"};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceholderText = styled.div`
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
    font-family: 'JetBrains Mono', monospace;
`;

const Content = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ProjectTitle = styled.h3`
    margin: 0 0 0.75rem 0;
    font-weight: 700;
    color: #3a46a7;
    font-size: 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.3;
`;

const Description = styled.p`
    margin: 0 0 1.25rem 0;
    color: #555;
    line-height: 1.6;
    font-size: 0.95rem;
    flex-grow: 1;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const Tag = styled.span`
    background: #f0f0f0;
    color: #555;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'JetBrains Mono', monospace;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

interface LinkButtonProps {
    $primary?: boolean;
}

const LinkButton = styled.a<LinkButtonProps>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.2s ease;
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;

    ${props => props.$primary ? `
        background-color: #00843D;
        color: white;
        &:hover {
            background-color: #006d31;
        }
    ` : `
        color: #333;
        border: 1px solid #e0e0e0;
        background: white;
        &:hover {
            border-color: #00843D;
            color: #00843D;
        }
    `}
`;

const projects = [
    {
        id: 1,
        title: 'BlackFacts Redesign',
        description: 'UX redesign project for BlackFacts, an educational platform highlighting Black history and achievements. Focused on improving navigation, accessibility, and user engagement.',
        tags: ['UX Design', 'Accessibility', 'Civic Tech'],
        figma: 'https://www.figma.com/design/AhBrI7O6xXK7IDZM9Q2bZy/BlackFacts-Designs?node-id=0-1&t=VyXv1vxpVJUQEwMR-1'
    },
    {
        id: 2,
        title: 'UniteBoston BIRD',
        description: 'Designing the Boston Immigrant Resources Database (BIRD) platform to help immigrants and refugees access essential services and community resources across Boston.',
        tags: ['UX Design', 'Community Impact', 'Social Good'],
        figma: 'https://www.figma.com/design/OG74bRb9Ps4hVSCJSr64u8/Unite-Boston-Designs?node-id=0-1&t=gNhREjpRDXdEb0Td-1'
    }
];

export default function BUSpark() {
    return (
        <>
            <Container>
                <NavBar />
                <BackToProjects url="/projects" />

                <Title>Boston University Spark!</Title>
                <Subtitle>
                    As a UX Design Project Manager at BU Spark!, I led design teams working on civic tech
                    projects that create meaningful impact for underserved communities.
                </Subtitle>

                <ProjectsSection>
                    <Grid container spacing={3}>
                        {projects.map((project) => (
                            <Grid item xs={12} sm={6} key={project.id}>
                                <ProjectCard>
                                    <ImageContainer $hasImage={false}>
                                        <PlaceholderText>BU Spark!</PlaceholderText>
                                    </ImageContainer>
                                    <Content>
                                        <ProjectTitle>{project.title}</ProjectTitle>
                                        <Description>{project.description}</Description>
                                        <TagsContainer>
                                            {project.tags.map((tag, index) => (
                                                <Tag key={index}>{tag}</Tag>
                                            ))}
                                        </TagsContainer>
                                        <ActionContainer>
                                            {project.figma && (
                                                <LinkButton
                                                    $primary
                                                    href={project.figma}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Figma
                                                </LinkButton>
                                            )}
                                        </ActionContainer>
                                    </Content>
                                </ProjectCard>
                            </Grid>
                        ))}
                    </Grid>
                </ProjectsSection>
            </Container>
        </>
    );
}
