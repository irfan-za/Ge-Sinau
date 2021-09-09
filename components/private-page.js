import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth-provider'

PrivatePage.propTypes = {
  children: PropTypes.node.isRequired
}

function PrivatePage ({ children }) {
  const router = useRouter()
  const { session } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)

  /**
   * Checking user session not null from useAuth
   */
  const checkSession = () => {
    if (session) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
  }

  /**
   * If session not exists will redirect to login page
   */
  const redirectToLoginPage = () => {
    if (!session) {
      router.push('/login')
    }
  }

  useEffect(redirectToLoginPage, [router, session])
  useEffect(checkSession, [session])

  // Render private page
  if (isAuthorized) {
    return (
      <>{ children }</>
    )
  }

  return null
}

export default PrivatePage
