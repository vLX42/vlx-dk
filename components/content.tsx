import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  useAnimation,
} from 'framer-motion'
import { useWheel } from '@use-gesture/react'
import FrontPage from './frontpage'
import Cv from './cv'
import cv from '../types/cv'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

import { type } from 'os'
type contentProps = {
  data: cv[],
  lowFrameRate: boolean
}

const physics = { damping: 15, mass: 0.27, stiffness: 55 }

const Content = ({ data, lowFrameRate }: contentProps) => {
  const scrollRef = useRef<HTMLElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (scrollRef.current !== null) {
      setScrollRange(scrollRef.current.scrollWidth);
    }
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width)
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries))
    if (null !== ghostRef.current) {
      resizeObserver.observe(ghostRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [onResize])

  const { scrollYProgress, scrollY } = useViewportScroll()
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  )

  const spring = useSpring(transform, physics)

  const clamp = useCallback((value: number, clampAt = 5) => {
    if (value > 0) {
      return value > clampAt ? clampAt : value
    } else {
      return value < -clampAt ? -clampAt : value
    }
  },[])

  const controls = useAnimation()
  const wheel = useWheel((event) => {
     controls.start({
      transform: `perspective(800px) rotateY(${
        event.wheeling ? clamp(event.delta[1]) : 0
      }deg)`,
    })
  })

  return (
    <>
      <div className="scroll-container pl-5 font-poppins font-thin" {...wheel()}>
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container"
        >
          <div className="thumbnails">
            <motion.div
              animate={controls}
              className="thumbnail text-white relative"
            >
              <FrontPage />
            </motion.div>
            {data.map((cv) => (
              <motion.div animate={controls} key={cv.slug}>
                <Cv cv={cv} glassEffect={!lowFrameRate} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </>
  )
}

export default Content
