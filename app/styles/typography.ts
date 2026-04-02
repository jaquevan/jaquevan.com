/**
 * Typography system — single source of truth.
 *
 * Two fonts:
 *   mono  →  JetBrains Mono  (headings, labels, tags, terminal, code-adjacent UI)
 *   sans  →  System stack    (body text, descriptions, prose)
 *
 * Use CSS variables in styled-components:
 *   font-family: var(--font-mono);
 *   font-size: var(--text-sm);
 *
 * Or import the JS constants and interpolate:
 *   import { font, size, weight } from '@/app/styles/typography';
 *   font-family: ${font.mono};
 */

export const font = {
    mono: 'var(--font-mono)',
    sans: 'var(--font-sans)',
} as const;

/**
 * Type scale — all sizes in rem.
 *
 * 2xs  →  0.68rem   labels, uppercase eyebrows
 * xs   →  0.75rem   tags, captions, badges
 * sm   →  0.875rem  body (compact)
 * base →  0.95rem   body (standard), nav links
 * lg   →  1.1rem    subheadings, sidebar titles
 * xl   →  1.5rem    section labels (large)
 * 2xl  →  2rem      page section headings
 * 3xl  →  responsive page titles  (clamp 1.8–2.2rem)
 * hero →  responsive hero text    (clamp 2.5–4rem)
 */
export const size = {
    '2xs':  'var(--text-2xs)',
    xs:     'var(--text-xs)',
    sm:     'var(--text-sm)',
    base:   'var(--text-base)',
    lg:     'var(--text-lg)',
    xl:     'var(--text-xl)',
    '2xl':  'var(--text-2xl)',
    '3xl':  'var(--text-3xl)',
    hero:   'var(--text-hero)',
} as const;

export const weight = {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
} as const;

export const leading = {
    tight:   1.3,
    snug:    1.5,
    normal:  1.65,
    relaxed: 1.75,
} as const;

/**
 * Pre-composed style blocks for the most common text roles.
 * Use inside styled-components template literals.
 *
 * Example:
 *   import { t } from '@/app/styles/typography';
 *   const MyLabel = styled.span`${t.label}`;
 */
export const t = {
    /** Uppercase section label — mono, 2xs, spaced */
    label: `
        font-family: var(--font-mono);
        font-size: var(--text-2xs);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-secondary);
    `,

    /** Small mono tag / badge */
    tag: `
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        font-weight: 500;
    `,

    /** Standard body copy */
    body: `
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        line-height: 1.65;
        font-weight: 400;
        color: var(--text-secondary);
    `,

    /** Slightly larger body (nav, descriptions) */
    bodyBase: `
        font-family: var(--font-sans);
        font-size: var(--text-base);
        line-height: 1.65;
        font-weight: 400;
        color: var(--text-secondary);
    `,

    /** Mono subheading */
    subheading: `
        font-family: var(--font-mono);
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--text-primary);
    `,

    /** Page section heading */
    heading: `
        font-family: var(--font-mono);
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--text-primary);
    `,

    /** Responsive page title */
    pageTitle: `
        font-family: var(--font-mono);
        font-size: var(--text-3xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--text-primary);
    `,
} as const;
