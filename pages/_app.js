import PropTypes from 'prop-types'
import AuthProvider from '../auth/auth-provider'
import '../styles/globals.css'

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
