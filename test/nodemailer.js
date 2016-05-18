'use strict'
const smtpConfig = 'smtps://dummy.nodemailer%40gmail.com:onetwothreefour@smtp.gmail.com';

module.exports = function(nodemailer) {
  nodemailer.createTransport(smtpConfig)
}
