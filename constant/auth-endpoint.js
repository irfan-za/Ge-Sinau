import ApiBaseURL from './api-base-url'

/**
 * List of api auth transaction endpoint url and methods
 * @namespace
 */
const AuthEndpoint = {
  login: {
    method: 'POST',
    url: `${ApiBaseURL.origin}/auths`
  }
}

export default AuthEndpoint
