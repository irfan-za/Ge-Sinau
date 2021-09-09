import PrivatePage from '../../components/private-page'
import UserNavigation from '../../components/user-navigation'
import Link from 'next/link'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

export default function Books () {
  return (
    <PrivatePage>
      <UserNavigation>
        <div className="absolute bottom-10 right-10">
          <Link passHref href="/books/add">
            <Fab>
              <Icon>add</Icon>
            </Fab>
          </Link>
        </div>
      </UserNavigation>
    </PrivatePage>
  )
}
