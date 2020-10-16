const path = require('path')
const express = require('express')
const app = express()
const server = app.listen(3000, () => {
    console.log('Listening on *:3000')
})


app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})