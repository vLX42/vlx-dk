import React, { useCallback, useEffect, useState } from 'react'

/*
 * Jump-to-panel navigation for the horizontal scroll.
 *
 * The scroll is driven by vertical scrollY mapped to a horizontal transform
 * (see content.tsx). To jump to a panel we measure each panel's layout left,
 * convert it to a scroll progress, and window.scrollTo the matching scrollY.
 * The existing spring then animates the horizontal move for free.
 */

type Props = {
  scrollRef: React.RefObject<HTMLElement>
  scrollRange: number
  viewportW: number
  labels?: string[]
}

const PanelNav = ({ scrollRef, scrollRange, viewportW, labels = [] }: Props) => {
  const [lefts, setLefts] = useState<number[]>([])
  const [active, setActive] = useState(0)

  const maxX = Math.max(scrollRange - viewportW, 1)

  // Measure each panel's layout position once sizes are known.
  useEffect(() => {
    const container = scrollRef.current?.querySelector('.thumbnails')
    if (!container) return
    const children = Array.from(container.children) as HTMLElement[]
    setLefts(children.map((c) => c.offsetLeft))
  }, [scrollRef, scrollRange, viewportW])

  const goTo = useCallback(
    (i: number) => {
      const target = lefts[i]
      if (target == null) return
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min(Math.max(target / maxX, 0), 1)
      window.scrollTo({ top: p * maxY, behavior: 'smooth' })
    },
    [lefts, maxX]
  )

  // Track which panel is closest to the current scroll position.
  useEffect(() => {
    if (!lefts.length) return
    const onScroll = () => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      if (maxY <= 0) return
      const x = (window.scrollY / maxY) * maxX
      let idx = 0
      let best = Infinity
      lefts.forEach((l, i) => {
        const d = Math.abs(l - x)
        if (d < best) {
          best = d
          idx = i
        }
      })
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [lefts, maxX])

  // Left / right arrow keys jump between panels.
  useEffect(() => {
    if (!lefts.length) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(Math.min(active + 1, lefts.length - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(Math.max(active - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, lefts.length, goTo])

  if (lefts.length < 2) return null

  const btn =
    'flex items-center justify-center w-8 h-8 rounded-full text-white text-lg leading-none bg-white/15 hover:bg-white/30 focus:outline-none disabled:opacity-30 transition'

  return (
    <nav
      aria-label="Section navigation"
      className="glass background fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3 py-2 font-poppins"
    >
      <button
        className={btn}
        onClick={() => goTo(Math.max(active - 1, 0))}
        disabled={active === 0}
        aria-label="Previous panel"
      >
        ‹
      </button>

      <div className="flex items-center gap-2">
        {lefts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={labels[i] || `Panel ${i + 1}`}
            aria-current={i === active}
            title={labels[i] || `Panel ${i + 1}`}
            className={`h-2 rounded-full transition-all focus:outline-none ${
              i === active
                ? 'w-5 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <button
        className={btn}
        onClick={() => goTo(Math.min(active + 1, lefts.length - 1))}
        disabled={active === lefts.length - 1}
        aria-label="Next panel"
      >
        ›
      </button>
    </nav>
  )
}

export default PanelNav
