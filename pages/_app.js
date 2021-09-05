import PropTypes from 'prop-types'
import '../styles/globals.css'
import { UserProvider } from '../components/UserContext'

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
