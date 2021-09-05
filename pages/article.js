import { useContext, useEffect, useState } from "react"
import {useRouter} from "next/router"
import {UserContext} from "../components/UserContext"

export default function Article () {
  const [currentUser, setCurrentUser]=useContext(UserContext)
  const [redirect,setRedirect]=useState(false)
  const router=useRouter();
  
  useEffect(() => {
    if(!currentUser){
      router.push("/login")
    }
    if(redirect){
      router.push({
        pathname:"/user/id",
        // query:{id:currentUser.password}
      })
    }
  }, [currentUser, redirect])

  // log Out handler
  const logOut=()=>{
    setCurrentUser(null)
  }
  // redirectToDashboard
  const redirectToDashboard=(e)=>{
    e.preventDefault()
    setRedirect(true)
  }

  if(!currentUser){
    return(
      <div className="w-full h-screen  flex justify-center items-center">
        <h1 className="text-red-500 text-semibold text-2xl">LOADING....</h1>
      </div>
    )
  }
  if(currentUser){
  return(
    <div>
      SECret user content
      <button onClick={logOut} className="bg-red-100 hover:bg-red-200 rounded-full border-2 border-red-600 px-5 py-2">LogOut</button>
      <button onClick={redirectToDashboard} className="bg-blue-100 hover:bg-blue-200 rounded-full border-2 border-blue-600 px-5 py-2"> dashboard</button>
    </div>
  )
  }
}