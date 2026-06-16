import React from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import StyledMarkdown from './cv.styled'
import cv from '../types/cv'

/*
 * Deck content. Each exported piece returns a <Card> (a glass panel that fills
 * its deck-stop via absolute inset-0). content.tsx stacks these and switches
 * between them in place as you scroll through a sub-deck.
 */

const eyebrow =
  'mb-2 text-xs portrait:text-xl font-medium tracking-widest text-white/80 uppercase'
const title =
  'mb-6 portrait:mb-4 text-2xl portrait:text-6xl font-bold tracking-tighter text-white'
const body =
  'mb-6 text-base portrait:text-2xl leading-relaxed text-white/90 lg:text-left'
const link = 'text-white underline hover:text-gray-200'

// A single stacked card. Fills its deck-stop. `bare` skips the glass styling
// (used for the intro card, which sits transparent over the animated bg).
export const Card = ({
  children,
  glassEffect,
  bare = false,
}: {
  children: React.ReactNode
  glassEffect: boolean
  bare?: boolean
}) => (
  <div
    className={`absolute inset-0 rounded-3xl text-white body-font ${
      bare ? '' : glassEffect ? 'background glass' : 'card-solid'
    }`}
  >
    <div className="deck-text relative z-10 px-8 py-8 lg:px-12 lg:py-12 h-full flex flex-col justify-center overflow-y-auto">
      {children}
    </div>
  </div>
)

