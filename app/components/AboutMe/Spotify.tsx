import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const SpotifyContainer = styled.div`
    width: 100%;
    max-width: 900px;
    height: 100%;
    padding: 2.5rem 2rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 30px var(--shadow);
    font-family: var(--font-sans);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid var(--border);
    backdrop-filter: blur(6px);
    animation: ${fadeIn} 0.6s ease-out;
    margin: 0 auto;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 1.5rem 1.5rem;
        border-radius: 12px;
        width: 90%;
    }

    @media (max-width: 480px) {
        padding: 1rem;
        border-radius: 8px;
        width: calc(100% - 2rem);
        max-width: calc(100% - 2rem);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
`;

const Title = styled.h1`
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.7rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    text-align: center;
    width: 100%;
    color: var(--text-primary);

    @media (max-width: 768px) {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.5rem;
    }
`;

const IframeWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;

    @media (max-width: 768px) {
        gap: 1rem;
    }

    @media (max-width: 480px) {
        gap: 0.8rem;
        padding: 0;
        width: 100%;
        box-sizing: border-box;
    }
`;

const ResponsiveIframe = styled.div`
    position: relative;
    width: 100%;
    max-width: 700px;
    height: 120px;
    overflow: hidden;
    border-radius: 12px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
        height: 100px;
        max-width: 100%;
    }

    @media (max-width: 480px) {
        height: 80px;
        max-width: 100%;
        border-radius: 8px;
        box-sizing: border-box;
    }
`;

const StyledIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    display: block;
    box-sizing: border-box;
`;

export default function SpotifyEmbed() {
    return (
        <SpotifyContainer>
            <Title>Current Favorite Albums</Title>
            <IframeWrapper>
                <ResponsiveIframe>
                    <StyledIframe
                        src="https://open.spotify.com/embed/album/4m2880jivSbbyEGAKfITCa?utm_source=generator&theme=0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </ResponsiveIframe>
                <ResponsiveIframe>
                    <StyledIframe
                        src="https://open.spotify.com/embed/album/3Gt7rOjcZQoHCfnKl5AkK7?utm_source=generator&theme=0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </ResponsiveIframe>
                <ResponsiveIframe>
                    <StyledIframe
                        src="https://open.spotify.com/embed/album/4iN6TmJM1UT4AWWnuC6Jfn?utm_source=generator&theme=0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </ResponsiveIframe>
                <ResponsiveIframe>
                    <StyledIframe
                        src="https://open.spotify.com/embed/album/5Dbax7G8SWrP9xyzkOvy2F?utm_source=generator&theme=0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </ResponsiveIframe>
            </IframeWrapper>
        </SpotifyContainer>
    );
}
