import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function NotFound(){
  const router=useRouter()
  useEffect(()=>{
    setTimeout(() => {
      router.push("/")
    }, 3000);
  },[])
 return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl text-gray-900 font-bold">404</h1>
      <h1 className="text-xl md:text-3xl text-gray-900 font-bold">Not Found!</h1>
      <p className="mt-2 text-gray-700">You will redirected to <Link href="/"><a className="hover:underline">homepage</a></Link></p>
    </div>
  )
}