import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import StyledMarkdown from './cv.styled'
import cv from '../types/cv'

// Lazy-load the player: react-player/lazy only pulls the player it needs, and
// next/dynamic keeps it out of the initial bundle (loads when a video mounts).
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

/*
 * Deck content. Each exported piece returns a <Card> (a glass panel that fills
 * its deck-stop via absolute inset-0). content.tsx stacks these and switches
 * between them in place as you scroll through a sub-deck.
 */

const eyebrow =
  'mb-3 text-[0.7rem] portrait:text-xl font-semibold tracking-[0.25em] text-white/60 uppercase'
const title =
  'mb-5 portrait:mb-4 text-4xl portrait:text-6xl font-bold tracking-tight leading-[1.05] text-white'
const body =
  'mb-6 text-lg portrait:text-2xl leading-relaxed text-white/85 lg:text-left max-w-2xl'
const link =
  'text-white underline decoration-white/40 underline-offset-4 hover:decoration-white'

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
    <div className="deck-text relative z-10 h-full overflow-hidden">
      <div className="min-h-full flex flex-col justify-center px-10 py-9 lg:px-20 lg:py-14">
        {children}
      </div>
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
  // Cap the width so a full-bleed 16:9 video can never be taller than ~46vh and
  // overflow its card. Multi-column videos are narrower than the cap already.
  <div className="mx-auto w-full" style={{ maxWidth: 'calc(46vh * 16 / 9)' }}>
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
          className="max-h-[44vh] max-w-full w-auto mx-auto rounded-lg shadow-lg"
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
]

/* ------------------------------------------------------------------ */
/* A2. What I'm building now (the Lab)                                 */
/* ------------------------------------------------------------------ */

export const LabCard = ({ glassEffect }: { glassEffect: boolean }) => (
  <Card glassEffect={glassEffect}>
    <p className={eyebrow}>The Lab</p>
    <h1 className={title}>What I&apos;m building now</h1>
    <p className="mb-3 text-lg portrait:text-2xl leading-relaxed text-white/85 max-w-2xl">
      Most developers use AI to write code. I build the systems that do it:
      agents, pipelines and harnesses, mostly solo and fast.
    </p>

    <div className="grid grid-cols-2 portrait:grid-cols-1 gap-6 mt-0">
      <div>
        <LabVideo url="/blind-code-promo.mp4" thumb="/blind-code-promo.jpg" />
        <h2 className="mt-2 text-lg portrait:text-3xl font-bold text-white">
          blind-code
        </h2>
        <p className="mt-1 text-sm portrait:text-xl text-white/75">
          A game for coders, made for events. React + Convex on Vercel, promo
          built in Remotion.{' '}
          <a
            className={link}
            href="https://blind-code.vlx.dk"
            target="_blank"
            rel="noreferrer"
          >
            blind-code.vlx.dk
          </a>
        </p>
      </div>

      <div>
        <LabVideo url="/smelt.mp4" thumb="/smelt.jpg" />
        <h2 className="mt-2 text-lg portrait:text-3xl font-bold text-white">
          Smelt
        </h2>
        <p className="mt-1 text-sm portrait:text-xl text-white/75">
          A multi-agent PR-drafting pipeline: a Tauri app over the Copilot CLI SDK,
          with architect, reviewer and test-writer agents behind quality gates.
          The clip is a 15x speed-run.
        </p>
      </div>
    </div>
  </Card>
)

/* ------------------------------------------------------------------ */
/* A5. Idea to result (timeboxes)                                      */
/* ------------------------------------------------------------------ */

export const IdeaCard = ({ glassEffect }: { glassEffect: boolean }) => (
  <Card glassEffect={glassEffect}>
    <p className={eyebrow}>Idea to result</p>
    <h1 className={title}>The prompt is the craft now</h1>
    <div className="flex portrait:flex-col items-center gap-8 lg:gap-12">
      <div className="w-1/2 portrait:w-full">
        <LabVideo url="/blind-code-promo.mp4" thumb="/blind-code-promo.jpg" />
      </div>
      <div className="w-1/2 portrait:w-full">
        <p className="mb-5 text-base portrait:text-2xl leading-relaxed text-white/85">
          I made this 30-second promo for blind-code in about 20 minutes, with
          three prompts. Remotion reused the real components from the site, so the
          time went into direction, not keyframes: what to show, the pacing, the
          music. The model fills a blank. It does not take a seat.
        </p>
        <ol className="space-y-2 text-sm portrait:text-xl text-white/70 list-decimal list-inside">
          <li>
            A 20s promo of the front page, editor and voting, with power mode.
            Use Remotion.
          </li>
          <li>Here is the music. Run it about 25s, then fade.</li>
          <li>Here is the live URL. Pull from it, fade the music at the end.</li>
        </ol>
      </div>
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
}) => {
  const tech = (cv.technology || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  return (
    <Card glassEffect={glassEffect}>
      {/* Big faded year as an editorial accent. */}
      <span className="pointer-events-none select-none absolute top-4 right-7 portrait:right-10 text-7xl portrait:text-9xl font-bold leading-none text-white/[0.07]">
        {cv.year}
      </span>

      <div className="relative flex portrait:flex-col items-center gap-8 lg:gap-12">
        <div className="w-1/2 portrait:w-full">
          {cv.coverImage && (
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <Image
                src={cv.coverImage}
                className="w-full h-auto object-cover object-center"
                width="720"
                height="576"
                alt=""
              />
            </div>
          )}
          {cv.video && (
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black/30">
              <ReactPlayer
                className="absolute inset-0"
                width="100%"
                height="100%"
                controls
                url={cv.video}
                light={cv.videoThumb}
              />
            </div>
          )}
        </div>

        <div className="w-1/2 portrait:w-full">
          <StyledMarkdown>{cv.content}</StyledMarkdown>
          {tech.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs portrait:text-lg px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
