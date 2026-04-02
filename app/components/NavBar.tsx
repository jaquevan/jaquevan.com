"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface StyledLinkProps {
    $isActive: boolean;
    $isSticky: boolean;
}

interface NavContainerProps {
    $isSticky: boolean;
}


const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const NavContainer = styled.nav<NavContainerProps>`
    box-sizing: border-box;
    position: ${props => props.$isSticky ? 'fixed' : 'relative'};
    top: ${props => props.$isSticky ? '1vh' : '0'};
    left: 50%;
    transform: translateX(-50%) scale(${props => props.$isSticky ? '1' : '0.98'});
    width: clamp(300px, 40vw, 600px);
    margin-top: ${props => props.$isSticky ? '0' : '1.5vh'};
    opacity: ${props => props.$isSticky ? '1' : '0.95'};
    background: ${props => props.$isSticky
        ? 'rgba(255, 255, 255, 0.92)'
        : 'rgba(255, 255, 255, 0.3)'};
    backdrop-filter: blur(${props => props.$isSticky ? '14px' : '12px'}) saturate(150%);
    -webkit-backdrop-filter: blur(${props => props.$isSticky ? '14px' : '12px'}) saturate(150%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                0 1px 3px rgba(0, 0, 0, 0.06);
    border-radius: 50px;
    padding: 0.8vh 0;
    z-index: 1000;
    border: 1px solid rgba(255, 255, 255, 0.3);
    will-change: transform, opacity, top, margin-top;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                top 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                margin-top 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                background 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                backdrop-filter 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                -webkit-backdrop-filter 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease,
                border-color 0.3s ease;

    &:hover {
        background: ${props => props.$isSticky
            ? 'rgba(255, 255, 255, 0.92)'
            : 'rgba(255, 255, 255, 0.35)'};
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15),
                    0 2px 4px rgba(0, 0, 0, 0.08);
        border-color: rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 1024px) {
        width: clamp(280px, 65vw, 500px);
    }

    @media (max-width: 768px) {
        width: clamp(260px, 85vw, 450px);
        border-radius: 40px;
        top: ${props => props.$isSticky ? '0.5vh' : '0'};
        padding: 0.6vh 0;
    }

    @media (max-width: 480px) {
        width: 95vw;
        border-radius: 30px;
        top: ${props => props.$isSticky ? '0.5vh' : '0'};
        padding: 0.5vh 0;
    }
`;

const NavContent = styled.div`
    display: flex;
    align-items: center;
    padding: 0 12px;
`;

const ThemeToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
    animation: ${fadeIn} 0.4s ease-in;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        transform: scale(0.9);
    }
`;

const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex: 1;
`;

const NavItem = styled.li`
    flex: 1;
    text-align: center;
    animation: ${fadeIn} 0.3s ease-in;
    animation-fill-mode: both;

    &:nth-child(1) { animation-delay: 0.05s; }
    &:nth-child(2) { animation-delay: 0.1s; }
    &:nth-child(3) { animation-delay: 0.15s; }
    &:nth-child(4) { animation-delay: 0.2s; }
    &:nth-child(5) { animation-delay: 0.25s; }
`;

const StyledLink = styled(Link)<StyledLinkProps>`
    display: block;
    padding: 0.6rem 0.5rem;
    text-decoration: none;
    color: ${props => {
        if (props.$isSticky) {
            return props.$isActive ? '#000000' : '#333333';
        }
        return props.$isActive ? 'var(--primary)' : 'var(--text-primary)';
    }};
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: ${props => props.$isActive ? '700' : '500'};
    transition: color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    white-space: nowrap;

    &:hover {
        color: ${props => props.$isSticky ? '#000000' : 'var(--primary)'};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${props => props.$isActive ? '70%' : '0'};
        border-radius: 18px;
        height: 3px;
        background: ${props => props.$isSticky ? '#000000' : 'var(--primary)'};
        opacity: ${props => props.$isActive ? '1' : '0'};
        transition: width 0.25s ease, opacity 0.25s ease, background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover::after {
        width: 70%;
        opacity: 1;
    }

    @media (max-width: 768px) {
        padding: 0.5rem 0.3rem;
        font-size: var(--text-sm);
    }

    @media (max-width: 480px) {
        padding: 0.4rem 0.2rem;
        font-size: var(--text-xs);
    }
`;

export default function NavBar() {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    // measure nav height so we can render a spacer that prevents overlap when nav becomes fixed
    const navRef = useRef<HTMLElement>(null);
    const [spacerHeight, setSpacerHeight] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            // Make sticky after scrolling 30px for smoother transition
            setIsSticky(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // measure initial height
        const updateHeight = () => {
            if (navRef.current) {
                // offsetHeight is integer px
                setSpacerHeight(navRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/about", label: "About" },
        { href: "/experience", label: "Experience" },
        // { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            {/* spacer keeps page layout from jumping/being covered when nav becomes fixed */}
            <div aria-hidden style={{ height: isSticky ? `${spacerHeight}px` : 0, transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <NavContainer ref={navRef} $isSticky={isSticky}>
                <NavContent>
                    <ThemeToggleWrapper>
                        <ThemeToggle />
                    </ThemeToggleWrapper>
                    <NavList>
                        {navItems.map((item) => (
                            <NavItem key={item.href}>
                                <StyledLink
                                    href={item.href}
                                    $isActive={pathname === item.href}
                                    $isSticky={isSticky}
                                >
                                    {item.label}
                                </StyledLink>
                            </NavItem>
                        ))}
                    </NavList>
                </NavContent>
            </NavContainer>
        </>
    );
}