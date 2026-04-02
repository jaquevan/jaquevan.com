'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

interface BackToProjectsProps {
    url?: string;
}

const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    margin-bottom: 24px;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #666;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &::before {
        content: '←';
        font-size: 16px;
        transition: transform 0.2s ease;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(0, 0, 0, 0.1);
        color: #333;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &::before {
            transform: translateX(-3px);
        }
    }

    &:active {
        transform: scale(0.98);
    }

    @media (prefers-color-scheme: dark) {
        background: rgba(30, 30, 30, 0.7);
        border-color: rgba(255, 255, 255, 0.1);
        color: #999;

        &:hover {
            background: rgba(40, 40, 40, 0.9);
            border-color: rgba(255, 255, 255, 0.15);
            color: #e0e0e0;
        }
    }

    &:focus {
        outline: 2px solid rgba(0, 0, 0, 0.2);
        outline-offset: 2px;
    }
`;


export default function BackToProjects({ url = '/case-studies' }: BackToProjectsProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(url);
    };

    return (
        <BackButton onClick={handleClick}>
            Back to Projects
        </BackButton>
    );
}