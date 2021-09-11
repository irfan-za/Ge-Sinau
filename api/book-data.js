import apiResponseBuilder from './api-response-builder'
import BookEndpoint from '../constant/book-endpoint'

class BookData {
  /**
   * Get all books data
   * @returns {Promise}
   */
  static async getAll () {
    const fetchPromise = fetch(BookEndpoint.getAllBooks.url)
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Get book by id
   * @param {string} id
   * @returns {Promise}
   */
  static async get (id) {
    const fetchPromise = fetch(BookEndpoint.getBookById.url(id))
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Upload book video
   * @param {File} file
   * @param {string} accessToken
   * @returns
   */
  static async uploadVideo (file, accessToken) {
    const formData = new FormData()
    formData.append('data', file)
    const fetchPromise = fetch(BookEndpoint.uploadVideo.url, {
      method: BookEndpoint.uploadVideo.method,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Add book to api
   * @param {Object} book
   * @param {string} book.title
   * @param {Array<string>} book.tags
   * @param {string} book.body
   * @param {string} book.video
   * @param {string} book.accessToken
   * @returns {Promise}
   */
  static async add ({ title, tags, body, video, accessToken }) {
    const fetchPromise = fetch(BookEndpoint.addBook.url, {
      method: BookEndpoint.addBook.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, tags, body, video })
    })
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Update book to api
   * @param {Object} book
   * @param {string} book.id
   * @param {string} book.title
   * @param {Array<string>} book.tags
   * @param {string} book.body
   * @param {string} book.video
   * @returns {Promise}
   */
  static async update ({ id, title, tags, body, video }) {
    const fetchPromise = fetch(BookEndpoint.updateBook.url(id), {
      method: BookEndpoint.updateBook.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, tags, body, video })
    })
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Delete book with id
   * @param {string} id
   * @returns {Promise}
   */
  static async delete (id) {
    const fetchPromise = fetch(BookEndpoint.deleteBook.url(id), {
      method: BookEndpoint.deleteBook.method
    })
    return apiResponseBuilder(fetchPromise)
  }
}

export default BookData
