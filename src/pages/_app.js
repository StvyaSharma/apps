import '@/styles/globals.css'
import '@/styles/grid.css'
import Navbar from './components/Navbar'

export default function App({ Component, pageProps }) {
  return(<>
  <Navbar />
   <Component {...pageProps} />
  </>)
}
