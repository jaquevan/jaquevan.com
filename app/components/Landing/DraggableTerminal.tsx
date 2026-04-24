"use client";

import React, { useState, useEffect, useCallback } from "react";
import Terminal from "@/app/components/AboutMe/Terminal";
import styled from "styled-components";

const MIN_W = 280;
const MIN_H = 200;
const DEFAULT_W = 580;
const DEFAULT_H = 360;
const HEADER_H = 38; // px — height of the terminal's title bar

/* ──────────────────────────────────────────────
   Outer shell: position + size only, no > * rule
   (that rule lives on TerminalFill so it doesn't
   accidentally inflate the resize / drag handles)
   ────────────────────────────────────────────── */
const FixedWrapper = styled.div<{
    $x: number;
    $y: number;
    $w: number;
    $h: number;
    $active: boolean;
}>`
    position: fixed;
    left: ${p => p.$x}px;
    top: ${p => p.$y}px;
    width: ${p => p.$w}px;
    height: ${p => p.$h}px;
    z-index: 50;
    user-select: ${p => p.$active ? "none" : "auto"};
`;

/* Makes the TerminalContainer fill this div exactly */
const TerminalFill = styled.div`
    position: absolute;
    inset: 0;
    border-radius: 12px;
    overflow: hidden;

    > * {
        width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        margin: 0 !important;
        border-radius: 12px !important;
    }
`;

/* ── Drag affordance ──────────────────────────
   Sits on top of the title bar only; passes
   pointer events through to interactive
   elements inside (buttons, swatches).          */
const DragStrip = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${HEADER_H}px;
    cursor: grab;
    z-index: 10;
    border-radius: 12px 12px 0 0;
    pointer-events: none; /* let terminal buttons work */

    &.dragging {
        cursor: grabbing;
        pointer-events: auto; /* capture during active drag */
    }
`;

/* ── Resize handles ────────────────────────── */
const ResizeEdge = styled.div`
    position: absolute;
    z-index: 20;
    transition: background 0.15s;
`;

const ResizeLeft = styled(ResizeEdge)`
    top: 12px;
    left: 0;
    width: 6px;
    height: calc(100% - 24px);
    cursor: w-resize;
    border-radius: 4px 0 0 4px;
    &:hover { background: rgba(255, 255, 255, 0.12); }
`;

const ResizeRight = styled(ResizeEdge)`
    top: 12px;
    right: 0;
    width: 6px;
    height: calc(100% - 24px);
    cursor: e-resize;
    border-radius: 0 4px 4px 0;
    &:hover { background: rgba(255, 255, 255, 0.12); }
`;

const ResizeBottom = styled(ResizeEdge)`
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 6px;
    cursor: s-resize;
    border-radius: 0 0 4px 4px;
    &:hover { background: rgba(255, 255, 255, 0.12); }
`;

const ResizeCorner = styled(ResizeEdge)`
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    border-radius: 0 0 12px 0;

    /* macOS-style 3-dot diagonal grip */
    &::after {
        content: "";
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 9px;
        height: 9px;
        background: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.35) 0px,
            rgba(255, 255, 255, 0.35) 1.5px,
            transparent 1.5px,
            transparent 4px
        );
        border-radius: 1px;
    }

    &:hover::after {
        background: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.6) 0px,
            rgba(255, 255, 255, 0.6) 1.5px,
            transparent 1.5px,
            transparent 4px
        );
    }
`;

const MobileWrapper = styled.div`
    width: 100%;
    position: relative;
    margin-top: 1rem;
`;

export default function DraggableTerminal() {
    const [isMobile, setIsMobile] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });
    const [initialized, setInitialized] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 900);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        setPos({
            x: Math.max(20, Math.min(window.innerWidth - DEFAULT_W - 20, window.innerWidth * 0.54)),
            y: Math.max(80, window.innerHeight * 0.15),
        });
        setInitialized(true);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /* ── Drag: fired from FixedWrapper's onMouseDown ──
       Only activates when the click lands inside the
       title-bar strip and NOT on a button / input.    */
    const handleWrapperMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relY = e.clientY - rect.top;
            if (relY > HEADER_H) return; // below header — ignore

            const target = e.target as HTMLElement;
            if (target.closest("button") || target.closest("input") || target.closest("a")) return;

            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startPosX = pos.x;
            const startPosY = pos.y;
            let hasMoved = false;
            setIsActive(true);

            const onMove = (me: MouseEvent) => {
                const dx = me.clientX - startX;
                const dy = me.clientY - startY;
                if (!hasMoved && Math.hypot(dx, dy) > 3) hasMoved = true;
                if (hasMoved) {
                    setPos({
                        x: Math.max(0, Math.min(window.innerWidth - size.w, startPosX + dx)),
                        y: Math.max(70, Math.min(window.innerHeight - 120, startPosY + dy)),
                    });
                }
            };

            const onUp = () => {
                setIsActive(false);
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        },
        [pos.x, pos.y, size.w]
    );

    /* ── Resize helpers ─────────────────────────── */
    const startResize = useCallback(
        (e: React.MouseEvent, resizeW: boolean, resizeH: boolean) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = size.w;
            const startH = size.h;
            const capX = pos.x;
            const capY = pos.y;
            setIsActive(true);

            const onMove = (me: MouseEvent) => {
                setSize(prev => ({
                    w: resizeW
                        ? Math.max(MIN_W, Math.min(window.innerWidth - capX, startW + (me.clientX - startX)))
                        : prev.w,
                    h: resizeH
                        ? Math.max(MIN_H, Math.min(window.innerHeight - capY - 20, startH + (me.clientY - startY)))
                        : prev.h,
                }));
            };

            const onUp = () => {
                setIsActive(false);
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        },
        [size.w, size.h, pos.x, pos.y]
    );

    /* ── Left-edge resize: moves x + adjusts width together ── */
    const startResizeLeft = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startW = size.w;
            const startPosX = pos.x;
            setIsActive(true);

            const onMove = (me: MouseEvent) => {
                const dx = me.clientX - startX;
                const newX = Math.max(0, startPosX + dx);
                const actualDx = newX - startPosX;
                const newW = Math.max(MIN_W, startW - actualDx);
                setPos(prev => ({ ...prev, x: newX }));
                setSize(prev => ({ ...prev, w: newW }));
            };

            const onUp = () => {
                setIsActive(false);
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        },
        [size.w, pos.x]
    );

    if (!initialized) return null;

    if (isMobile) {
        return (
            <MobileWrapper>
                <Terminal />
            </MobileWrapper>
        );
    }

    return (
        <FixedWrapper
            $x={pos.x}
            $y={pos.y}
            $w={size.w}
            $h={size.h}
            $active={isActive}
            onMouseDown={handleWrapperMouseDown}
        >
            {/* Terminal fills the whole shell */}
            <TerminalFill>
                <Terminal />
            </TerminalFill>

            {/* Grab-cursor hint over the title bar (pointer-events: none normally) */}
            <DragStrip className={isActive ? "dragging" : ""} />

            {/* Resize handles — left edge, right edge, bottom edge, corner */}
            <ResizeLeft   onMouseDown={startResizeLeft}                   title="Resize width" />
            <ResizeRight  onMouseDown={e => startResize(e, true,  false)} title="Resize width" />
            <ResizeBottom onMouseDown={e => startResize(e, false, true)}  title="Resize height" />
            <ResizeCorner onMouseDown={e => startResize(e, true,  true)}  title="Resize" />
        </FixedWrapper>
    );
}
