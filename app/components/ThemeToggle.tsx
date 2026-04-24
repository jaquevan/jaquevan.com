"use client"

import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const spinOnce = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
`;

const ToggleButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    color: var(--text-primary);
    border: 2px solid var(--border);
    cursor: pointer;
    z-index: 1000;
    transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;

    &:hover {
        transform: scale(1.07);
        background: forestgreen;
        box-shadow: 0 4px 12px rgba(0, 100, 0, 0.25);

        ${IconWrapper} {
            animation: ${spinOnce} 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
    }

    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
        border-width: 1.5px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
        &:hover { transform: scale(1.04); }
    }

    @media (max-width: 375px) {
        width: 28px;
        height: 28px;
        border-width: 1px;
    }
`;

export default function ThemeToggle() {
    const { isDarkMode, toggleTheme, mounted } = useTheme();

    return (
        <ToggleButton onClick={toggleTheme} aria-label="Toggle theme" suppressHydrationWarning>
            <IconWrapper>
                {mounted ? (
                    isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />
                ) : (
                    <DarkModeIcon fontSize="small" />
                )}
            </IconWrapper>
        </ToggleButton>
    );
}