import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth-provider'

PrivatePage.propTypes = {
  children: PropTypes.node.isRequired
}

function PrivatePage ({ children }) {
  const router = useRouter()
  const { getSession, session, setRejectedFromURL } = useAuth()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  /**
   * If session not exists will redirect to login page
   */
  const redirectToLoginPage = () => {
    if (!session && router) {
      router.push('/login')
    }
  }

  /**
   * Check is session available when first render use direct session
   */
  const firstRenderSessionCheck = () => {
    const directSession = getSession()

    if (directSession) {
      setIsAuthorized(true)
    } else {
      setRejectedFromURL()
    }

    setIsFirstRender(false)
  }

  /**
   * Handle useAuth hook session update
   */
  const handleSessionUpdate = () => {
    const isSessionAvailable = session && router
    if (!isFirstRender && !isSessionAvailable) {
      redirectToLoginPage()
    }
  }

  useEffect(firstRenderSessionCheck, [])
  useEffect(handleSessionUpdate, [firstRenderSessionCheck, session, router])

  // Render private page
  if (isAuthorized) {
    return (
      <>{ children }</>
    )
  }

  return null
}

export default PrivatePage
