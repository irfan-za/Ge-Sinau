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
   * Add book to api
   * @param {Object} book
   * @param {string} book.title
   * @param {Array<string>} book.tags
   * @param {string} book.body
   * @param {string} book.video
   * @returns {Promise}
   */
  static async add ({ title, tags, body, video }) {
    const fetchPromise = fetch(BookEndpoint.addBook.url, {
      method: BookEndpoint.addBook.method,
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
