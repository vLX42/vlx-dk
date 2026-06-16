import React from 'react'
import { motion } from 'framer-motion'

/*
 * New narrative panels for the horizontal scroll.
 * Each section returns one or more <motion.div animate={controls}> panels so they
 * sit as direct children of `.thumbnails` and inherit the existing 45px spacing,
 * wheel-tilt and glass styling.
 *
 * Media is scaffolded with <MediaSlot> placeholders — Peter drops real assets in
 * later (see TODO labels). Swap a slot for next/image or react-player when ready.
 */

type SectionProps = {
  controls: any
  glassEffect: boolean
}

const eyebrow =
  'mb-2 text-xs portrait:text-xl font-medium tracking-widest text-white/80 uppercase'
const title =
  'mb-6 portrait:mb-4 text-2xl portrait:text-6xl font-bold tracking-tighter text-white'
const body =
  'mb-6 text-base portrait:text-2xl leading-relaxed text-white/90 lg:text-left'
const link = 'text-white underline hover:text-gray-200'

const Panel = ({
  children,
  glassEffect,
}: {
  children: React.ReactNode
  glassEffect: boolean
}) => (
  <div
    className={`thumbnail ${
      glassEffect ? 'glass' : ''
    } background text-white body-font overflow-y-auto`}
  >
    <div className="px-8 py-8 lg:px-12 lg:py-12 h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
)

// Dashed placeholder for media Peter will supply later.
const MediaSlot = ({
  label,
  className = '',
}: {
  label: string
  className?: string
}) => (
  <div
    className={`rounded-lg border-2 border-dashed border-white/50 bg-white/10 flex items-center justify-center text-center text-sm portrait:text-xl text-white/80 p-6 ${className}`}
  >
    <span>🎬 TODO — {label}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/* A1 — Evolution of my job postings (centerpiece)                     */
/* ------------------------------------------------------------------ */

const jobPostingPhases = [
  {
    eyebrow: 'Phase 1 · Stills',
    heading: 'AI-generated images',
    copy: 'Eye-catching job ads built from AI stills that riffed on familiar pop culture. Fast to make, impossible to scroll past.',
    slots: [
      'Job ad still #1 (full image)',
      'Job ad still #2 (full image)',
      'Job ad still #3 (full image)',
    ],
    grid: 'grid grid-cols-3 portrait:grid-cols-1 gap-4',
    slotClass: 'aspect-square',
  },
  {
    eyebrow: 'Phase 2 · Motion',
    heading: 'Short AI videos',
    copy: 'As the tools matured, the stills became short AI-generated videos — the same ideas, now moving.',
    slots: ['Short recruitment video (~15s)'],
    grid: 'grid grid-cols-1 gap-4',
    slotClass: 'aspect-video',
  },
  {
    eyebrow: 'Phase 3 · Productions',
    heading: 'Multi-scene mini campaigns',
    copy: 'Full productions: storyboarded scenes, music and product highlights. Effectively small campaigns, made solo.',
    slots: ['Multi-scene campaign video'],
    grid: 'grid grid-cols-1 gap-4',
    slotClass: 'aspect-video',
  },
]

export const JobPostingStory = ({ controls, glassEffect }: SectionProps) => (
  <>
    {/* Intro */}
    <motion.div animate={controls}>
      <Panel glassEffect={glassEffect}>
        <p className={eyebrow}>The story</p>
        <h1 className={title}>Evolution of my job postings</h1>
        <p className={body}>
          As the hiring manager, I made every recruitment campaign below myself
          — with AI. Scroll right to watch them evolve from a single generated
          image into full multi-scene productions.
        </p>
        <p className="text-sm portrait:text-xl text-white/70">
          → Stills · Short videos · Mini campaigns
        </p>
      </Panel>
    </motion.div>

    {/* One panel per phase */}
    {jobPostingPhases.map((phase) => (
      <motion.div animate={controls} key={phase.eyebrow}>
        <Panel glassEffect={glassEffect}>
          <p className={eyebrow}>{phase.eyebrow}</p>
          <h1 className={title}>{phase.heading}</h1>
          <p className={body}>{phase.copy}</p>
          <div className={phase.grid}>
            {phase.slots.map((slot) => (
              <MediaSlot key={slot} label={slot} className={phase.slotClass} />
            ))}
          </div>
        </Panel>
      </motion.div>
    ))}

    {/* Closing — the point */}
    <motion.div animate={controls}>
      <Panel glassEffect={glassEffect}>
        <p className={eyebrow}>The point</p>
        <h1 className={title}>The bottleneck has moved to taste and direction.</h1>
        <p className={body}>
          As the tools matured, the ambition scaled with them. The hard part is
          no longer production — it's knowing what to make, and telling a story
          worth watching.
        </p>
      </Panel>
    </motion.div>
  </>
)

/* ------------------------------------------------------------------ */
/* A2 — What I'm building now / Lab                                    */
/* ------------------------------------------------------------------ */

export const Lab = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>The Lab</p>
      <h1 className={title}>What I&apos;m building now</h1>
      <p className={body}>
        The AI-assisted and agentic work — built fast, mostly solo.
      </p>

      <div className="grid grid-cols-2 portrait:grid-cols-1 gap-6">
        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            blind-code{' '}
            {/* TODO: real blind-code URL */}
            <a className={link} href="#" target="_blank" rel="noreferrer">
              ↗
            </a>
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            30-second promo built with Remotion, AI-assisted.
          </p>
          <MediaSlot label="blind-code promo (Remotion, ~30s)" className="aspect-video" />
        </div>

        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            AI recruitment videos
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            The campaigns from the story panel — see “Evolution of my job
            postings”.
          </p>
          <MediaSlot label="Best campaign reel (or reuse A1 assets)" className="aspect-video" />
        </div>

        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            “Your Agent Is a while Loop in a Trench Coat”
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            A talk on how agentic coding actually works under the hood.
          </p>
          <MediaSlot label="Talk slides or recording link" className="aspect-video" />
        </div>

        {/* TODO: Columbo — include only if Peter wants it public.
            Keep any DFDS-internal tooling (e.g. Smelt) generic or off. */}
        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            More agentic experiments
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            {/* TODO: confirm with Peter whether to feature Columbo publicly */}
            Internal tooling and side projects — described generically.
          </p>
          <MediaSlot label="Optional: Columbo / other experiment" className="aspect-video" />
        </div>
      </div>
    </Panel>
  </motion.div>
)

