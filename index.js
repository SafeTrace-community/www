const express = require('express')
const bodyParser = require('body-parser')
const yenv = require('yenv')

const app = express()
const config = yenv()

// set env vars into the app object
app.set('port', config.PORT)

// express middleware / special configs
app.set('view engine', 'ejs')
app.set('trust proxy', true)

app.use('/public', express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(app.get('port'), () => {
    console.log(`App is now listening on port ${config.PORT}`)
})