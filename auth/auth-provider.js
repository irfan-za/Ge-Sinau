import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import AuthData from '../api/auth-data'

const AuthContext = createContext()

/**
 * Auth controller
 * @returns
 */
function useProvideAuth () {
  const [session, setSession] = useState(null)

  /**
   * Set current user state after login
   * Warning: Please use try catch for this function
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
      setSession({ accessToken, refreshToken })
    }

    return {
      isSuccess,
      message
    }
  }

  const logout = () => {
    setSession(null)
  }

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
