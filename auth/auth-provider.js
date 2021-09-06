import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

/**
 * Auth controller
 * @returns
 */
function useProvideAuth () {
  const [currentUser, setCurrentUser] = useState(null)

  const login = (email, password) => {
    setCurrentUser({ email, password })
    return currentUser
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return {
    currentUser,
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
