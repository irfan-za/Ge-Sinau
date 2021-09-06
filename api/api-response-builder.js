import NetworkError from '../error/network-error'
import InternalServerError from '../error/internal-server-error'

/**
 * Make json response for after fetching data from api
 * @param {Promise} fetchPromise
 * @param {Number} ms timeout milis
 * @return {Promise<JSON|Error>}
 */
function apiResponseBuilder (fetchPromise, ms = 5000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const error = new Error('Fetch timeout')
      clearTimeout(timeout)
      reject(handleFetchError(error))
    }, ms)

    fetchPromise
      .then(async response => {
        checkApiResponse(response)
        const jsonResponse = await response.json()
        clearTimeout(timeout)
        resolve(jsonResponse)
      })
      .catch(e => {
        clearTimeout(timeout)
        reject(handleFetchError(e))
      })
  })
}

/**
 * Will throw InternalServerError if response status 500
 * @param {Promise} response
 */
function checkApiResponse (response) {
  if (response.status === 500) {
    throw new InternalServerError()
  }
}

/**
 * Handling error with some categories
 * @param {Error} e
 * @return {InternalServer|ErrorNetworkError}
 */
function handleFetchError (e) {
  const isInternalServerError = e.name === 'InternalServerError' || e.name === 'SyntaxError'

  if (isInternalServerError) {
    return new InternalServerError()
  }

  return new NetworkError()
}

export default apiResponseBuilder
