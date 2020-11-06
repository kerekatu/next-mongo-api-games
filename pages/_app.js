import { useEffect } from 'react'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.getElementById('preventFlashOfUnstyledContent')?.remove()
  }, [])

  return (
    <>
      <Head>
        <style
          id="preventFlashOfUnstyledContent"
          dangerouslySetInnerHTML={{
            __html: `*, *::before, *::after { transition: none !important; }`
          }}
        />
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
