import ApiBaseURL from './api-base-url'

/**
 * List of api book transaction endpoint url and methods
 * @namespace
 */
const BookEndpoint = {
  uploadVideo: {
    method: 'POST',
    url: `${ApiBaseURL.origin}/upload/media`
  },
  addBook: {
    method: 'POST',
    url: `${ApiBaseURL.origin}/books`
  },
  updateBook: {
    method: 'PUT',
    /**
     * @param {string} id
     */
    url: (id) => `${ApiBaseURL.origin}/books/${id}`
  },
  deleteBook: {
    method: 'DELETE',
    /**
     * @param {string} id
     */
    url: (id) => `${ApiBaseURL.origin}/books/${id}`
  },
  getAllBooks: {
    method: 'GET',
    url: `${ApiBaseURL.origin}/books`
  },
  getBookById: {
    method: 'GET',
    /**
     * @param {string} id
     */
    url: (id) => `${ApiBaseURL.origin}/books/${id}`
  }
}

export default BookEndpoint
