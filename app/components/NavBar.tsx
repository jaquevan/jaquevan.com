"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface StyledLinkProps {
    $isActive: boolean;
    $scrolled: boolean;
}

interface NavContainerProps {
    $scrolled: boolean;
}

/* ── Keyframes ──────────────────────────────────────────────────────────── */

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
`;

/* ── Sticky shell ───────────────────────────────────────────────────────── */
/*
 * position: sticky on a full-width wrapper — the browser handles placement
 * natively with zero JS involvement, eliminating all scroll jank.
 */
const StickyShell = styled.div`
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 1vh 0 0;
    pointer-events: none;   /* clicks pass through the invisible wrapper */
    width: 100%;
`;

/* ── Nav pill ───────────────────────────────────────────────────────────── */

const NavContainer = styled.nav<NavContainerProps>`
    pointer-events: all;
    box-sizing: border-box;
    width: clamp(300px, 40vw, 600px);
    background: ${p => p.$scrolled
        ? "rgba(255,255,255,0.92)"
        : "rgba(255,255,255,0.3)"};
    backdrop-filter: blur(${p => p.$scrolled ? "16px" : "10px"}) saturate(150%);
    -webkit-backdrop-filter: blur(${p => p.$scrolled ? "16px" : "10px"}) saturate(150%);
    box-shadow: ${p => p.$scrolled
        ? "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)"
        : "0 2px 10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)"};
    border-radius: 50px;
    padding: 0.5vh 0;
    border: 1px solid ${p => p.$scrolled
        ? "rgba(255,255,255,0.6)"
        : "rgba(255,255,255,0.35)"};
    transform: scale(${p => p.$scrolled ? "1" : "0.97"});
    transition:
        transform       0.4s cubic-bezier(0.4, 0, 0.2, 1),
        background      0.4s cubic-bezier(0.4, 0, 0.2, 1),
        backdrop-filter 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow      0.3s ease,
        border-color    0.3s ease;

    @media (max-width: 1024px) { width: clamp(280px, 65vw, 500px); }
    @media (max-width: 768px)  {
        width: clamp(260px, 85vw, 450px);
        border-radius: 40px;
    }
    @media (max-width: 480px)  {
        width: 95vw;
        border-radius: 30px;
    }
`;

/* ── Inner layout ───────────────────────────────────────────────────────── */

const NavContent = styled.div`
    display: flex;
    align-items: center;
    padding: 0 12px;
`;

const ThemeToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
    flex-shrink: 0;
    animation: ${fadeIn} 0.45s ease both;
    animation-delay: 0.05s;
    transition: transform 0.2s ease;
    &:hover { transform: scale(1.06); }
    @media (max-width: 600px) { transform: scale(0.9); }
`;

/* ── List ───────────────────────────────────────────────────────────────── */

const NavList = styled.ul`
    position: relative;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0 0 5px;
    flex: 1;
`;

/* ── Hover dot ──────────────────────────────────────────────────────────── */
/*
 * Positioned and animated entirely via direct DOM style writes so we can
 * control the left transition independently from visibility (avoids the dot
 * "flying in" from x=0 on first hover).
 */
const NavDot = styled.span<{ $scrolled: boolean }>`
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${p => p.$scrolled ? "#1a1a1a" : "var(--primary)"};
    opacity: 0;
    transform: translateX(-50%) translateY(6px);
    pointer-events: none;
    transition: background 0.35s ease;
`;

/* ── Items ──────────────────────────────────────────────────────────────── */

const NavItem = styled.li`
    flex: 1;
    text-align: center;
    animation: ${fadeIn} 0.35s ease both;
    animation-fill-mode: both;
    &:nth-child(1) { animation-delay: 0.10s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.20s; }
    &:nth-child(4) { animation-delay: 0.25s; }
`;

/* ── Link ───────────────────────────────────────────────────────────────── */

