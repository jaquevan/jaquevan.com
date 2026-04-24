"use client";

import React, { useState, useEffect, useRef } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import {
    TerminalContainer,
    TerminalContent,
    TerminalLine,
    PromptSpan,
    OutputText,
    TerminalHeader,
    HeaderTitle,
    HeaderActions,
    ThemeSwatches,
    ThemeSwatch,
    IconButton,
    InputField,
    InputLine,
    AsciiArt,
    CopiedToast,
    ThemeColors,
} from './Terminal.styles';

type CommandResult = {
    text: string;
    isCommand?: boolean;
    isAsciiArt?: boolean;
    isError?: boolean;
    frames?: string[];
    frameDelay?: number;
};

type CommandOutput =
    | string
    | { text: string; isAsciiArt?: boolean }
    | { frames: string[]; frameDelay?: number }
    | void;

function AnimatedAscii({ frames, delay = 420 }: { frames: string[]; delay?: number }) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % frames.length), delay);
        return () => clearInterval(t);
    }, [frames, delay]);
    return <AsciiArt>{frames[idx]}</AsciiArt>;
}

type ThemeName = 'dracula' | 'tokyo' | 'gruvbox' | 'nord' | 'matrix';

const THEMES: Record<ThemeName, ThemeColors & { swatch: string }> = {
    dracula: {
        bg: '#1e1e2e',
        headerBg: '#181825',
        prompt: '#cba6f7',
        text: '#cdd6f4',
        green: '#a6e3a1',
        error: '#f38ba8',
        scrollbar: '#585b70',
        border: 'rgba(205,214,244,0.1)',
        dim: 'rgba(205,214,244,0.4)',
        swatch: '#cba6f7',
    },
    tokyo: {
        bg: '#1a1b26',
        headerBg: '#16161e',
        prompt: '#7aa2f7',
        text: '#a9b1d6',
        green: '#9ece6a',
        error: '#f7768e',
        scrollbar: '#414868',
        border: 'rgba(122,162,247,0.12)',
        dim: 'rgba(169,177,214,0.4)',
        swatch: '#7aa2f7',
    },
    gruvbox: {
        bg: '#282828',
        headerBg: '#1d2021',
        prompt: '#d79921',
        text: '#ebdbb2',
        green: '#b8bb26',
        error: '#fb4934',
        scrollbar: '#504945',
        border: 'rgba(235,219,178,0.1)',
        dim: 'rgba(235,219,178,0.35)',
        swatch: '#d79921',
    },
    nord: {
        bg: '#2e3440',
        headerBg: '#242933',
        prompt: '#88c0d0',
        text: '#d8dee9',
        green: '#a3be8c',
        error: '#bf616a',
        scrollbar: '#4c566a',
        border: 'rgba(216,222,233,0.1)',
        dim: 'rgba(216,222,233,0.35)',
        swatch: '#88c0d0',
    },
    matrix: {
        bg: '#0c0c0c',
        headerBg: '#080808',
        prompt: '#00ff41',
        text: '#00cc35',
        green: '#00ff41',
        error: '#ff4444',
        scrollbar: '#003d10',
        border: 'rgba(0,255,65,0.15)',
        dim: 'rgba(0,204,53,0.4)',
        swatch: '#00ff41',
    },
};

const THEME_ORDER: ThemeName[] = ['dracula', 'tokyo', 'gruvbox', 'nord', 'matrix'];

const PROMPT = 'evan@portfolio ~$ ';

