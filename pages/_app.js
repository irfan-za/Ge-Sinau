import PropTypes from 'prop-types'
import AuthProvider from '../auth/auth-provider'
import { PaginationProvider } from '../pagination-context/pagination-context'
import '../styles/globals.css'

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PaginationProvider>
        <Component {...pageProps} />
      </PaginationProvider>
    </AuthProvider>
  )
}

export default MyApp
