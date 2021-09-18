import PropTypes from 'prop-types'
import Head from 'next/head'
import PrivatePage from '../../../components/private-page'
import UserNavigation from '../../../components/user-navigation'
import Card from '../../../components/base/card'
import Link from 'next/link'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import BookData from '../../../api/book-data'
import ApiBaseURL from '../../../constant/api-base-url'

/**
 * Get book data and pass to Books component to perform server-side rendering
 * @returns
 */
export async function getServerSideProps () {
  const response = await BookData.getAll()
  return {
    props: {
      books: response.data.books
    }
  }
}

Books.propTypes = {
  books: PropTypes.array
}

export default function Books ({ books }) {
  return (
    <PrivatePage>
      <Head>
        <title>My Books</title>
      </Head>
      <UserNavigation>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-4">
          {
            books.map((book, index) => {
              return (
                <Link passHref key={index} href={`/user/books/${book.id}`}>
                  <Card className="cursor-pointer">
                    <div>
                      <div className="rounded-xl overflow-hidden mb-4">
                        <video className="w-full" src={`${ApiBaseURL.origin}/upload/media/${book.thumbnail}`}/>
                      </div>
                      <div className="font-poppins font-bold text-2xl">{book.title}</div>
                      <div className="font-poppins text-gray-500 mb-6">By: {book.username}</div>
                      <Divider/>
                      <div className="flex mt-2">
                        {
                          book.tags.map((tag, index) => {
                            return (
                              <div key={index} className="bg-gray-400 w-max px-2 py-1 m-1 rounded font-poppins text-sm">
                                {tag}
                              </div>
                            )
                          })
                        }
                      </div>
                      <Button></Button>
                    </div>
                  </Card>
                </Link>
              )
            })
          }
        </div>
        <div className="fixed bottom-10 right-10">
          <Link passHref href="/user/books/add">
            <Fab>
              <Icon>add</Icon>
            </Fab>
          </Link>
        </div>
      </UserNavigation>
    </PrivatePage>
  )
}
