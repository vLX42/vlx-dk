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
/* A6. Professional timeline (closing card)                            */
/* ------------------------------------------------------------------ */

type TimelineItem = {
  year: string
  role: string
  desc: string
  pivot?: boolean
}

// The full arc, condensed to one line each. Pivots (founding a company, moving
// full-time, changing chapter) get the teal accent and a filled node.
const timeline: TimelineItem[] = [
  {
    year: '1998 to 2000',
    role: 'System Developer, Datagruppen Consult',
    desc: 'Built Sitebuilder, a CMS, for the sister company Netmaster, and a city portal system for Esbjerg and a few other cities.',
  },
  {
    year: '2000 to 2002',
    role: 'System Developer, Telia Internet A/S',
    desc: "Joined through Telia's buy of Netmaster. Built Siteworks, a SaaS reseller platform for registering domains and spinning up sites.",
  },
  {
    year: 'Late 2002',
    role: 'Founded Siteworks ApS',
    desc: 'Telia closed its Danish internet projects, so my partners and I bought the product. Incorporated 4 December 2002.',
    pivot: true,
  },
  {
    year: '2003 to 2006',
    role: 'System Developer, SHG.dk (now Proshop.dk)',
    desc: 'E-commerce, ERP, inventory and RMA by day, with Siteworks running part-time. Also export and display work at Designvision.',
  },
  {
    year: '2007 to 2019',
    role: 'Lead Developer and Partner, Siteworks ApS',
    desc: 'Grew it into a 15 to 18 person agency on our own in-house CMS. Clients included IBM, Deloitte, Dong Energy and Advodan.',
    pivot: true,
  },
  {
    year: '2019 to 2023',
    role: 'Senior Full Stack Developer, DFDS',
    desc: 'Led the MyFreight2 rewrite (React, Nest.js BFF, Redis, Kafka) and started the Frontend Community.',
  },
  {
    year: '2023 to present',
    role: 'Frontend Chapter Lead, DFDS',
    desc: 'Own frontend standards across teams. Authored the Control Tower POC, built AI document ingestion in MyFreight, and mentor the chapter.',
    pivot: true,
  },
]

const TimelineEntry = ({ item }: { item: TimelineItem }) => (
  <li className="relative pl-6 pb-4 last:pb-0">
    <span
      className={`absolute left-0 top-[0.35rem] -translate-x-1/2 rounded-full ${
        item.pivot
          ? 'h-3 w-3 portrait:h-4 portrait:w-4 bg-teal-300 ring-2 ring-teal-300/40'
          : 'h-2.5 w-2.5 portrait:h-3.5 portrait:w-3.5 bg-[#0b0e16] border-2 border-sky-400'
      }`}
    />
    <div
      className={`text-xs portrait:text-base font-bold uppercase tracking-[0.12em] ${
        item.pivot ? 'text-teal-300' : 'text-sky-300'
      }`}
    >
      {item.year}
    </div>
    <div className="mt-0.5 text-tiny portrait:text-xl font-bold leading-snug text-white">
      {item.role}
    </div>
    <p className="mt-1 text-xs portrait:text-base leading-snug text-white/70">
      {item.desc}
    </p>
  </li>
)

export const TimelineCard = ({ glassEffect }: { glassEffect: boolean }) => {
  const mid = Math.ceil(timeline.length / 2)
  const columns = [timeline.slice(0, mid), timeline.slice(mid)]
  return (
    <Card glassEffect={glassEffect}>
      <p className={eyebrow}>The whole arc</p>
      <h1 className="mb-1 text-4xl portrait:text-6xl font-bold tracking-tight leading-[1.05] text-white">
        Professional timeline
      </h1>
      <p className="mb-4 text-sm portrait:text-xl text-white/60">
        1998 to present, the short version.
      </p>

      <div className="mb-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs portrait:text-base leading-relaxed text-white/65 max-w-3xl">
        <span className="font-semibold text-white/90">Education:</span>{' '}
        Datamatiker, Esbjerg, 1995 to 1998.{' '}
        <span className="font-semibold text-white/90">Alongside, 1995 to 2005:</span>{' '}
        CompuClub, a computer club running net parties and a computer news page.
      </div>

      <div className="grid grid-cols-2 portrait:grid-cols-1 gap-x-10 portrait:gap-x-0 gap-y-4">
        {columns.map((col, ci) => (
          <ol
            key={ci}
            className="relative border-l-2 border-white/15"
          >
            {col.map((item) => (
              <TimelineEntry key={item.role} item={item} />
            ))}
          </ol>
        ))}
      </div>
    </Card>
  )
}

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
