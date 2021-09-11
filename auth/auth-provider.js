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
    setSession(null)
    clearSessionCookie()
  }

  // Set saved session when first render
  useEffect(() => {
    const savedSession = getSessionCookie()
    if (savedSession.refreshToken && savedSession.accessToken) {
      setSession(savedSession)
    }
  }, [])

  return {
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
