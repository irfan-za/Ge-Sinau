import PrivatePage from '../components/private-page'
import UserNavigation from '../components/user-navigation'

export default function Article () {
  // const { session, logout } = useAuth()

  return (
    <PrivatePage>
      <UserNavigation></UserNavigation>
    </PrivatePage>
  )
}
