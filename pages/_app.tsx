import { AppProps } from 'next/app'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
