"use client";
import styled, { keyframes } from "styled-components";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
    width: 100%;
    max-width: 360px;
    margin: 0 auto 0;
    padding: 1rem;
    position: relative;
    z-index: 40;
    animation: ${fadeIn} 0.6s ease-out;
    text-align: center;

    @media (max-width: 1024px) {
        margin: 0 auto 0;
        max-width: 85%;
        text-align: center;
        padding: 0.4rem;
    }

    @media (max-width: 768px) {
        margin-top: 0.25rem;
        max-width: 95%;
        padding: 0.3rem;
        text-align: center;
    }

    @media (max-width: 600px) {
        margin: 0.2rem auto 0;
        padding: 0.25rem;
    }

    @media (max-width: 480px) {
        max-width: 98%;
        padding: 0.2rem;
        margin: 0.15rem auto 0;
    }

    @media (max-width: 375px) {
        max-width: 100%;
        padding: 0.15rem;
        margin: 0.1rem auto 0;
    }

    @media (max-width: 320px) {
        max-width: 100%;
        padding: 0.1rem;
        margin: 0.08rem auto 0;
    }
`;

const Card = styled.div`
    padding: 1.5rem;
    border-radius: 12px;
    background: rgba(18, 18, 18, 0.6);
    backdrop-filter: blur(10px);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    @media (max-width: 1024px) {
        padding: 0.8rem;
        border-radius: 10px;
    }

    @media (max-width: 768px) {
        padding: 1rem;
    }

    @media (max-width: 600px) {
        padding: 0.75rem;
        border-radius: 8px;
    }

    @media (max-width: 480px) {
        padding: 0.65rem;
        border-radius: 8px;
    }

    @media (max-width: 375px) {
        padding: 0.6rem;
        border-radius: 6px;
    }

    @media (max-width: 320px) {
        padding: 0.5rem;
        border-radius: 6px;
    }
`;

const Title = styled.h3`
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: #fff;
    margin: 0 0 1rem;
    font-weight: 500;
    font-family: var(--font-mono);

    @media (max-width: 1024px) {
        font-size: clamp(0.9rem, 2.3vw, 1.05rem);
        margin: 0 0 0.6rem;
    }

    @media (max-width: 600px) {
        font-size: clamp(0.85rem, 2.2vw, 1rem);
        margin: 0 0 0.6rem;
    }

    @media (max-width: 480px) {
        font-size: clamp(0.8rem, 2vw, 0.95rem);
        margin: 0 0 0.5rem;
    }

    @media (max-width: 375px) {
        font-size: clamp(0.75rem, 1.8vw, 0.9rem);
        margin: 0 0 0.45rem;
    }
`;

const ViewButton = styled(Button)`
    && {
        background-color: transparent;
        color: #ffffff;
        padding: 0.6rem 1.5rem;
        font-size: 0.95rem;
        font-weight: 500;
        text-transform: none;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        font-family: var(--font-mono);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
            background-color: transparent;
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .MuiSvgIcon-root {
            margin-right: 8px;
            font-size: 1.1rem;
        }

        @media (max-width: 1024px) {
            padding: 0.5rem 1.1rem;
            font-size: 0.85rem;

            .MuiSvgIcon-root {
                font-size: 1rem;
                margin-right: 6px;
            }
        }

        @media (max-width: 768px) {
            padding: 0.5rem 1.2rem;
            font-size: 0.9rem;
        }

        @media (max-width: 480px) {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;

            .MuiSvgIcon-root {
                font-size: 1rem;
                margin-right: 6px;
            }
        }

        @media (max-width: 375px) {
            padding: 0.45rem 0.9rem;
            font-size: 0.8rem;

            .MuiSvgIcon-root {
                font-size: 0.95rem;
                margin-right: 5px;
            }
        }
    }
`;

export default function ResumeCard() {
    const handleOpenResume = () => {
        window.open("/Resume_Jaquez_Fa25.pdf", '_blank', 'noopener,noreferrer');
    };

    return (
        <Container>
            <Card>
                <Title>Want to see my resume?</Title>
                <ViewButton
                    onClick={handleOpenResume}
                    variant="contained"
                    startIcon={<DescriptionIcon />}
                >
                    click here
                </ViewButton>
            </Card>
        </Container>
    );
}