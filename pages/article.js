import { useAuth } from '../auth/auth-provider'
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Article () {
  const { currentUser, logout } = useAuth()
  const router=useRouter();
  useEffect(()=>{
    if(!currentUser){
      router.push("/login")
    }
  },[currentUser])

  if (!currentUser) {
    return <div></div>
  }

  if (currentUser) {
    return (
    <div className="container mx-auto">
      <button onClick={logout} className="bg-red-100 hover:bg-red-200 rounded-full border-2 border-red-600 px-5 py-2">LogOut</button>
      <video src="https://www.youtube.com/watch?v=Soa3gO7tL-c"></video>
      <section>
        <div>
          <h1 className="text-3xl font-bold mb-3">Judul Video</h1>
          <p className="font-medium">tags : <span className="px-2 py-0.5 text-blue-700 bg-blue-100 rounded-lg mx-2">math</span><span className="px-2 py-0.5 text-blue-700 bg-blue-100 rounded-lg mr-2">news</span></p>
        </div>
        <div className="mt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus excepturi, repellendus quas ab placeat praesentium neque assumenda. Atque reiciendis distinctio ab soluta ea? Reiciendis, aliquam deserunt doloribus eveniet quam amet cum laboriosam tenetur ullam facilis! Labore maxime ipsum illo provident commodi, earum illum tempore veritatis deleniti saepe, hic cumque officiis dolor ut reprehenderit quaerat, eius sit culpa nihil repudiandae debitis praesentium facilis. Consequuntur rem, explicabo nobis dolorem assumenda saepe rerum maxime perspiciatis doloribus exercitationem. Eaque voluptatum voluptas necessitatibus iusto reprehenderit ab harum at, eveniet sed tenetur rerum quasi officia nulla molestias sit fugiat error suscipit veritatis laudantium veniam dicta soluta. Repudiandae quam, quis itaque consectetur fuga saepe dolorum et perferendis fugiat nemo laudantium veritatis accusamus laboriosam porro, mollitia expedita voluptates quas sint quaerat eos minima similique. Perferendis ipsa hic labore dolore aliquam reprehenderit earum provident obcaecati delectus natus aut, beatae possimus esse est totam perspiciatis mollitia culpa, sed sunt? Autem sapiente rerum placeat harum nesciunt sed a magni reprehenderit eveniet possimus eius sint culpa, delectus quae. Soluta, quo impedit provident ea commodi velit nobis in eos a molestiae rem cumque quae, pariatur hic ipsum saepe itaque magnam libero quaerat omnis. Exercitationem corporis aut libero quibusdam. Ipsa, autem neque! Sapiente, tempore.
        </div>
      </section>
    </div>
    )
  }
}
