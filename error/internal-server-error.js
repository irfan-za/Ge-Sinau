class InternalServerError extends Error {
  constructor (message = 'Internal server error') {
    super(message)
    this.name = 'InternalServerError'
  }
}

export default InternalServerError
