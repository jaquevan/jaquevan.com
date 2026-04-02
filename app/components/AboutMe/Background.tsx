"use client";

import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.section`
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
    animation: ${fadeUp} 0.5s ease-out;
`;

const SectionLabel = styled.p`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-secondary);
    margin: 0 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 1.5rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--border);
    align-items: start;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 0.4rem;
    }
`;

const RowLabel = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    padding-top: 0.15rem;
    flex-shrink: 0;
`;

const RowContent = styled.div<{ $emphasis?: boolean }>`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: ${p => p.$emphasis ? '0.925rem' : '0.875rem'};
    line-height: 1.7;
    color: ${p => p.$emphasis ? 'var(--text-primary)' : 'var(--text-secondary)'};
    font-weight: ${p => p.$emphasis ? '500' : '400'};
`;

const LocationLine = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.15rem;
`;

const LocationSub = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text-secondary);
`;

export default function Background() {
    return (
        <Wrapper>
            <SectionLabel>about me</SectionLabel>

            <Row>
                <RowLabel>Based in</RowLabel>
                <RowContent>
                    <LocationLine>Boston, MA</LocationLine>
                    <LocationSub>& Danbury, CT</LocationSub>
                </RowContent>
            </Row>

            <Row>
                <RowLabel>Heritage</RowLabel>
                <RowContent>
                    Dominican-American. My family is from the Dominican Republic — that culture
                    and community have shaped how I think about design, people, and what technology
                    should be built for.
                </RowContent>
            </Row>

            <Row>
                <RowLabel>First Gen</RowLabel>
                <RowContent $emphasis>
                    I will be the first person in my family to graduate college. I don&apos;t take
                    that lightly — every opportunity I have is a reflection of the sacrifices my
                    family has made.
                </RowContent>
            </Row>
        </Wrapper>
    );
}
