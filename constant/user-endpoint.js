import ApiBaseURL from './api-base-url'

/**
 * List of api user transaction endpoint url and methods
 * @namespace
 */
const UserEndpoint = {
  register: {
    method: 'POST',
    url: `${ApiBaseURL.origin}/users`
  }
}

export default UserEndpoint
