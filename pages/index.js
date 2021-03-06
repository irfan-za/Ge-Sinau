import { useContext } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../components/base/button'
import Card from '../components/base/card'
import Pagination from '../components/pagination'
import { PaginationContext } from '../pagination-context/pagination-context'
import BookData from '../api/book-data'

export async function getServerSideProps () {
  const res = await BookData.getAll()
  const books = await res.data.books
  return {
    props: {
      books
    }
  }
}

Home.propTypes = {
  books: PropTypes.any.isRequired
}

export default function Home ({ books }) {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useContext(PaginationContext)
  const totalCardPerPage = 20
  const totalPage = Math.ceil(books.length / totalCardPerPage)
  const showPage = books.slice((currentPage - 1) * 20, (currentPage * 20))

  return (
    <div>
      <Head>
        <title>Ge Sinau</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col justify-between px-6 pt-3 sm:px-0 mx-auto min-h-screen ">
        <div>
          <div className="flex justify-end">
            <div className="w-12 md:w-24">
                <Link passHref href="/login">
                  <Button>
                    <h2>Login</h2>
                  </Button>
              </Link>
            </div>
          </div>
          <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-large gap-10">
                  {showPage && showPage.map(book =>
                    <Card key={book.id}>
                    <div className="w-full h-28 sm:h-36 md:h-44 lg:h-48 xl:h-52 relative ">
                      <Image
                        src={`http://localhost:2525/upload/media/${book.thumbnail}`}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        />
                    </div>
                    <div className=" flex flex-col justify-between h-64 sm:h-72">
                      <div>
                        <h1 className="font-bold text-2xl lg:text-3xl mt-3 lg:mt-4"> {book.title}</h1>
                        <div className="space-x-2 space-y-2">
                          {
                            book.tags.map((tag) => {
                              return <p key={tag} className="px-1 lg:px-2 pb-0.5 text-sm lg:text-base bg-blue-200 text-gray-800 inline-block rounded font-medium">{tag}</p>
                            })
                          }
                        </div>
                        <div className="mt-8">
                          <p className="text-sm md:text-base text-gray-900">created by <span className="font-medium">{book.username}</span></p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm md:text-base text-gray-900">created at  : <span>{book.createdAt}</span></p>
                          <p className="text-sm md:text-base text-gray-900">update at   : <span>{book.updatedAt}</span></p>
                        </div>
                      </div>
                      <div>
                        <Link passHref href={`/books/${book.id}`} ><Button>Lihat Detail</Button></Link>
                      </div>
                    </div>
                  </Card>
                  )}
            </div>
        </div>

        <div className="container my-8 lg:my-12">
          <div className="flex justify-center">
            {totalPage && <Pagination totalPage={totalPage} />}
          </div>
        </div>
      </main>
    </div>
  )
}
