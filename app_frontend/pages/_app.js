import '../styles/globals.css';
import {StateProvider} from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp
