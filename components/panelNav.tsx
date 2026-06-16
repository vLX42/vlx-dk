import React, { useEffect } from 'react'

/*
 * Deck navigation. Shows one dot per top-level stop plus, when the active stop
 * is a sub-deck, a row of pips for its sub-cards. Arrows and the left/right keys
 * step frame-by-frame (flip within a sub-deck, then advance to the next stop).
 */

type Props = {
  labels: string[]
  activeIndex: number
  subActive: number
  subCount: number
  onSelect: (i: number) => void
  onPrev: () => void
  onNext: () => void
}

const PanelNav = ({
  labels,
  activeIndex,
  subActive,
  subCount,
  onSelect,
  onPrev,
  onNext,
}: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNext, onPrev])

  if (labels.length < 2) return null

  const btn =
    'flex items-center justify-center w-8 h-8 rounded-full text-white text-lg leading-none bg-white/15 hover:bg-white/30 focus:outline-none transition'

  return (
    <nav
      aria-label="Section navigation"
      className="glass background fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3 py-2 font-poppins"
    >
      <button className={btn} onClick={onPrev} aria-label="Previous">
        ‹
      </button>

      <div className="flex items-center gap-2">
        {labels.map((label, i) => {
          const isActive = i === activeIndex
          return (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => onSelect(i)}
                aria-label={label}
                aria-current={isActive}
                title={label}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  isActive ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
              {/* Sub-deck pips for the active stop */}
              {isActive && subCount > 1 && (
                <span className="flex items-center gap-1">
                  {Array.from({ length: subCount }).map((_, s) => (
                    <span
                      key={s}
                      className={`h-1.5 w-1.5 rounded-full ${
                        s === subActive ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <button className={btn} onClick={onNext} aria-label="Next">
        ›
      </button>
    </nav>
  )
}

export default PanelNav
