import { useAuth } from '../auth/user-context'

export default function Article () {
  const { currentUser, logout } = useAuth()

  if (!currentUser) {
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <h1 className="text-red-500 text-semibold text-2xl">LOADING....</h1>
      </div>
    )
  }

  if (currentUser) {
    return (
    <div>
      SECret user content
      <button onClick={logout} className="bg-red-100 hover:bg-red-200 rounded-full border-2 border-red-600 px-5 py-2">LogOut</button>
    </div>
    )
  }
}
