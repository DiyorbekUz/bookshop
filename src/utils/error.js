class ValidationError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'ValidationError'
        this.message = message
    }
}

class AuthorizationError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'AuthorizationError'
        this.message = message
    } 
}

class InternalServerError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'InternalServerError'
        this.message = message
    }
}

export default {
    ValidationError,
    AuthorizationError,
    InternalServerError,
}