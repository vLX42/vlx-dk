import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
} from 'framer-motion'
import { useWheel } from '@use-gesture/react'
import { useQueryState } from 'nuqs'
import FrontPage from './frontpage'
import { getStoryCards, LabCard, IdeaCard, CvCard } from './sections'
import PanelNav from './panelNav'
import cv from '../types/cv'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type contentProps = {
  data: cv[]
  lowFrameRate: boolean
}

const physics = { damping: 15, mass: 0.27, stiffness: 55 }

// How much vertical scroll each sub-card (frame) gets, as a fraction of the
// viewport height. Higher = slower, more deliberate flipping.
const SCROLL_PER_FRAME = 0.85

const Content = ({ data, lowFrameRate }: contentProps) => {
  const glassEffect = !lowFrameRate
  const scrollRef = useRef<HTMLElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [viewportW, setViewportW] = useState(0)
  const [viewportH, setViewportH] = useState(800)
  const [stopOffsets, setStopOffsets] = useState<number[]>([])
  // Deep-linkable deck position via nuqs (?deck=story, ?deck=lab, ?deck=dfds ...)
  const [, setDeckParam] = useQueryState('deck', {
    history: 'replace',
    scroll: false,
  })
  const didInitNav = useRef(false)

  // The top-level deck. Only the AI job-posting Story is a stacked sub-deck;
  // everything else (including each CV entry) is its own single-card stop.
  const stops = useMemo(() => {
    const base = [
      {
        label: 'Intro',
        slug: 'intro',
        cards: [
          <div key="intro" className="absolute inset-0 text-white">
            <FrontPage />
          </div>,
        ],
      },
      { label: 'Story', slug: 'story', cards: getStoryCards(glassEffect) },
      {
        label: 'Lab',
        slug: 'lab',
        cards: [<LabCard key="lab" glassEffect={glassEffect} />],
      },
      {
        label: 'Idea',
        slug: 'idea',
        cards: [<IdeaCard key="idea" glassEffect={glassEffect} />],
      },
    ]
    const cvStops = data.map((c) => ({
      label: c.year || 'Work',
      slug: c.slug,
      cards: [<CvCard key={c.slug} cv={c} glassEffect={glassEffect} />],
    }))
    return [...base, ...cvStops]
  }, [data, glassEffect])

  // Flatten into frames (one per sub-card) and record where each stop starts.
  const { frames, firstFrame } = useMemo(() => {
    const frames: { si: number; sj: number }[] = []
    const firstFrame: number[] = []
    let count = 0
    stops.forEach((s, si) => {
      firstFrame[si] = count
      s.cards.forEach((_, sj) => frames.push({ si, sj }))
      count += s.cards.length
    })
    return { frames, firstFrame }
  }, [stops])

  const F = frames.length

  // Latest measured stop offsets, read inside the scroll transform.
  const offsetsRef = useRef<number[]>([])
  offsetsRef.current = stopOffsets
  const framesRef = useRef(frames)
  framesRef.current = frames

  const { scrollYProgress } = useScroll()

  // Horizontal position: a step function of the current stop. Flat (held) while
  // flipping a sub-deck, ramps between stops. The spring smooths the slide.
  const xTransform = useTransform(scrollYProgress, (v) => {
    const offs = offsetsRef.current
    const fr = framesRef.current
    if (!offs.length || fr.length < 2) return 0
    const pos = Math.min(Math.max(v, 0), 1) * (fr.length - 1)
    const i0 = Math.floor(pos)
    const i1 = Math.min(i0 + 1, fr.length - 1)
    const t = pos - i0
    const x0 = -(offs[fr[i0].si] || 0)
    const x1 = -(offs[fr[i1].si] || 0)
    return x0 + (x1 - x0) * t
  })
  const spring = useSpring(xTransform, physics)

  // Which frame we're closest to (drives sub-card switching + nav).
  const [activeFrame, setActiveFrame] = useState(0)
  useEffect(() => {
    const update = (v: number) => {
      const idx = Math.round(Math.min(Math.max(v, 0), 1) * (F - 1))
      setActiveFrame(Math.min(Math.max(idx, 0), F - 1))
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.onChange(update)
    return () => unsub()
  }, [scrollYProgress, F])

  // Track viewport width (retrigger measurement) and height (scroll length).
  const onResize = useCallback((entries: any) => {
    for (let entry of entries) setViewportW(entry.contentRect.width)
  }, [])

  useIsomorphicLayoutEffect(() => {
    const ro = new ResizeObserver((entries) => onResize(entries))
    if (ghostRef.current) ro.observe(ghostRef.current)
    return () => ro.disconnect()
  }, [onResize])

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') setViewportH(window.innerHeight)
  }, [viewportW])

  // Measure each deck-stop's layout position for the horizontal transform.
  useIsomorphicLayoutEffect(() => {
    const container = scrollRef.current?.querySelector('.thumbnails')
    if (!container) return
    const kids = Array.from(container.children) as HTMLElement[]
    setStopOffsets(kids.map((k) => k.offsetLeft))
  }, [stops, viewportW])

  const ghostHeight = Math.max(F, 2) * SCROLL_PER_FRAME * viewportH

  // Wheel tilt (kept from the original interaction).
  const controls = useAnimation()
  const clamp = useCallback(
    (value: number, clampAt = 5) =>
      value > 0 ? Math.min(value, clampAt) : Math.max(value, -clampAt),
    []
  )
  const wheel = useWheel((event) => {
    controls.start({
      transform: `perspective(800px) rotateY(${
        event.wheeling ? clamp(event.delta[1]) : 0
      }deg)`,
    })
  })

  // Jump to a given frame, with a brief tilt toward the direction of travel.
  const goToFrame = useCallback(
    (f: number) => {
      const clamped = Math.min(Math.max(f, 0), F - 1)
      const dir = Math.sign(clamped - activeFrame)
      if (dir !== 0) {
        controls.start({
          transform: `perspective(800px) rotateY(${dir * 5}deg)`,
        })
        window.setTimeout(() => {
          controls.start({ transform: `perspective(800px) rotateY(0deg)` })
        }, 260)
      }
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      const p = F > 1 ? clamped / (F - 1) : 0
      window.scrollTo({ top: p * maxY, behavior: 'smooth' })
    },
    [F, activeFrame, controls]
  )

  const activeStop = frames[activeFrame]?.si ?? 0
  const subActive = activeFrame - (firstFrame[activeStop] ?? 0)
  const subCount = stops[activeStop]?.cards.length ?? 1

  // On first load, jump to the deck named in ?deck=... (shareable links). Read
  // it straight from the URL once layout is measured, so there is no race with
  // router/nuqs query hydration.
  useEffect(() => {
    if (didInitNav.current) return
    if (!stopOffsets.length) return
    didInitNav.current = true
    const initial = new URLSearchParams(window.location.search).get('deck')
    if (!initial) return
    const idx = stops.findIndex((s) => s.slug === initial)
    if (idx > 0) window.requestAnimationFrame(() => goToFrame(firstFrame[idx]))
  }, [stopOffsets, stops, firstFrame, goToFrame])

  // Reflect the current deck in the URL as you browse. scroll:false is critical:
  // without it every URL update would yank the window back to the top.
  useEffect(() => {
    if (!didInitNav.current) return
    const slug = stops[activeStop]?.slug
    setDeckParam(slug && slug !== 'intro' ? slug : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStop])

  return (
    <>
      <div className="scroll-container pl-5 font-poppins font-light" {...wheel()}>
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container"
        >
          <div className="thumbnails">
            {stops.map((s, si) => {
              const stopActiveSub = Math.min(
                Math.max(activeFrame - firstFrame[si], 0),
                s.cards.length - 1
              )
              return (
                <motion.div
                  key={si}
                  animate={controls}
                  className="thumbnail relative"
                >
                  {s.cards.map((card, sj) => {
                    // Like a hand of playing cards: top card face-up, the rest
                    // fanned behind it; advancing deals the top card off with a
                    // spin and brings the next one to the front.
                    const depth = sj - stopActiveSub
                    const behind = Math.min(Math.max(depth, 0), 4)
                    const anim =
                      depth === 0
                        ? { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1 }
                        : depth < 0
                        ? {
                            // dealt off the top, spins away to the left
                            x: '-65%',
                            y: '-14%',
                            rotate: -26,
                            scale: 0.9,
                            opacity: 0,
                          }
                        : {
                            // fanned in hand behind the top card
                            x: `${behind * 5}%`,
                            y: `${behind * 1.8}%`,
                            rotate: behind * 3.5,
                            scale: 1 - behind * 0.04,
                            opacity: depth > 4 ? 0 : 0.72 - behind * 0.13,
                          }
                    const zIndex =
                      depth === 0 ? 60 : depth < 0 ? 5 : 60 - behind
                    // GPU budget: the costly displacement glass runs only on the
                    // single active top card; immediate neighbours get cheap
                    // blur-only glass; stacked/offscreen cards drop the filter.
                    const dist = Math.abs(si - activeStop)
                    const fxClass =
                      depth !== 0
                        ? ' no-glass-fx'
                        : dist === 0
                        ? ''
                        : dist === 1
                        ? ' glass-lite'
                        : ' no-glass-fx'
                    // Push stacked cards back: dim + soften so the top card leads.
                    const behindClass = depth > 0 ? ' deck-behind' : ''
                    return (
                      <motion.div
                        key={sj}
                        className={`absolute inset-0${fxClass}${behindClass}`}
                        initial={false}
                        animate={anim}
                        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                        style={{
                          zIndex,
                          pointerEvents: depth === 0 ? 'auto' : 'none',
                          transformOrigin: 'bottom center',
                        }}
                      >
                        {card}
                      </motion.div>
                    )
                  })}
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: ghostHeight }} className="ghost" />
      <PanelNav
        labels={stops.map((s) => s.label)}
        activeIndex={activeStop}
        subActive={subActive}
        subCount={subCount}
        onSelect={(si) => goToFrame(firstFrame[si])}
        onPrev={() => goToFrame(activeFrame - 1)}
        onNext={() => goToFrame(activeFrame + 1)}
      />
    </>
  )
}

export default Content
