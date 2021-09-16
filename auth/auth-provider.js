import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AuthData from '../api/auth-data'
import { setCookie, getCookie, deleteCookie } from '../utils/browser-cookie.ts'

const AuthContext = createContext()

/**
 * Auth controller
 * @returns
 */
function useProvideAuth () {
  const [session, setSession] = useState(null)
  const [sessionIntervalId, setSessionIntervalId] = useState(null)

  /**
   * Set session cookie to browser
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  const setSessionCookie = (accessToken, refreshToken) => {
    setCookie('accessToken', accessToken, 7)
    setCookie('refreshToken', refreshToken, 7)
  }

  /**
   * Get login session cookie
   * @returns
   */
  const getSessionCookie = () => {
    return {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken')
    }
  }

  /**
   * Remove cookie session from browser
   */
  const clearSessionCookie = () => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
  }

  /**
   * Set current user state after login
   * WARNING: !!! PLEASE USE TRY CATCH TO USE THIS FUNCTION !!!
   * @param {string} email
   * @param {string} password
   * @returns
   */
  const login = async (email, password) => {
    const response = await AuthData.login(email, password)
    const isSuccess = false
    const message = response.message

    if (response.status === 'success') {
      const accessToken = response.data.accessToken
      const refreshToken = response.data.refreshToken
      setSessionCookie(accessToken, refreshToken)
      setSession({ accessToken, refreshToken })
    }

    return {
      isSuccess,
      message
    }
  }

  /**
   * Set session to null
   */
  const logout = () => {
    clearUpdateSessionInterval()
    clearSessionCookie()
    setSession(null)
  }

  /**
   * Perform update access token using auth data
   */
  const performUpdateAccessToken = async () => {
    try {
      if (session) {
        const response = await AuthData.updateAccessToken(session.refreshToken)
        const newSession = { ...session, accessToken: response.data.accessToken }
        setSessionCookie(newSession.accessToken, newSession.refreshToken)
        setSession(newSession)
      }
    } catch (error) {
      logout()
    }
  }

  /**
   * Set new session interval id
   */
  const setNewSessionIntervalId = () => {
    // Update session access token every 15 minutes
    const interval = setInterval(performUpdateAccessToken, (15 * 60 * 1000))
    setSessionIntervalId(interval)
  }

  /**
   * Clear session interval id
   */
  const clearUpdateSessionInterval = () => {
    if (sessionIntervalId) {
      clearInterval(sessionIntervalId)
    }
  }

  /**
   * Restore session from cookie
   */
  const restoreSession = () => {
    const savedSession = getSessionCookie()
    if (savedSession.refreshToken && savedSession.accessToken) {
      setSession(savedSession)
      performUpdateAccessToken()
    }
  }

  /**
   * To get saved session without waiting reload from useEffect restoreSession
   * @returns
   */
  const getSession = () => {
    const savedSession = getSessionCookie()
    if (savedSession.refreshToken && savedSession.accessToken) {
      return savedSession
    }

    return null
  }

  /**
   * Set blocked private page url
   */
  const setRejectedFromURL = () => {
    sessionStorage.setItem('blockedFrom', window.location.pathname + window.location.search)
  }

  /**
   * Get blocked private page url
   */
  const getRejectedFromURL = () => {
    return sessionStorage.getItem('blockedFrom')
  }

  /**
   * Clear blocked private page url
   */
  const clearRejectedFromURL = () => {
    sessionStorage.removeItem('blockedFrom')
  }

  // Restore saved session when first render
  useEffect(restoreSession, [])

  // Update session interval id when session changed
  useEffect(() => {
    if (session) {
      if (sessionIntervalId) {
        clearUpdateSessionInterval()
      }

      setNewSessionIntervalId()
    }
  }, [session])

  return {
    setRejectedFromURL,
    getRejectedFromURL,
    clearRejectedFromURL,
    getSession,
    session,
    login,
    logout
  }
}

/**
 * Use auth hook
 * @returns
 */
export function useAuth () {
  return useContext(AuthContext)
}

export default function AuthProvider ({ children }) {
  const auth = useProvideAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
