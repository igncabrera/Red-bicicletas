var nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'pinkie.boyer8@ethereal.email',
        pass: 'qq6f5UQeUkTSNnYhgm'
    }
});