import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactTooltip from 'react-tooltip'

const FrontPage = () => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      yrepeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeOut',
    },
    backgroundColor: {
      duration: 0,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeOut',
      repeatDelay: 0.8,
    },
  }
  return (
    <>
      <div className="mx-auto flex flex-wrap items-center text-base portrait:text-5xl">
        <div className="w-2/3 portrait:w-full pb-24 portrait:pb-1">
          <h1 className="text-5xl portrait:text-9xl ">Who am I?</h1>
          <h2 className="text-3xl portrait:text-6xl pt-2 pb-6">
            Peter Biro: Frontend Chapter Lead and Senior Full Stack Developer
          </h2>
          <p className="uppercase tracking-loose">
            I have been working professionally in Web Development since 1998
          </p>
          <h1 className="my-4">
            Since October 2023 I’ve been Frontend Chapter Lead at{' '}
            <a
              href="https://www.dfds.com"
              target="_blank"
              className="underline"
            >
              DFDS
            </a>
            , setting frontend direction across teams while staying hands-on.
          </h1>
          <p className="leading-normal mb-4">
            I build across the stack with React.js,{' '}
            <a
              href="https://nextjs.org/"
              className="underline"
              data-tip
              data-for="next"
            >
              Next.js
            </a>
            ,{' '}
            <a
              href="https://nestjs.com/"
              className="underline"
              data-tip
              data-for="nest"
            >
              Nest.js
            </a>
            ,{' '}
            <a
              href="https://redux.js.org/"
              data-tip
              data-for="redux"
              className="underline"
            >
              Redux
            </a>
            , TypeScript, .NET Core, C#,{' '}
            <a
              href="https://nodejs.org/"
              data-tip
              data-for="node"
              className="underline"
            >
              Node.js
            </a>
            , GitHub Actions, Serverless and microservices. Most of it now runs
            through an AI-assisted, agentic workflow that takes an idea from
            concept to a shipped result in a fraction of the usual time.
          </p>

          <p>
            Besides my regular work, I run the Frontend Community at DFDS. We
            gather every three weeks to share experiences and explore where AI
            is taking our craft next.
          </p>
          <p>
            <br />
            <span>Scroll for more or follow me on these platforms:</span>
            <br />
            <a href="https://github.com/vLX42/" target="_blank" className="p-1">
              <Image
                src="/github.svg"
                className="shadow align-middle border-none inverted shadow"
                alt="GitHub"
                width={35}
                height={35}
              />
            </a>

            <a
              href="https://www.linkedin.com/in/vlx42/"
              target="_blank"
              className="p-1"
            >
              <Image
                src="/linkedin.svg"
                className="shadow align-middle border-none inverted shadow"
                alt="Linkedin"
                width={35}
                height={35}
              />
            </a>
          </p>
        </div>

        <ReactTooltip id="nest">
          <Image src="/nest.svg" width="50" height="50"></Image>
        </ReactTooltip>
        <ReactTooltip id="next">
          <Image src="/next.svg" width="50" height="50"></Image>
        </ReactTooltip>
        <ReactTooltip id="redux">
          <Image src="/redux.svg" width="50" height="50"></Image>
        </ReactTooltip>
        <ReactTooltip id="node">
          <Image src="/node.svg" width="50" height="50"></Image>
        </ReactTooltip>

        <div className="w-1/3 portrait:w-full portrait:invisible lg:py-6 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="p-20">
              <Image
                src="/profile.jpg"
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
                alt="Peter Biro"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 right-0 text-center text-gray-500 "
        transition={bounceTransition}
        animate={{
          y: ['10%', '-10%'],
        }}
      >
        Down
        <svg
          className="w-9 m-0.5"
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
    </>
  )
}

export default FrontPage
