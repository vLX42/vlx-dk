import Head from 'next/head'
import AnimatedBackground from './animatedBackground'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  lowFrameRate: boolean
}

const colors = [
  {
    name: 'Living Coral and Pacific Coast',
    color1: '#FC766AFF',
    color2: '#5B84B1FF',
  },
  {
    name: 'Ultra Violet and Blooming Dahlia',
    color1: '#5F4B8BFF',
    color2: '#E69A8DFF',
  },
  { name: 'Turquoise and Warm Sand', color1: '#42EADDFF', color2: '#CDB599FF' },
  { name: 'Black and White', color1: '#000000FF', color2: '#FFFFFFFF' },
  { name: 'Blue and Orange', color1: '#00A4CCFF', color2: '#F95700FF' },
  { name: 'Sailor Blue and Mint', color1: '#00203FFF', color2: '#ADEFD1FF' },
  { name: 'Gray  and Lime Punch', color1: '#606060FF', color2: '#D6ED17FF' },
  {
    name: 'Cherry Tomato and Rapture Rose',
    color1: '#ED2B33FF',
    color2: '#D85A7FFF',
  },
  {
    name: 'Forest Green and Moss Green',
    color1: '#2C5F2D',
    color2: '#97BC62FF)',
  },
  { name: 'Royal Blue and Peach', color1: '#00539CFF', color2: '#EEA47FFF' },
  {
    name: 'Electric Blue Lemonade and Aquamarine',
    color1: '#0063B2FF',
    color2: '#9CC3D5FF',
  },
  {
    name: 'Light Rosa and Cream Gold',
    color1: '#D198C5FF',
    color2: '#E0C568F',
  },
  {
    name: 'Black and Blazing Yellow',
    color1: '#101820FF',
    color2: '#FEE715FF',
  },
  {
    name: 'Pale Green and Bubblegum Pink',
    color1: '#CBCE91FF',
    color2: '#EA738DFF',
  },
  {
    name: 'Copper Coin and Aged Copper',
    color1: '(#B1624EFF',
    color2: '#5CC8D7FF',
  },
  { name: 'Sky Blue and White', color1: '#89ABE3FF', color2: '#FCF6F5FF' },
  {
    name: 'Dusky Citron and Cool Gray',
    color1: '#E3CD81FF',
    color2: '#B1B3B3FF',
  },
  { name: 'Black and Orange', color1: '#101820FF', color2: '#F2AA4CFF' },
  { name: 'Brown Sugar and Beige', color1: '#A07855FF', color2: '#D4B996FF' },
  { name: 'Turkish Sea and Silver', color1: '#195190FF', color2: '#A2A2A1FF' },
  {
    name: 'Royal Purple and Ice Flow',
    color1: '#603F83FF',
    color2: '#C7D3D4FF',
  },
  { name: 'Island Green and White', color1: '#2BAE66FF', color2: 'FCF6F5FF' },
  {
    name: 'Pink Salt and Charcoal Gray',
    color1: '#FAD0C9FF',
    color2: '#6E6E6DFF',
  },
  { name: 'Black and Cherry Tomato', color1: '#2D2926FF', color2: '#E94B3CFF' },
  {
    name: 'Mango Mojito and Terrarium Moss',
    color1: '#DAA03DFF',
    color2: '#616247FF',
  },
  { name: 'Space Cherry and White', color1: '#990011FF', color2: '#FCF6F5FF' },
  {
    name: 'Hunter Green and Raspberry',
    color1: '#435E55FF',
    color2: '#D64161FF',
  },
  {
    name: 'Pale Green  and Purple Sapphire',
    color1: '#CBCE91FF',
    color2: '#76528BFF',
  },
  { name: 'Pink and Navy Blue', color1: '#FAEBEFFF', color2: '#333D79FF' },
]

const Layout = ({ children, lowFrameRate }: Props) => {
  const [color, setColor] = useState({
    name: 'Default',
    color1: '#ffffff',
    color2: '#ffffff',
  })

  const randomColor = useCallback(() => {
    const { name, color1, color2 } =
      colors[Math.floor(Math.random() * colors.length)]
    setColor({ name, color1, color2 })
  }, [])

  useEffect(() => {
    randomColor()
  }, [])

  return (
    <>
      {/* Refraction filter for the frosted-glass cards (see .glass in globals.scss).
          feTurbulence + feDisplacementMap warp the backdrop so it reads like real
          glass. Browsers without url() backdrop-filter support fall back to blur. */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
      >
        <defs>
          <filter
            id="glass-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.006"
              numOctaves="2"
              seed="17"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="4" result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale="45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <AnimatedBackground
        color1={color.color1}
        color2={color.color2}
        className="fixed h-full w-full object-cover"
      />
      {/* Cinematic vignette: darken the edges so the glass cards float and the
          page reads richer regardless of the random colour theme. */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 45%, transparent 48%, rgba(4,6,12,0.5) 100%)',
        }}
      />
      <div className="overscroll-none bg-fixed">
        <Head>
          <title>
            Peter Biro: Frontend Chapter Lead and Senior Full Stack Developer
          </title>
          <meta
            name="description"
            content="Frontend Chapter Lead and Senior Full Stack Developer with 20+ years building products end to end. React, Next.js, TypeScript, Node.js and .NET, now with an AI-assisted, agentic workflow."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vlx.dk/" />
          <meta
            property="og:title"
            content="Peter Biro: Frontend Chapter Lead and Senior Full Stack Developer"
          />
          <meta
            property="og:description"
            content="20+ years building products end to end. Now leading a frontend chapter and building with an AI-assisted, agentic workflow."
          />
          <meta property="og:image" content="https://vlx.dk/og.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Peter Biro: Frontend Chapter Lead and Senior Full Stack Developer"
          />
          <meta
            name="twitter:description"
            content="20+ years building products end to end. Now leading a frontend chapter and building with an AI-assisted, agentic workflow."
          />
          <meta name="twitter:image" content="https://vlx.dk/og.jpg" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
        {lowFrameRate && (
          <motion.div
            initial={{ y: '-140%' }}
            animate={{ y: 0 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-40 font-poppins text-xs portrait:text-base text-white/75 bg-black/40 backdrop-blur px-4 py-2 rounded-full"
          >
            Low frame rate detected, blur effect off
          </motion.div>
        )}

        <a
          href="https://github.com/vLX42/vlx-dk"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-3 left-3 z-40 font-poppins text-xs portrait:text-base text-white/35 hover:text-white/70 transition-colors"
        >
          Source code
        </a>

        <div className="fixed bottom-3 right-3 z-40 flex items-center gap-2 font-poppins text-xs portrait:text-base text-white/40">
          <span className="hidden md:inline tracking-wide">{color.name}</span>
          <button
            onClick={() => randomColor()}
            aria-label="Shuffle colour theme"
            className="flex items-center justify-center w-7 h-7 portrait:w-10 portrait:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors focus:outline-none"
          >
            <svg
              className="w-3.5 h-3.5 portrait:w-5 portrait:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Layout