// Click-to-play video with a poster (light mode keeps heavy files from loading
// until the visitor hits play).
const LabVideo = ({
  url,
  thumb,
}: {
  url: string
  thumb?: string
}) => (
  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/30">
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

// Dashed placeholder for media still to come.
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
/* A1. Evolution of my job postings (Story sub-deck)                   */
/* ------------------------------------------------------------------ */

type PhaseMedia = {
  type: 'image' | 'video'
  src: string
  thumb?: string
  alt?: string
}

type Phase = {
  eyebrow: string
  heading: string
  copy: string
  grid: string
  media: PhaseMedia[]
}

const jobPostingPhases: Phase[] = [
  {
    eyebrow: 'Phase 1 · Stills',
    heading: 'AI-generated images',
    copy: 'Job ads built from AI stills riffing on Pixar and Disney, made with whatever image model was best at the time (nano banana). A few tries, an afternoon each.',
    grid: 'grid grid-cols-2 portrait:grid-cols-1 gap-4 items-start',
    media: [
      {
        type: 'image',
        src: '/job-dfds-pixar-poster.jpg',
        alt: 'Pixar-style DFDS job poster',
      },
      {
        type: 'image',
        src: '/job-frontend-engineer.jpg',
        alt: 'Cartoon Frontend Engineer job ad',
      },
    ],
  },
  {
    eyebrow: 'Phase 2 · Motion',
    heading: 'Short AI videos',
    copy: 'The stills started moving. Short AI videos, an afternoon of work, riding each new best model as it landed (Sora, then Veo 3).',
    grid: 'grid grid-cols-2 portrait:grid-cols-1 gap-4',
    media: [
      { type: 'video', src: '/recruit-ux.mp4', thumb: '/recruit-ux.jpg' },
      { type: 'video', src: '/recruit-lead1.mp4', thumb: '/recruit-lead1.jpg' },
    ],
  },
  {
    eyebrow: 'Phase 3 · Productions',
    heading: 'Multi-scene mini campaigns',
    copy: 'Full mini campaigns: multi-scene video from Seedance 2.0 with music from ElevenLabs. Still one afternoon, still solo.',
    grid: 'grid grid-cols-1 gap-4',
    media: [
      {
        type: 'video',
        src: '/recruit-lead-trailer.mp4',
        thumb: '/recruit-lead-trailer.jpg',
      },
    ],
  },
]

const PhaseMediaGrid = ({ phase }: { phase: Phase }) => (
  <div className={phase.grid}>
    {phase.media.map((m, i) =>
      m.type === 'video' ? (
        <LabVideo key={i} url={m.src} thumb={m.thumb} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={m.src}
          alt={m.alt || ''}
          loading="lazy"
          className="w-full h-auto rounded-lg"
        />
      )
    )}
  </div>
)

// The Story sub-deck: intro, one card per phase, closing.
export const getStoryCards = (glassEffect: boolean): React.ReactNode[] => [
  <Card glassEffect={glassEffect} key="story-intro">
    <p className={eyebrow}>The story</p>
    <h1 className={title}>Evolution of my job postings</h1>
    <p className={body}>
      As the hiring manager, I made every campaign in this deck myself with AI. I
      was building out a frontend team (a few mid-levels, a senior, two leads),
      and the ads got noticed: candidates brought them up in interviews. Keep
      scrolling to flip through them, from a single generated image to full
      multi-scene productions.
    </p>
    <p className="text-sm portrait:text-xl text-white/70">
      Stills, then short videos, then mini campaigns.
    </p>
  </Card>,
  ...jobPostingPhases.map((phase) => (
    <Card glassEffect={glassEffect} key={phase.eyebrow}>
      <p className={eyebrow}>{phase.eyebrow}</p>
      <h1 className={title}>{phase.heading}</h1>
      <p className={body}>{phase.copy}</p>
      <PhaseMediaGrid phase={phase} />
    </Card>
  )),
  <Card glassEffect={glassEffect} key="story-closing">
    <p className={eyebrow}>The point</p>
    <h1 className={title}>The bottleneck has moved to taste and direction.</h1>
    <p className={body}>
      As the tools matured, the ambition scaled with them. The hard part is no
      longer production. It is knowing what to make, and telling a story worth
      watching.
    </p>
  </Card>,
]

/* ------------------------------------------------------------------ */
/* A2. What I'm building now (the Lab)                                 */
/* ------------------------------------------------------------------ */

export const LabCard = ({ glassEffect }: { glassEffect: boolean }) => (
  <Card glassEffect={glassEffect}>
    <p className={eyebrow}>The Lab</p>
    <h1 className={title}>What I&apos;m building now</h1>
    <p className={body}>
      Agentic and AI-assisted projects, built fast and mostly solo. The
      recruitment campaigns in the Story deck are part of the same habit.
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
          A game for coders and web developers, a fun thing to do at an event.
          React and Convex, hosted on Vercel. The 30 second promo below is built
          in Remotion from real elements of the app.
        </p>
        <LabVideo url="/blind-code-promo.mp4" thumb="/blind-code-promo.jpg" />
      </div>

      <div>
        <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
          Smelt
        </h2>
        <p className="mb-3 text-sm portrait:text-xl text-white/80">
          A personal playground: a multi-agent PR-drafting pipeline. A Tauri
          desktop app wrapping the Copilot CLI SDK, with architect, reviewer and
          test-writer agents behind quality gates. The clip is a 15x speed-run of
          a full run.
        </p>
        <LabVideo url="/smelt.mp4" thumb="/smelt.jpg" />
      </div>

      <div>
        <h2 className="mb-2 text-lg portrait:text-3xl font-bold text-white">
          Columbo
        </h2>
        <p className="mb-3 text-sm portrait:text-xl text-white/80">
          A chaos-board view of an agent&apos;s internals (Vite, React, Hono, raw
          OpenAI calls), built to make a running agent&apos;s decisions legible.
        </p>
        <MediaSlot label="Columbo screenshot or short clip" className="aspect-video" />
      </div>
    </div>
  </Card>
)

/* ------------------------------------------------------------------ */
/* A5. Idea to result (timeboxes)                                      */
/* ------------------------------------------------------------------ */

const ideaCards = [
  { time: '~30 min', what: 'blind-code promo video', stack: 'Remotion, AI-assisted' },
  {
    time: 'An afternoon',
    what: 'AI recruitment campaign',
    stack: 'Seedance 2.0 + ElevenLabs',
  },
]

export const IdeaCard = ({ glassEffect }: { glassEffect: boolean }) => (
  <Card glassEffect={glassEffect}>
    <p className={eyebrow}>Idea to result</p>
    <h1 className={title}>Speed is the signature</h1>
    <p className={body}>
      Concept to shipped artifact, timeboxed. The point is not the tool. It is
      how fast a good idea becomes real.
    </p>
    <div className="grid grid-cols-2 portrait:grid-cols-1 gap-6">
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
  </Card>
)

/* ------------------------------------------------------------------ */
/* Experience sub-deck: one card per CV entry                          */
/* ------------------------------------------------------------------ */

export const CvCard = ({
  cv,
  glassEffect,
}: {
  cv: cv
  glassEffect: boolean
}) => (
  <Card glassEffect={glassEffect}>
    <div className="flex flex-wrap items-center gap-y-6">
      <div className="w-2/6 portrait:w-full portrait:px-32 p-2">
        {cv.coverImage && (
          <Image
            src={cv.coverImage}
            className="object-cover object-center rounded"
            width="720"
            height="576"
            alt=""
          />
        )}
        {cv.video && (
          <ReactPlayer
            className="object-cover portrait:scale-75 object-center rounded"
            width="100%"
            controls
            url={cv.video}
            light={cv.videoThumb}
          />
        )}
      </div>
      <div className="w-4/6 portrait:w-full">
        <StyledMarkdown>{cv.content}</StyledMarkdown>
      </div>
    </div>
    <div className="absolute bottom-6 left-8 text-sm portrait:text-lg text-white/70">
      Tech: <i>{cv.technology}</i>
    </div>
  </Card>
)
