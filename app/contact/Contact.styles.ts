import styled, { keyframes } from 'styled-components';
import { FormGroup, Paper } from "@mui/material";

// const pulse = keyframes`
//     0% { transform: scale(1); }
//     50% { transform: scale(1.05); }
//     100% { transform: scale(1); }
// `;

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const ContentWrapper = styled.div`
    max-width: 800px;
    margin: 3rem auto;
    animation: ${fadeIn} 0.7s ease-out;
`;

export const SocialButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledDiv = styled(Paper)`
    width: 100%;
    padding: 2.5rem;
    background: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px, rgba(0, 0, 0, 0.07) 0px 0px 16px;
    border: 1px solid #f0f0f0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px;
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }
`;

export const Title = styled.h1`
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    font-family: 'JetBrains Mono', monospace;
    text-align: center;
    color: #3a46a7;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, #4361ee, #3a46a7);
        border-radius: 3px;
    }

    @media (max-width: 600px) {
        font-size: 2.25rem;
    }
`;

export const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 2rem;
    width: 100%;
    max-width: 600px;
`;

export const InputRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 0.5rem;
`;

export const TextInput = styled.input`
    width: 100%;
    padding: 0.9rem 1.1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    transition: all 0.2s ease;
    background-color: #f9fafc;

    &:hover {
        border-color: #4361ee;
        background-color: white;
    }

    &:focus {
        outline: none;
        border-color: #4361ee;
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
        background-color: white;
    }
`;

export const Selections = styled(FormGroup)`
    background: #f9fafc;
    padding: 1.2rem;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    width: 100%;
    transition: all 0.2s ease;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    &:hover {
        border-color: rgba(67, 97, 238, 0.5);
        background-color: white;
    }

    .MuiFormControlLabel-root {
        margin: 0.3rem;

        .MuiCheckbox-root {
            color: #4361ee;
            padding: 6px;
        }

        .MuiTypography-root {
            font-family: var(--font-sans);
            font-size: var(--text-base);
            color: #4b5563;
        }
    }
`;

export const MessageInput = styled.textarea`
    width: 100%;
    height: 160px;
    padding: 1rem 1.1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    resize: vertical;
    transition: all 0.2s ease;
    background-color: #f9fafc;

    &:hover {
        border-color: #4361ee;
        background-color: white;
    }

    &:focus {
        outline: none;
        border-color: #4361ee;
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
        background-color: white;
    }
`;

export const SendButton = styled.button`
    padding: 1rem 2.5rem;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #4361ee, #3a46a7);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 1rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;

    svg {
        font-size: 1.2rem;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
    }

    &:active {
        transform: translateY(-1px);
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100%);
        background-size: 200% 100%;
        opacity: 0;
        transition: opacity 0.3s ease;
        animation: ${shimmer} 2s infinite;
    }

    &:hover::after {
        opacity: 1;
    }
`;

export const SocialButton = styled.a<{ $gradient?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
    background: ${props => props.$gradient || "linear-gradient(135deg, #2c3e50, #4c6b8a)"};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    &:hover, &:focus {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(-2px) scale(1.05);
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 2;
`;