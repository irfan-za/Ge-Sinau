import PropTypes from 'prop-types'
import '../styles/globals.css'

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
