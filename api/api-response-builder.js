import NetworkError from '../error/network-error'
import InternalServerError from '../error/internal-server-error'
import XMLHttpRequest from 'xhr2'

/**
 * Make json response for fetch api request
 * @param {Promise} fetchPromise
 * @param {number} ms timeout milis
 * @return {Promise<JSON|Error>}
 */
export default function fetchResponseBuilder (fetchPromise, ms = 5000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const error = new Error('Fetch timeout')
      clearTimeout(timeout)
      reject(handleFetchError(error))
    }, ms)

    handleFetchApi(fetchPromise, timeout)
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * Make json response for XMLHttpRequest
 * @param {XMLHttpRequest} xhr
 * @param {*} data
 * @returns
 */
export function XMLHttpRequestResponseBuilder (xhr, data) {
  return new XHRResponse(xhr, data)
}

/**
 * Resolver for XMLHttpRequestResponseBuilder
 */
class XHRResponse {
  /**
   * Set attributes
   * @param {XMLHttpRequest} xhr
   * @param {*} data
   */
  constructor (xhr, data) {
    this._xhr = xhr
    this._data = data
  }

  /**
   * Get XMLHttpRequest response json
   * @returns
   */
  getResponse (setProgress = () => {}) {
    const xhr = this._xhr
    xhr.send(this._data) // sending data

    /**
     * Set first value XMLHttpRequest progress percentage
     */
    xhr.onloadstart = () => {
      setProgress(0)
    }

    /**
 * Update XMLHttpRequest progress percentage
 * @param {*} event
 */
    xhr.onprogress = (event) => {
      try {
        checkApiResponse(xhr.status)
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.loaded) * 100
          setProgress(percentComplete)
        }
      } catch (xhrError) {
        setProgress(0)
      }
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const error = new Error('Fetch timeout')
        clearTimeout(timeout)
        reject(handleFetchError(error))
      }, 5000) // reject in 5 second timeout

      xhr.onreadystatechange = () => {
        try {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            clearTimeout(timeout)
            const jsonResponse = JSON.parse(xhr.responseText)
            resolve(jsonResponse)
          }
        } catch (error) {
          reject(handleFetchError(error))
        }
      }

      xhr.onerror = () => {
        const xhrError = handleFetchError(event)
        reject(xhrError)
      }
    })
  }
}

/**
 * XMLHttpRequest handler for apiResponseBuilder
 * @deprecated
 * @param {XMLHttpRequest} xhr
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function handleXMLHttpRequest (xhr) {
  const xhrResolver = (response, progress, error) => {
    /**
     * Send json response to callback after XMLHttpRequest finished
     */
    xhr.onload = () => {
      const jsonResponse = JSON.parse(xhr.responseText)
      response(jsonResponse)
    }

    /**
     * Set first value XMLHttpRequest progress percentage
     */
    xhr.onloadstart = () => {
      progress(0)
    }

    /**
     * Update XMLHttpRequest progress percentage
     * @param {*} event
     */
    xhr.onprogress = (event) => {
      try {
        checkApiResponse(xhr.status)
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.loaded) * 100
          progress(percentComplete)
        }
      } catch (xhrError) {
        error(xhrError)
      }
    }

    /**
     * Send error response to callback when XMLHttpRequest error
     * @param {*} event
     */
    xhr.onerror = (event) => {
      const xhrError = handleFetchError(event)
      error(xhrError)
    }
  }

  return xhrResolver
}

/**
 * Fetch api handler for apiResponseBuilder
 * @param {Promise} fetchPromise
 * @param {*} timeout
 * @returns
 */
async function handleFetchApi (fetchPromise, timeout) {
  return new Promise((resolve, reject) => {
    fetchPromise
      .then(async response => {
        checkApiResponse(response.status)
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
 * @param {number} status
 */
function checkApiResponse (status) {
  if (status === 500) {
    throw new InternalServerError()
  }
}

/**
 * Handling error with some categories
 * @param {Error} e
 * @return {InternalServer|NetworkError}
 */
function handleFetchError (e) {
  const isInternalServerError = e.name === 'InternalServerError' || e.name === 'SyntaxError'

  if (isInternalServerError) {
    return new InternalServerError()
  }

  return new NetworkError()
}
