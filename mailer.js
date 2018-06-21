const mailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
let options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      user: 'support@manoj.in',
      clientId: '****************',
      clientSecret: '*****************',
      refreshToken: '********************',
      accessToken: '*******************',
      expires: 10
  }
}
let transport = mailer.createTransport(options);
module.exports = transport
