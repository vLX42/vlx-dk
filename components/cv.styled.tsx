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
              'mb-8 text-2xl font-bold tracking-tighter text-center text-white lg:text-left lg:text-5xl',
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
              'mb-8 text-base leading-relaxed text-center text-white lg:text-left lg:text-xl',
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
