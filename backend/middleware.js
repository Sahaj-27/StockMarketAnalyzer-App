const jwt = require('jsonwebtoken')
const config = require('./config')
const pool = require('./models/StockApp')

const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization
    console.log(authorization)
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const client = await pool.connect()
    const user = await client.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    request.user = user
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}