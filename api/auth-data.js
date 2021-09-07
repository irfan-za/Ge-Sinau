import apiResponseBuilder from './api-response-builder'
import AuthEndpoint from '../constant/auth-endpoint'

class AuthData {
  /**
   * Login to api
   * @param {string} username
   * @param {string} password
   */
  static async login (username, password) {
    const fetchPromise = fetch(AuthEndpoint.login.url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: AuthEndpoint.login.method,
      body: JSON.stringify({ username, password })
    })
    return apiResponseBuilder(fetchPromise)
  }
}

export default AuthData
