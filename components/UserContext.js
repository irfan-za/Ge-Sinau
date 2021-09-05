import {createContext, useState} from "react"

export const UserContext=createContext()
export const UserProvider=({children})=>{
  const [currentUser, setCurrentUser]=useState(null)
  console.log(currentUser)
  return(
    <UserContext.Provider value={[currentUser,setCurrentUser]}>
      {children}
    </UserContext.Provider>
  )
}