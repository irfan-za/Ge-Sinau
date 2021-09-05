import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const UserContext = createContext()

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
  return useContext(UserContext)
}

export default function UserProvider ({ children }) {
  const auth = useProvideAuth()

  return (
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node
}
