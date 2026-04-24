"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import StarIcon from "@mui/icons-material/Star";
import TerminalIcon from "@mui/icons-material/Terminal";
import TechIcons from "./TechIcons";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
    background: rgba(18, 18, 18, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    max-width: 500px;
    width: 100%;
    animation: ${fadeUp} 0.4s ease-out;
    color: #e6edf3;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

    @media (max-width: 1024px) { max-width: 440px; }
    @media (max-width: 600px)  { max-width: 100%; border-radius: 12px; }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: 600;
    color: #ffffff;
`;

const LiveTime = styled.div`
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: rgba(255, 255, 255, 0.55);
`;

const ProfileLink = styled.a`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    transition: background 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

const AvatarRing = styled.span`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(to right, #00843D, #6cc644);
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 600px) {
        width: 38px;
        height: 38px;
    }
`;

const AvatarInner = styled.span`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    @media (max-width: 600px) {
        width: 34px;
        height: 34px;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Username = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: 600;
    color: #e6edf3;
`;

const Bio = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: rgba(255, 255, 255, 0.5);
`;

const IconsStrip = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
`;

const ChartSection = styled.div`
    padding: 12px 14px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const ChartLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 10px;
`;

const ChartWrap = styled.div`
    width: 100%;
    overflow-x: hidden;
    position: relative;

    .gh-chart-img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        filter: brightness(1.1) saturate(1.1);
        display: block;
    }
`;

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const Stat = styled.div`
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    & + & {
        border-left: 1px solid rgba(255, 255, 255, 0.06);
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const StatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StatLabel = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.4);
`;

const StatValue = styled.span`
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    font-weight: 700;
    color: #e6edf3;
    line-height: 1.2;

    @media (max-width: 480px) {
        font-size: var(--text-base);
    }
`;

const Footer = styled.a`
    display: block;
    text-align: right;
    padding: 10px 18px;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: #6cc644;
        transform: translateX(3px);
    }
`;

const LoadingWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
`;

interface UserProfile {
    avatar_url: string;
    name: string;
    bio: string;
    public_repos: number;
}

export default function GitHubStatus() {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [currentTime, setCurrentTime] = useState('');
    const [mounted, setMounted] = useState(false);

    const username = "jaquevan";
    const streak = 13;

    useEffect(() => {
        setMounted(true);
        const fmt = () => {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${date} ${h}:${m}`);
        };
        fmt();
        const id = setInterval(fmt, 60000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data) setUserProfile(data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Card>
                <Header>
                    <HeaderTitle>
                        <GitHubIcon sx={{ fontSize: "1.1rem" }} />
                        GitHub
                    </HeaderTitle>
                    <LiveTime>{mounted ? currentTime : ''}</LiveTime>
                </Header>
                <LoadingWrap>
                    <CircularProgress size={28} sx={{ color: "#00843D" }} />
                </LoadingWrap>
            </Card>
        );
    }

    return (
        <Card>
            <Header>
                <HeaderTitle>
                    <GitHubIcon sx={{ fontSize: "1.1rem" }} />
                    GitHub
                </HeaderTitle>
                <LiveTime>{mounted ? currentTime : ''}</LiveTime>
            </Header>

            <ProfileLink
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <AvatarRing>
                    <AvatarInner>
                        <Image
                            src={userProfile?.avatar_url ?? `https://avatars.githubusercontent.com/u/144175083?v=4`}
                            alt={`${username} GitHub avatar`}
                            fill
                            sizes="(max-width: 600px) 34px, 40px"
                            style={{ objectFit: 'cover' }}
                        />
                    </AvatarInner>
                </AvatarRing>
                <UserInfo>
                    <Username>{username}</Username>
                    {userProfile?.bio && <Bio>{userProfile.bio}</Bio>}
                </UserInfo>
            </ProfileLink>

            <IconsStrip>
                <TechIcons />
            </IconsStrip>

            <ChartSection>
                <ChartLabel>
                    <CodeIcon sx={{ fontSize: "0.85rem", color: "#58a6ff" }} />
                    Contribution Activity
                </ChartLabel>
                <ChartWrap>
                    {/* unoptimized: ghchart returns an SVG — skip Next.js optimization pipeline */}
                    <Image
                        className="gh-chart-img"
                        src={`https://ghchart.rshah.org/00843D/${username}`}
                        alt="GitHub contribution chart"
                        width={800}
                        height={160}
                        unoptimized
                    />
                </ChartWrap>
            </ChartSection>

            <StatsRow>
                <Stat>
                    <StatHeader>
                        <StatLabel>Repos</StatLabel>
                        <StorageIcon sx={{ fontSize: "0.85rem", color: "#6cc644" }} />
                    </StatHeader>
                    <StatValue>{userProfile?.public_repos ?? 28}</StatValue>
                </Stat>
                <Stat>
                    <StatHeader>
                        <StatLabel>Streak</StatLabel>
                        <StarIcon sx={{ fontSize: "0.85rem", color: "#ff6e29" }} />
                    </StatHeader>
                    <StatValue>{streak}</StatValue>
                </Stat>
                <Stat>
                    <StatHeader>
                        <StatLabel>Language</StatLabel>
                        <TerminalIcon sx={{ fontSize: "0.85rem", color: "#a371f7" }} />
                    </StatHeader>
                    <StatValue>TS</StatValue>
                </Stat>
            </StatsRow>

            <Footer href="/projects">→ View Projects</Footer>
        </Card>
    );
}
