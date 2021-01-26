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
              'mb-8 portrait:mb-4 text-2xl portrait:text-6xl  font-bold tracking-tighter text-white lg:text-left',
          },
        },
        h2: {
          props: {
            className: 'mb-2 text-xs portrait:text-xl font-medium tracking-widest text-white',
          },
        },

        p: {
          props: {
            className:
              'mb-8 portrait:mb-4 text-base portrait:text-3xl leading-relaxed text-white lg:text-left',
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