/* ------------------------------------------------------------------ */
/* A3 — Writing & talks                                                */
/* ------------------------------------------------------------------ */

// TODO: replace href="#" with Peter's actual post / talk URLs
const writingLinks = [
  { label: 'LinkedIn post — TODO: add link', href: '#' },
  { label: 'LinkedIn post — TODO: add link', href: '#' },
  { label: 'LinkedIn post — TODO: add link', href: '#' },
  {
    label: '“Your Agent Is a while Loop in a Trench Coat” — talk',
    href: '#',
  },
]

export const WritingTalks = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>Writing &amp; talks</p>
      <h1 className={title}>How I think, not just what I use</h1>
      <p className={body}>
        A few posts and a talk on building with AI, leading a frontend chapter,
        and shipping fast.
      </p>
      <ul className="space-y-4">
        {writingLinks.map((item, i) => (
          <li key={i} className="text-base portrait:text-2xl">
            <a className={link} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  </motion.div>
)

/* ------------------------------------------------------------------ */
/* A5 — Idea to result (timeboxes)                                     */
/* ------------------------------------------------------------------ */

// Only the blind-code timebox is confirmed (from the handover).
// TODO: get real numbers from Peter for the rest — do not invent.
const ideaCards = [
  { time: '~30 min', what: 'blind-code promo video', stack: 'Remotion + Claude' },
  { time: 'TODO', what: 'Recruitment campaign', stack: 'AI video tools' },
  { time: 'TODO', what: 'Prototype → demo', stack: 'Agentic workflow' },
]

export const IdeaToResult = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>Idea → result</p>
      <h1 className={title}>Speed is the signature</h1>
      <p className={body}>
        Concept to shipped artifact, timeboxed. The point isn&apos;t the tool —
        it&apos;s how fast a good idea becomes real.
      </p>
      <div className="grid grid-cols-3 portrait:grid-cols-1 gap-6">
        {ideaCards.map((card, i) => (
          <div
            key={i}
            className="rounded-lg bg-white/10 border border-white/20 p-5 flex flex-col"
          >
            <span className="text-3xl portrait:text-5xl font-bold text-white">
              {card.time}
            </span>
            <span className="mt-2 text-base portrait:text-2xl text-white/90">
              {card.what}
            </span>
            <span className="mt-1 text-sm portrait:text-xl text-white/70">
              {card.stack}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  </motion.div>
)
