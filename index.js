const express = require('express')
const bodyParser = require('body-parser')
const yenv = require('yenv')

const app = express()
const config = yenv()

const sendEmail = require('./utils/email.util')

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
app.get('/news', (req, res) => {
    res.render('news')
})
app.get('/faq', (req, res) => {
    res.render('faq')
})

app.get('/privacy', (req, res) => {
    res.render('privacy')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})

app.post('/contact', (req, res) => {
    Promise
        .all([
            sendEmail({
                to: req.body.email,
                text: 'Thank you for reaching out! One of our team members will be in touch within 24 - 48 hours.'
            }),
            sendEmail({
                to: 'info@sharetrace.org',
                text: `Someone reached out to us via the website\n\n\nEmail: ${req.body.email}\n\nEmail: ${req.body.email}\n\nMessage: ${req.body.message}`
            })
        ])
        .then(() => {
            res.json({
                ok: 1
            })
        })
        .catch(() => {
            res.status(400).json({
                ok: 1
            })
        })
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 5000), () => {
    console.log(`App is now listening on port ${config.PORT}`)
}
