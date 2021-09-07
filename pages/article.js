import { useAuth } from '../auth/auth-provider'

export default function Article () {
  const { session, logout } = useAuth()

  if (session) {
    return (
      <div>
        SeCreT user content<br/>
        <button onClick={logout} className="bg-red-100 hover:bg-red-200 rounded-full border-2 border-red-600 px-5 py-2">LogOut</button>
      </div>
    )
  }

  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <h1 className="text-red-500 text-semibold text-2xl">You don&apos;t have access to view this page</h1>
    </div>
  )
}
