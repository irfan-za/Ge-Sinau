import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Rating from '../../components/rating'
import Button from '../../components/base/button'
import Textarea from '../../components/base/text-area'
import MuiTextField from '../../components/base/text-field'
import { useAuth } from '../../auth/auth-provider'

export default function BookDetail () {
  const [book, setBook] = useState(null)
  const [rating, setRating] = useState(null)
  const [comments, setComments] = useState(null)
  const [session, setSession] = useState(useAuth())
  const router = useRouter()
  const bookId = router.query.bookid

  useEffect(() => {
    async function fetchData () {
      const fetchBookDetail = await fetch('http://localhost:2525/books/' + bookId)
      const bookDetail = await fetchBookDetail.json()
      setBook(bookDetail.data)

      const fetchRating = await fetch('http://localhost:2525/votes?content=' + bookId)
      const rating = await fetchRating.json()
      setRating(rating)

      const fetchComments = await fetch('http://localhost:2525/books/' + bookId + '/comments')
      const comments = await fetchComments.json()
      setComments(comments.data.comments)
    }
    fetchData()
  }, [bookId])

  return (
    <>
    {book &&
    <div className="w-full sm:w-4/5 md:container xl:w-3/5 mx-auto mt-3 px-3 md:px-0">
      <div className="mb-16">
        <h1 className="font-bold text-2xl lg:text-3xl mt-3 lg:mt-4 mb-1 md:mb-2">{book.book.title}</h1>
        {rating && <Rating ratingValue={rating.data.averageVotes} />}
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-center">
        <div>
          <div className="space-x-2 space-y-2">
            {book.book.tags.map(tag =>
            <p key={tag} className="px-1 lg:px-2 pb-0.5 text-sm lg:text-base bg-blue-200 text-gray-800 inline-block rounded font-medium">{tag}</p>
            )}
          </div>
          <p className="text-sm md:text-base text-gray-900 font-medium mt-2">{book.book.username}</p>
        </div>
        <div>
        <p className="text-sm md:text-base text-gray-900">created at  : <span>{book.book.createdAt}</span></p>
        <p className="text-sm md:text-base text-gray-900">updated at  : <span>{book.book.updatedAt}</span></p>
        </div>
      </div>

      <div className="mt-4 mx-auto flex flex-col items-center">
      <video autoPlay controls className="w-full">
        <source src={`http://localhost:2525/upload/media/${book.book.video}`} type="video/mp4" />
      </video>
      <div className="px-12 mt-4">
          <p>{book.book.body}</p>
      </div>
      <div className="my-5">
        {!session
          ? (
        <div className="space-y-1 text-center">
          <p className="text-sm sm:text-base font-medium mb-2">Please login to post a comment!</p>
          <Link passHref href="/login"><Button>Login</Button></Link>
        </div>
            )
          : (
        <div className="sm:w-96 mt-12">
          <p className="sm:text-lg font-medium mb-2">Post Comment</p>
          <form className="flex flex-col items-end space-y-2">
            <MuiTextField placeholder="username" />
            <Textarea placeholder="comment"/>
            <div className="w-24">
              <Button>Submit</Button>
            </div>
          </form>
        </div>
            )
        }
      </div>
        <div className="w-full mb-20 mt-12">
          <div className="lg:w-4/5 space-y-4">
            {comments && comments.map(comment =>
            <div key={comment.id} className="p-4 bg-gray-100 rounded shadow-md">
              <div className="flex justify-between items-center">
                <p className="md:text-lg text-gray-900 font-medium">{comment.username}</p>
                <p className="text-sm md:text-base text-gray-900">{comment.updatedAt}</p>
              </div>
              <p className="mt-3">{comment.body}</p>
            </div>
            )}
          </div>
        </div>
      </div>
      </div>
    }
    </>
  )
}
