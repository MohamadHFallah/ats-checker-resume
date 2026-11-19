# DESIGN.md

Read this file before any UI work. It defines the visual identity of the ATS Resume Checker. Colors and radius are already implemented as tokens in `globals.css`; use them, never hard-coded values.

 You must be separate of concern for creating component, also for creating component you create into components folder, this path: '/apps/components/'

## 1. Direction

Calm, editorial, and trustworthy: like a printed analytical report, not a startup landing page. Think Linear docs or Stripe docs. The product gives a serious assessment of someone's career document, so the tone is restrained and precise.

It must NOT look like a generic "AI app".

## 2. Color

All colors come from `globals.css`. Use Tailwind utilities (`bg-background`, `text-primary`, `border-border`, `bg-success-50`, etc.).

| Role | Token | Notes |
| --- | --- | --- |
| Page background | `background` | Warm paper off-white, not pure white |
| Surfaces | `card` | White, separated by a 1px `border` |
| Text | `foreground` / `muted-foreground` | Warm near-black / warm gray |
| Primary action | `primary` (petrol blue, `primary-700`) | Buttons, links, focus ring. One primary action per view |
| Soft highlight | `accent` (`primary-50`) | Selected or hovered rows |
| Strong match | `success-*` | Score 75-100, matched skills |
| Partial / unconfirmed | `warning-*` | Score 50-74, "insufficient evidence" |
| Weak / error | `danger-*` | Score 0-49, validation and server errors |

Rules:

- Color is for meaning. Use success/warning/danger only for score bands and status, never as decoration.
- Never rely on color alone: always pair a status color with a text label or icon.
- Use the `-50`/`-100` shades for status backgrounds and `-700`/`-800` for status text to keep contrast at WCAG AA or better.

## 3. Typography

- Headings (h1-h3): serif via `font-heading` (Fraunces recommended). Load it with `next/font` and expose it as the CSS variable `--font-serif`.
- Body and UI: Geist sans (`font-sans`). Numbers use tabular figures (`tabular-nums`).
- Large type scale for hierarchy: the score and page title are big; everything else stays modest. Body text 15-16px, line-height 1.6.

## 4. Shape and surfaces

- Radius is small (`--radius` is 6px). Do not use `rounded-2xl` or pill shapes except for small tags.
- No drop shadows. Separate surfaces with 1px borders and whitespace.
- No gradients, glow effects, glassmorphism, or decorative blobs.
- Generous whitespace; a single centered content column (max ~720-860px) for results.

## 5. Page guidelines

### Home

- Short, plain product name and one-sentence explanation. No marketing hero, no feature-card grid.
- Two labeled text areas (resume, job description) side by side on desktop and stacked on mobile, with a character count.
- One primary "Analyze" button. A short note that resume text is sent to an external AI provider.
- Clear inline validation errors, an in-button loading state, and a skeleton or progress message while analyzing.

### Results

- Overall score: one large plain number (e.g. `72 / 100`) with a text band label ("Good match"). No decorative gauge or donut chart. Label it "Compatibility score" and never "ATS score".
- Matched skills: a list where each skill shows its resume evidence as a quoted line with a left border (`border-l-2 border-primary`).
- Missing or unconfirmed skills: neutral/warning-toned tags. Word them as "not mentioned" or "insufficient evidence", never as "candidate lacks this".
- Experience and education: a short explanation with evidence quotes.
- Keywords: small tag lists (matched vs missing) with a note that a missing keyword does not prove a missing skill.
- Strengths and weaknesses: plain lists, no icons per item.
- Recommendations: ordered by priority, each with a text priority label (High / Medium / Low), not just a colored dot.
- Section headings use the serif font and a thin top border to separate sections, like a report.

## 6. Banned (generic AI look)

- Purple/blue gradients, neon glow, dark "cyber" themes by default
- Emoji used as icons (use a single consistent icon set, e.g. lucide, sparingly)
- Centered hero with three identical feature cards beneath it
- Heavy shadows, `rounded-2xl` everywhere, glassmorphism
- Sparkle/robot icons and phrases like "AI-powered magic"
- Leaving the default shadcn look untouched: components must use the tokens above

## 7. Accessibility and responsiveness

- Semantic HTML (`main`, `section`, `h1`-`h3`, `ul`), labels tied to inputs, visible focus ring (`ring`).
- Text contrast WCAG AA minimum; touch targets at least 44px on mobile.
- Mobile-first: single column under `md`; no horizontal scroll.
- Respect `prefers-reduced-motion`; animations only for loading states.
- Dark mode must work using the tokens only.

## 8. Process for UI work

1. Build with real sample analysis data, never lorem ipsum.
2. For a new page, propose two layout directions first and wait for a choice.
3. Before finishing: view the page in a browser at desktop and mobile widths (screenshot if tools allow), then critique it against sections 1, 4 and 6 and fix what drifts.