const StyledLink = styled(Link)<StyledLinkProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.45rem 0.75rem 0.4rem;
    border-radius: 20px;
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: ${p => p.$isActive ? "700" : "500"};
    letter-spacing: ${p => p.$isActive ? "-0.01em" : "0"};
    color: ${p => {
        if (p.$scrolled) return p.$isActive ? "#006b30" : "#505050";
        return p.$isActive ? "var(--primary)" : "var(--text-primary)";
    }};
    background: ${p => p.$isActive ? "rgba(0, 132, 61, 0.13)" : "transparent"};
    white-space: nowrap;
    position: relative;
    z-index: 1;
    transition: color 0.22s ease, background 0.22s ease;

    &:hover {
        color: ${p => p.$scrolled ? "#000000" : "var(--primary)"};
    }

    @media (max-width: 768px) { padding: 0.4rem 0.55rem 0.35rem; font-size: var(--text-sm); }
    @media (max-width: 480px) { padding: 0.35rem 0.4rem 0.3rem;  font-size: var(--text-xs); }
`;

const NavLabel = styled.span`
    position: relative;
    display: inline-block;
`;

/* ── Data ───────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
    { href: "/",           label: "Home"       },
    { href: "/projects",   label: "Projects"   },
    { href: "/about",      label: "About"      },
    { href: "/experience", label: "Experience" },
] as const;

/* ── Component ──────────────────────────────────────────────────────────── */

export default function NavBar() {
    const pathname    = usePathname();
    const [scrolled, setScrolled] = useState(false);

    /* refs */
    const itemRefs   = useRef<(HTMLLIElement | null)[]>([]);   // measure <li> centers
    const dotRef     = useRef<HTMLSpanElement>(null);
    const wasVisible = useRef(false);   // track first-show vs slide

    /* Scroll listener — only changes on threshold cross */
    useEffect(() => {
        let last = false;
        const onScroll = () => {
            const next = window.scrollY > 30;
            if (next !== last) { last = next; setScrolled(next); }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Center of a <li> relative to NavList.
     * offsetLeft is measured from the offsetParent directly — no viewport math,
     * immune to scroll position and CSS transforms on ancestors. */
    const measureCenter = useCallback((index: number): number | null => {
        const el = itemRefs.current[index];
        if (!el) return null;
        return el.offsetLeft + el.offsetWidth / 2;
    }, []);

    /* Hover handlers — direct DOM writes for transition control */
    const onEnter = useCallback((index: number) => {
        const cx  = measureCenter(index);
        const dot = dotRef.current;
        if (cx === null || !dot) return;

        if (!wasVisible.current) {
            /* First appearance: snap to position, then animate in */
            dot.style.transition = "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s ease";
        } else {
            /* Sliding between items: include horizontal transition */
            dot.style.transition = "left 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s ease";
        }
        dot.style.left      = `${cx}px`;
        dot.style.opacity   = "1";
        dot.style.transform = "translateX(-50%) translateY(0px)";
        wasVisible.current  = true;
    }, [measureCenter]);

    const onLeave = useCallback(() => {
        const dot = dotRef.current;
        if (!dot) return;
        dot.style.transition = "transform 0.18s ease, opacity 0.15s ease";
        dot.style.opacity    = "0";
        dot.style.transform  = "translateX(-50%) translateY(6px)";
        wasVisible.current   = false;
    }, []);

    return (
        <StickyShell>
            <NavContainer $scrolled={scrolled}>
                <NavContent>
                    <ThemeToggleWrapper>
                        <ThemeToggle />
                    </ThemeToggleWrapper>

                    <NavList>
                        <NavDot ref={dotRef} $scrolled={scrolled} />

                        {NAV_ITEMS.map((item, i) => (
                            <NavItem
                                key={item.href}
                                ref={el => { itemRefs.current[i] = el; }}
                                onMouseEnter={() => onEnter(i)}
                                onMouseLeave={onLeave}
                            >
                                <StyledLink
                                    href={item.href}
                                    $isActive={pathname === item.href}
                                    $scrolled={scrolled}
                                >
                                    <NavLabel>
                                        {item.label}
                                    </NavLabel>
                                </StyledLink>
                            </NavItem>
                        ))}
                    </NavList>
                </NavContent>
            </NavContainer>
        </StickyShell>
    );
}
