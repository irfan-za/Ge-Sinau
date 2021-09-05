import PropTypes from 'prop-types'
import UserProvider from '../auth/user-context'
import '../styles/globals.css'

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

function MyApp ({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
