import { motion } from 'framer-motion'
import Image from 'next/image'

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  '.NET',
  'AI / agentic tooling',
]

const FrontPage = () => {
  return (
    <div className="relative h-full w-full flex items-center deck-text">
      {/* Soft dark scrim so the hero copy stays crisp over the bright background. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(115% 85% at 22% 45%, rgba(8,10,18,0.62) 0%, rgba(8,10,18,0.30) 46%, rgba(8,10,18,0) 76%)',
        }}
      />

      <div className="relative z-10 w-full flex flex-wrap items-center px-6 portrait:px-4">
        <div className="w-3/5 portrait:w-full">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs portrait:text-xl font-semibold tracking-[0.28em] uppercase text-white/60"
          >
            Frontend Chapter Lead · Senior Full Stack · Since 1998
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-6xl portrait:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            Peter Biro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 text-2xl portrait:text-4xl font-light text-white/90 leading-snug max-w-2xl"
          >
            I build products end to end, and lead the people who build them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 space-y-3 text-base portrait:text-2xl text-white/80 leading-relaxed max-w-2xl"
          >
            <p>
              More than two decades in: I co-founded a software company and shipped
              a CMS used on 1,500+ sites over its life, then led the rewrite of
              DFDS{'’'}s B2B freight platform onto a modern microservice stack.
              Today I run the Frontend Chapter for the Ferry tribe at DFDS,
              setting direction across teams while staying in the code.
            </p>
            <p>
              What is different now is how I build. Most of my work runs through an
              AI-assisted, agentic workflow that takes an idea to a shipped result
              in a fraction of the usual time. I build the harness the agents run
              in, not just the code, and I still own the architecture and
              everything that ships.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {stack.map((t) => (
              <span
                key={t}
                className="text-xs portrait:text-lg px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/80"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 flex items-center gap-4 text-sm portrait:text-xl text-white/70"
          >
            <span>Scroll to see the work</span>
            <a
              href="https://github.com/vLX42/"
              target="_blank"
              rel="noreferrer"
              className="p-1"
            >
              <Image
                src="/github.svg"
                className="inverted align-middle"
                alt="GitHub"
                width={30}
                height={30}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/vlx42/"
              target="_blank"
              rel="noreferrer"
              className="p-1"
            >
              <Image
                src="/linkedin.svg"
                className="inverted align-middle"
                alt="LinkedIn"
                width={30}
                height={30}
              />
            </a>
          </motion.div>
        </div>

        <div className="w-2/5 portrait:hidden flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative rounded-full p-[3px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.05))',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
            }}
          >
            <Image
              src="/profile.jpg"
              className="rounded-full"
              alt="Peter Biro"
              width={380}
              height={380}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-2 right-2 text-center text-white/50"
        animate={{ y: ['8%', '-8%'] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>
      </motion.div>
    </div>
  )
}

export default FrontPage
