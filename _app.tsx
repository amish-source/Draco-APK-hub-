import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{process.env.NEXT_PUBLIC_SITE_NAME || 'AppHub'}</title>
        <meta name="description" content="Legal app catalog with official download links." />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
