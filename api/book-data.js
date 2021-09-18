import apiResponseBuilder, { XMLHttpRequestResponseBuilder } from './api-response-builder'
import BookEndpoint from '../constant/book-endpoint'
import XMLHttpRequest from 'xhr2'

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
  static uploadMedia (file, accessToken) {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('data', file)
    xhr.open(BookEndpoint.uploadMedia.method, BookEndpoint.uploadMedia.url)
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    return XMLHttpRequestResponseBuilder(xhr, formData)
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
  static async add ({ title, tags, body, video, thumbnail, accessToken }) {
    const fetchPromise = fetch(BookEndpoint.addBook.url, {
      method: BookEndpoint.addBook.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, tags, body, video, thumbnail })
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
   * @param {string} book.accessToken
   * @returns {Promise}
   */
  static async update ({ id, title, tags, body, video, thumbnail, accessToken }) {
    const fetchPromise = fetch(BookEndpoint.updateBook.url(id), {
      method: BookEndpoint.updateBook.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, tags, body, video, thumbnail })
    })
    return apiResponseBuilder(fetchPromise)
  }

  /**
   * Delete book with id
   * @param {string} id
   * @returns {Promise}
   */
  static async delete (id, accessToken) {
    const fetchPromise = fetch(BookEndpoint.deleteBook.url(id), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: BookEndpoint.deleteBook.method
    })
    return apiResponseBuilder(fetchPromise)
  }
}

export default BookData
