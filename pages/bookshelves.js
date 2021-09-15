import  Link  from "next/link"
import { useAuth } from '../auth/auth-provider'
import { useEffect, useState } from "react";



export default function Bookshelves(){
  const { login, session } = useAuth();
  const [bookShelves, setBookShelves]=useState(null)

  useEffect(async() => {
    if(session){
       await fetch("http://localhost:2525/bookshelves", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => setBookShelves(data.data.bookshelves))
      .catch(err=>alert(err.message))
    }
  }, [session])

  return(
    <div className="container mx-auto mt-5 px-3 md:px-0">
      <h1 className="text-center text-5xl font-bold mb-8">Daftar Buku</h1>
      <div className="bg-gray-100 p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-large gap-10">
        {bookShelves && bookShelves.map((bookshelve)=>
        <Link href="/" key={bookshelve.id}>
          <a target="_blank">
            <div className="bg-blue-200 rounded-lg p-3">
              <h3 className="font-semibold text-lg lg:text-xl">Judul : {bookshelve.name}</h3>
              <p className="md:text-lg text-gray-900 font-medium mt-1">{bookshelve.username}</p>
            </div>
          </a>
        </Link>

        )}
      </div>
    </div>
  )
}