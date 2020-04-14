const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const yenv = require('yenv')

const config = yenv()

const auth = {
  auth: {
    api_key: config.SENDGRID_API_KEY
  },
}

const nodemailerSendgrid = nodemailer.createTransport(sendgrid(auth))

module.exports = (payload) => {
  return new Promise((resolve, reject) => {
      // validate the email request schema
    return nodemailerSendgrid.sendMail({
        from: 'info@safetrace.io',
        to: payload.to,
        subject: 'Hello from SafeTrace!',
        text: payload.text
    }, (err, info) => {
        if (err) {
            return reject(err)
        }
        
        resolve(info)
    })
  })
}