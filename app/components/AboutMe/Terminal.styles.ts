import styled, { keyframes } from "styled-components";

export type ThemeColors = {
    bg: string;
    headerBg: string;
    prompt: string;
    text: string;
    green: string;
    error: string;
    scrollbar: string;
    border: string;
    dim: string;
};

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

export const TerminalContainer = styled.div<{ $theme: ThemeColors }>`
    width: 85%;
    max-width: 820px;
    height: 460px;
    position: relative;
    font-family: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
    cursor: text;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    font-size: 0.82rem;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3);

    /* Theme CSS variables for children */
    --t-bg: ${p => p.$theme.bg};
    --t-header: ${p => p.$theme.headerBg};
    --t-prompt: ${p => p.$theme.prompt};
    --t-text: ${p => p.$theme.text};
    --t-green: ${p => p.$theme.green};
    --t-error: ${p => p.$theme.error};
    --t-scrollbar: ${p => p.$theme.scrollbar};
    --t-border: ${p => p.$theme.border};
    --t-dim: ${p => p.$theme.dim};

    background-color: var(--t-bg);
    border: 1px solid var(--t-border);
    color: var(--t-text);
    transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

    @media (max-width: 1024px) {
        width: 92%;
        height: 420px;
        font-size: 0.78rem;
    }

    @media (max-width: 768px) {
        width: 96%;
        height: 370px;
        font-size: 0.73rem;
    }

    @media (max-width: 480px) {
        width: 98%;
        height: 320px;
        font-size: 0.67rem;
        border-radius: 8px;
    }
`;

export const TerminalHeader = styled.div`
    height: 38px;
    min-height: 38px;
    background-color: var(--t-header);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: 1px solid var(--t-border);
    user-select: none;
`;

export const TrafficDots = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`;

export const TrafficDot = styled.button<{ $color: string; $hoverAction?: boolean }>`
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: ${p => p.$color};
    border: none;
    cursor: ${p => p.$hoverAction ? 'pointer' : 'default'};
    padding: 0;
    transition: filter 0.15s ease, transform 0.1s ease;
    flex-shrink: 0;

    &:hover {
        filter: ${p => p.$hoverAction ? 'brightness(1.2)' : 'brightness(0.85)'};
        transform: ${p => p.$hoverAction ? 'scale(1.1)' : 'none'};
    }
`;

export const HeaderTitle = styled.span<{ $left?: boolean }>`
    font-size: 0.72rem;
    color: var(--t-dim);
    letter-spacing: 0.02em;
    font-family: inherit;
    pointer-events: none;
    ${p => p.$left ? '' : `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    `}
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ThemeSwatches = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const ThemeSwatch = styled.button<{ $color: string; $active: boolean }>`
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${p => p.$color};
    border: ${p => p.$active ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent'};
    cursor: pointer;
    padding: 0;
    transition: transform 0.15s ease, border-color 0.15s ease;

    &:hover {
        transform: scale(1.25);
    }
`;

export const IconButton = styled.button`
    background: transparent;
    border: none;
    color: var(--t-dim);
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
        color: var(--t-text);
        background: rgba(255,255,255,0.08);
    }

    svg {
        width: 14px;
        height: 14px;
    }
`;

export const TerminalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    padding: 12px 16px 8px;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--t-scrollbar);
        opacity: 0.4;
        border-radius: 2px;
    }

    scrollbar-width: thin;
    scrollbar-color: var(--t-scrollbar) transparent;
`;

export const TerminalLine = styled.div`
    display: flex;
    flex-wrap: wrap;
    line-height: 1.65;
    animation: ${fadeIn} 0.2s ease-out;
`;

export const PromptSpan = styled.span`
    color: var(--t-prompt);
    font-weight: 600;
    white-space: pre;
    flex-shrink: 0;
    transition: color 0.25s ease;
`;

export const OutputText = styled.span<{ isError?: boolean }>`
    white-space: pre-wrap;
    color: ${props => props.isError ? 'var(--t-error)' : 'var(--t-text)'};
    animation: ${fadeIn} 0.25s ease-out;
    transition: color 0.25s ease;
    word-break: break-word;
`;

export const InputLine = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
`;

export const InputField = styled.input`
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--t-text);
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
    caret-color: var(--t-prompt);

    &::selection {
        background: var(--t-prompt);
        color: var(--t-bg);
        opacity: 0.3;
    }
`;

export const Cursor = styled.span`
    display: inline-block;
    width: 1px;
    height: 1em;
    background-color: var(--t-prompt);
    margin-left: 1px;
    animation: ${blink} 1.1s step-end infinite;
    vertical-align: text-bottom;
`;

export const AsciiArt = styled.pre`
    font-size: 0.72rem;
    white-space: pre;
    line-height: 1.3;
    margin: 2px 0;
    color: var(--t-prompt);
    font-family: inherit;
    animation: ${fadeIn} 0.4s ease-in;
    overflow-x: auto;

    @media (max-width: 480px) {
        font-size: 0.58rem;
    }
`;

export const CopiedToast = styled.span`
    font-size: 0.68rem;
    color: var(--t-green);
    animation: ${fadeIn} 0.2s ease;
`;
