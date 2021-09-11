import apiResponseBuilder from './api-response-builder'
import AuthEndpoint from '../constant/auth-endpoint'

class AuthData {
  /**
   * Login to api
   * @param {string} username
   * @param {string} password
   * @returns
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

  /**
   * Update access token
   * @param {string} refreshToken
   * @returns
   */
  static async updateAccessToken (refreshToken) {
    const fetchPromise = fetch(AuthEndpoint.updateAccessToken.url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: AuthEndpoint.updateAccessToken.method,
      body: JSON.stringify({ refreshToken })
    })
    return apiResponseBuilder(fetchPromise)
  }
}

export default AuthData