export default function Terminal() {
    const [input, setInput] = useState('');
    const [theme, setTheme] = useState<ThemeName>('nord');
    const [history, setHistory] = useState<CommandResult[]>([
        { text: "type 'help' for available commands.", isCommand: false },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [showCopied, setShowCopied] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, (args: string[]) => CommandOutput> = {
        help: () =>
            "  whoami      about me\n" +
            "  education   degree & coursework\n" +
            "  experience  work history\n" +
            "  skills      tech stack\n" +
            "  activities  extracurriculars\n" +
            "  contact     links\n" +
            "  open        open [github|linkedin]\n" +
            "  theme       switch theme [dracula|tokyo|gruvbox|nord|matrix]\n" +
            "  buddy       say hi\n" +
            "  flip        .\n" +
            "  clear       clear terminal",

        whoami: () =>
            " evan jaquez\n" +
            " cs + economics, boston university ('26)\n" +
            " ux researcher & frontend dev\n" +
            " incoming ux research intern @ red hat  —  summer '26\n",

        education: () =>
            " boston university  2023–2026\n" +
            "   b.s. computer science & economics\n" +
            "   minor: data science\n\n" +
            " coursework\n" +
            "   web & app dev  ·  software engineering\n" +
            "   advanced algorithms  ·  ux design practicum\n",

        experience: () =>
            " red hat              ux research intern     summer '26\n" +
            " bu spark!            ux design pm           fall '25 –\n" +
            " bu focd              teaching assistant     dec '25 –\n" +
            " la colaborativa      ui/ux & web dev        summer '25\n" +
            " bu spark!            ux intern              spring '25 –\n" +
            " blue dev digital     frontend dev & ux      fall '24 –\n",

        skills: () =>
            " languages    js  ts  python  java  c\n" +
            " frontend     react  next.js  tailwind  mui\n" +
            " backend      node  express  flask  firebase\n" +
            " db           mongodb  postgresql\n" +
            " tools        figma  git  docker  vercel  aws\n",

        activities: () =>
            " bu drumline & marching band\n" +
            "   bass  fall '23 – fall '24\n" +
            "   snare  spring '24 – present\n\n" +
            " film lovers & philosophers club  '23–\n",

        contact: () =>
            " github     github.com/jaquevan\n" +
            " linkedin   linkedin.com/in/evan-jaquez-118b5b294\n" +
            " site       jaquevan.com\n",

        open: (args) => {
            const target = args[0]?.toLowerCase();
            if (target === 'github') {
                window.open('https://github.com/jaquevan', '_blank');
                return " opening github...\n";
            }
            if (target === 'linkedin') {
                window.open('https://www.linkedin.com/in/evan-jaquez-118b5b294/', '_blank');
                return " opening linkedin...\n";
            }
            return " usage: open [github|linkedin]\n";
        },

        theme: (args) => {
            const name = args[0]?.toLowerCase() as ThemeName;
            if (!name) {
                const list = THEME_ORDER.join('  ');
                return ` current: ${theme}\n available: ${list}\n usage: theme [name]\n`;
            }
            if (THEMES[name]) {
                setTheme(name);
                return ` switched to ${name}\n`;
            }
            return ` unknown theme: '${name}'\n available: ${THEME_ORDER.join('  ')}\n`;
        },

        clear: () => {
            setHistory([]);
        },

        cat: () => ({
            text: `  (\\_/)
 (='.'=)
 (")(")`,
            isAsciiArt: true,
        }),

        buddy: () => ({
            frames: [
`   .---.
   |o o|
   | ^ |
   '-+-'
     |
    / \\`,

`   .---.      /
   |o o|     /
   | ^ |
   '-+-'
     |
    / \\`,

`\\    .---.      /
 \\   |o o|     /
     | ^ |
     '-+-'
       |
      / \\`,

`\\    .---.
 \\   |o o|
     | ^ |
     '-+-'
       |
      / \\`,
            ],
            frameDelay: 420,
        }),

        flip: () => ({
            frames: [
`(╯°□°）╯︵ ┻━┻`,
`(╯°□°）╯`,
`   ...`,
`┬─┬ ノ( ˘-˘ ノ)`,
            ],
            frameDelay: 600,
        }),
    };

    const handleContainerClick = () => {
        setHasInteracted(true);
        inputRef.current?.focus();
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;

        const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);

        if (cmd === 'clear') {
            setHistory([]);
            setCommandHistory(prev => [trimmed, ...prev]);
            setHistoryIndex(-1);
            setInput('');
            return;
        }

        const newHistory: CommandResult[] = [...history, { text: trimmed, isCommand: true }];

        if (commands[cmd]) {
            const result = commands[cmd](args);
            if (result) {
                if (typeof result === 'string') {
                    newHistory.push({ text: result });
                } else if ('frames' in result) {
                    newHistory.push({ text: '', frames: result.frames, frameDelay: result.frameDelay });
                } else {
                    newHistory.push({ text: result.text, isAsciiArt: result.isAsciiArt });
                }
            }
        } else {
            newHistory.push({
                text: `${cmd}: command not found. type 'help' to see available commands.`,
                isError: true,
            });
        }

        setHistory(newHistory);
        setCommandHistory(prev => [trimmed, ...prev]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIdx = historyIndex + 1;
            if (nextIdx < commandHistory.length) {
                setHistoryIndex(nextIdx);
                setInput(commandHistory[nextIdx]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIdx = historyIndex - 1;
                setHistoryIndex(nextIdx);
                setInput(commandHistory[nextIdx]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = input.trim().toLowerCase();
            if (partial) {
                const matches = Object.keys(commands).filter(c => c.startsWith(partial));
                if (matches.length === 1) setInput(matches[0]);
            }
        }
    };

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = history
            .map(item => item.isCommand ? `${PROMPT}${item.text}` : item.text)
            .join('\n');
        navigator.clipboard.writeText(text).then(() => {
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 1800);
        });
    };

    const clearTerminal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHistory([]);
    };

    useEffect(() => {
        if (hasInteracted) inputRef.current?.focus();
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, hasInteracted]);

    const currentTheme = THEMES[theme];

    return (
        <TerminalContainer $theme={currentTheme} onClick={handleContainerClick}>
            <TerminalHeader>
                <HeaderTitle $left>evan@portfolio — zsh</HeaderTitle>

                <HeaderActions>
                    {showCopied
                        ? <CopiedToast>copied!</CopiedToast>
                        : (
                            <>
                                <ThemeSwatches>
                                    {THEME_ORDER.map(t => (
                                        <ThemeSwatch
                                            key={t}
                                            $color={THEMES[t].swatch}
                                            $active={theme === t}
                                            onClick={e => { e.stopPropagation(); setTheme(t); }}
                                            title={t}
                                        />
                                    ))}
                                </ThemeSwatches>
                                <IconButton onClick={clearTerminal} title="Clear terminal">
                                    <ClearAllIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={copyToClipboard} title="Copy terminal contents">
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </>
                        )
                    }
                </HeaderActions>
            </TerminalHeader>

            <TerminalContent ref={terminalRef}>
                {history.map((item, index) => (
                    <TerminalLine key={index}>
                        {item.frames ? (
                            <AnimatedAscii frames={item.frames} delay={item.frameDelay} />
                        ) : item.isAsciiArt ? (
                            <AsciiArt>{item.text}</AsciiArt>
                        ) : item.isCommand ? (
                            <>
                                <PromptSpan>{PROMPT}</PromptSpan>
                                <OutputText>{item.text}</OutputText>
                            </>
                        ) : (
                            <OutputText isError={item.isError}>{item.text}</OutputText>
                        )}
                    </TerminalLine>
                ))}

                <TerminalLine>
                    <InputLine>
                        <PromptSpan>{PROMPT}</PromptSpan>
                        <InputField
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                        />
                    </InputLine>
                </TerminalLine>
            </TerminalContent>
        </TerminalContainer>
    );
}
