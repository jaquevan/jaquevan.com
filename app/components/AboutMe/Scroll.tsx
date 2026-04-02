"use client";

import styled from "styled-components";
import Drumline from "./Drumline";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;

    > * {
        flex: 1;
        min-height: 700px;
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        align-items: stretch;
        padding: 0 1rem;

        > * {
            flex: none;
            width: 100%;
            min-height: auto;
        }
    }

    @media screen and (max-width: 480px) {
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
        gap: 1.5rem;

        > * {
            flex: none;
            width: 100%;
            min-height: auto;
        }
    }
`;

const MusicContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 3rem auto;
    padding: 0 1rem;
    box-sizing: border-box;

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-family: var(--font-mono);
        font-weight: 700;
    }

    @media screen and (max-width: 768px) {
        margin: 2rem auto;
    }

    @media screen and (max-width: 480px) {
        padding: 0;
        margin: 1.5rem auto;
    }
`;

const EssenceText = styled.p`
    text-align: center;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.7;
    margin: 2rem auto 0;
    max-width: 800px;
    padding: 0 2rem;
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-style: italic;

    @media screen and (max-width: 768px) {
        margin: 1.5rem auto 0;
        padding: 0 1rem;
    }

    @media screen and (max-width: 480px) {
        margin: 1rem auto 0;
        font-size: 0.95rem;
    }
`;

export default function Scroll() {
    return (
        <>
            <MusicContainer>
                <FlexContainer>
                    {/* <SpotifyEmbed /> */}
                    <Drumline />
                </FlexContainer>
                <EssenceText>
                    I hope that gives you an essence of the type of person I am. I love projects, and I love working at making something better day by day.
                </EssenceText>
            </MusicContainer>
        </>
    );
}
