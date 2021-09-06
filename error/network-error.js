class NetworkError extends Error {
  constructor (message = 'Network error') {
    super(message)
    this.name = 'NetworkError'
  }
}

export default NetworkError
