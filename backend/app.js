const express = require('express')
const path = require('path');
const app = express()

require('express-async-errors')

const middleware = require('./middleware')
const user = require('./models/user')

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Handle other routes by serving the main index.html file

app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/search-stocks', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const cors = require('cors')

user

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')

app.use(express.json())
app.use(express.static('build'))

app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app