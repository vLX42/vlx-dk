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
              'mb-2 md:mb-8 text-xl md:text-2xl font-bold tracking-tighter text-white text-left lg:text-5xl',
          },
        },
        h2: {
          props: {
            className: 'mb-2 text-xs font-medium tracking-widest text-white',
          },
        },

        p: {
          props: {
            className:
              'mb-8 text-sm md:text-base md:leading-relaxed text-white text-left  lg:text-xl',
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
