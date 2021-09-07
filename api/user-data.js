import apiResponseBuilder from './api-response-builder'
import UserEndpoint from '../constant/user-endpoint'

class UserData {
  /**
    * Register new user
    * @param {Object} user
    * @param {string} user.fullname
    * @param {string} user.username
    * @param {string} user.email
    * @param {string} user.password
    * @returns
    */
  static async register ({ fullname, username, email, password }) {
    const fetchPromise = fetch(UserEndpoint.register.url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: UserEndpoint.register.method,
      body: JSON.stringify({ fullname, username, email, password })
    })
    return apiResponseBuilder(fetchPromise)
  }
}

export default UserData
