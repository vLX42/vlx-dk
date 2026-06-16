import Markdown from 'markdown-to-jsx'

type StyledMarkdownProps = {
  children: string
}
const StyledMarkdown = ({ children }: StyledMarkdownProps) => (
  <Markdown
    options={{
      overrides: {
        h1: {
          props: {
            className:
              'mb-3 portrait:mb-4 text-3xl portrait:text-6xl font-bold tracking-tight text-white lg:text-left',
          },
        },
        h2: {
          props: {
            className:
              'mb-3 text-[0.7rem] portrait:text-xl font-semibold tracking-[0.2em] uppercase text-white/60',
          },
        },

        p: {
          props: {
            className:
              'mb-4 portrait:mb-4 text-base portrait:text-3xl leading-relaxed text-white/85 lg:text-left',
          },
        },
        a: {
          props: {
            className: 'text-white hover:text-gray-200 hover:underline',
          },
        },
      },
    }}
  >
    {children}
  </Markdown>
)

export default StyledMarkdown
