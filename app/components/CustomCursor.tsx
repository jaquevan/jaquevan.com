"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Interactive {
    label: string;
    color: string;
}

/**
 * Renders a Figma-style label badge that tracks the cursor over
 * elements marked with data-cursor-label / data-cursor-color.
 * The cursor arrow itself is provided by the CSS url() rule in global.css.
 */
export default function CustomCursor() {
    const badgeRef  = useRef<HTMLDivElement>(null);
    const rafRef    = useRef<number>(0);
    const posRef    = useRef({ x: 0, y: 0 });
    const activeRef = useRef(false);
    const lastKey   = useRef("");

    const [mounted,     setMounted]     = useState(false);
    const [interactive, setInteractive] = useState<Interactive | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const moveBadge = () => {
            if (badgeRef.current) {
                badgeRef.current.style.left = `${posRef.current.x + 18}px`;
                badgeRef.current.style.top  = `${posRef.current.y + 18}px`;
            }
        };

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (activeRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(moveBadge);
            }
        };

        const onOver = (e: MouseEvent) => {
            const el  = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]");
            const key = el ? `${el.dataset.cursorLabel}|${el.dataset.cursorColor}` : "";
            if (key === lastKey.current) return;
            lastKey.current = key;

            if (el) {
                activeRef.current = true;
                setInteractive({
                    label: el.dataset.cursorLabel ?? "",
                    color: el.dataset.cursorColor ?? "#1a1a1a",
                });
                moveBadge();
            } else {
                activeRef.current = false;
                setInteractive(null);
            }
        };

        document.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseover", onOver);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div
            ref={badgeRef}
            style={{
                position:      "fixed",
                top:           0,
                left:          0,
                opacity:       interactive ? 1 : 0,
                background:    interactive?.color ?? "transparent",
                color:         "white",
                fontSize:      11,
                fontFamily:    '"JetBrains Mono", monospace',
                fontWeight:    600,
                padding:       "2px 8px",
                borderRadius:  4,
                whiteSpace:    "nowrap",
                boxShadow:     "0 2px 6px rgba(0,0,0,0.22)",
                letterSpacing: "0.02em",
                lineHeight:    "1.6",
                pointerEvents: "none",
                zIndex:        99999,
                transition:    "opacity 0.12s ease",
                willChange:    "left, top",
            }}
        >
            {interactive?.label ?? ""}
        </div>,
        document.body
    );
}
