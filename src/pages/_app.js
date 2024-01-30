import Head from 'next/head'
import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className={poppins.className}> 
      <Head>
        <link rel="icon" href="https://smktelkom-pwt.sch.id/wp-content/uploads/2019/02/logo-telkom-schools-300x295.png"  />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
