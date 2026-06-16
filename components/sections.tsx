import React from 'react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

/*
 * New narrative panels for the horizontal scroll.
 * Each section returns one or more <motion.div animate={controls}> panels so they
 * sit as direct children of `.thumbnails` and inherit the existing spacing,
 * wheel-tilt and glass styling.
 *
 * Media is scaffolded with <MediaSlot> placeholders. Peter drops real assets in
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

// Real media: a click-to-play video with a poster (light mode keeps the heavy
// file from loading until the visitor hits play).
const LabVideo = ({
  url,
  thumb,
  className = '',
}: {
  url: string
  thumb?: string
  className?: string
}) => (
  <div
    className={`relative aspect-video w-full overflow-hidden rounded-lg bg-black/30 ${className}`}
  >
    <ReactPlayer
      className="absolute top-0 left-0"
      url={url}
      light={thumb || false}
      controls
      width="100%"
      height="100%"
    />
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
    <span>TODO media: {label}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/* A1. Evolution of my job postings (centerpiece)                      */
/* ------------------------------------------------------------------ */

const jobPostingPhases = [
  {
    eyebrow: 'Phase 1 · Stills',
    heading: 'AI-generated images',
    copy: 'Job ads built from AI stills that played on familiar pop culture. Quick to make, hard to scroll past.',
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
    copy: 'As the tools matured, the stills turned into short AI-generated videos. Same ideas, now moving.',
    slots: ['Short recruitment video (~15s)'],
    grid: 'grid grid-cols-1 gap-4',
    slotClass: 'aspect-video',
  },
  {
    eyebrow: 'Phase 3 · Productions',
    heading: 'Multi-scene mini campaigns',
    copy: 'Full productions: storyboarded scenes, music, product highlights. Small campaigns, made solo.',
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
          As the hiring manager I made every campaign below myself, with AI.
          Scroll right to watch them grow from a single generated image into
          full multi-scene productions.
        </p>
        <p className="text-sm portrait:text-xl text-white/70">
          Stills, then short videos, then mini campaigns.
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

    {/* Closing, the point */}
    <motion.div animate={controls}>
      <Panel glassEffect={glassEffect}>
        <p className={eyebrow}>The point</p>
        <h1 className={title}>The bottleneck has moved to taste and direction.</h1>
        <p className={body}>
          As the tools matured, the ambition scaled with them. The hard part is
          no longer production. It is knowing what to make, and telling a story
          worth watching.
        </p>
      </Panel>
    </motion.div>
  </>
)

/* ------------------------------------------------------------------ */
/* A2. What I'm building now (the Lab)                                 */
/* ------------------------------------------------------------------ */

export const Lab = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>The Lab</p>
      <h1 className={title}>What I&apos;m building now</h1>
      <p className={body}>
        Agentic and AI-assisted projects, built fast and mostly solo. The
        recruitment campaigns above are part of the same habit.
      </p>

      <div className="grid grid-cols-2 portrait:grid-cols-1 gap-6">
        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            blind-code{' '}
            <a
              className={link}
              href="https://blind-code.vlx.dk"
              target="_blank"
              rel="noreferrer"
            >
              blind-code.vlx.dk
            </a>
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            A personal project with a 30 second promo built in Remotion, using
            real elements from the app.
          </p>
          <LabVideo url="/blind-code-promo.mp4" thumb="/blind-code-promo.jpg" />
        </div>

        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            Smelt
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            A personal playground: a multi-agent PR-drafting pipeline. A Tauri
            desktop app wrapping the Copilot CLI SDK, with architect, reviewer
            and test-writer agents behind quality gates. The clip is a 15x
            speed-run of a full run.
          </p>
          <LabVideo url="/smelt.mp4" thumb="/smelt.jpg" />
        </div>

        <div>
          <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
            Columbo
          </h2>
          <p className="mb-3 text-sm portrait:text-xl text-white/80">
            A chaos-board view of an agent&apos;s internals (Vite, React, Hono,
            raw OpenAI calls), built to make a running agent&apos;s decisions
            legible.
          </p>
          <MediaSlot label="Columbo screenshot or short clip" className="aspect-video" />
        </div>
      </div>
    </Panel>
  </motion.div>
)

/* ------------------------------------------------------------------ */
/* A5. Idea to result (timeboxes)                                      */
/* ------------------------------------------------------------------ */

// Only the blind-code timebox is confirmed. Get real numbers from Peter for the
// rest before publishing. Do not invent them.
const ideaCards = [
  { time: '~30 min', what: 'blind-code promo video', stack: 'Remotion, AI-assisted' },
  { time: 'TODO', what: 'Recruitment campaign', stack: 'AI video tools' },
  { time: 'TODO', what: 'Prototype to demo', stack: 'Agentic workflow' },
]

export const IdeaToResult = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>Idea to result</p>
      <h1 className={title}>Speed is the signature</h1>
      <p className={body}>
        Concept to shipped artifact, timeboxed. The point is not the tool. It is
        how fast a good idea becomes real.
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

/* ------------------------------------------------------------------ */
/* A3. Writing                                                         */
/* ------------------------------------------------------------------ */

// TODO: replace href="#" with Peter's actual post URLs.
const writingLinks = [
  { label: 'LinkedIn post (TODO: add link)', href: '#' },
  { label: 'LinkedIn post (TODO: add link)', href: '#' },
  { label: 'LinkedIn post (TODO: add link)', href: '#' },
]

export const WritingTalks = ({ controls, glassEffect }: SectionProps) => (
  <motion.div animate={controls}>
    <Panel glassEffect={glassEffect}>
      <p className={eyebrow}>Writing</p>
      <h1 className={title}>How I think, not just what I use</h1>
      <p className={body}>
        A few posts on building with AI, leading a frontend chapter, and
        shipping fast.
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
