const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 5, // Reduza o número máximo de conexões
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        ciphers:'SSLv3'
    }
});
exports.sendEmail = function(from, to, subject, text, callback) {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err);
        }
        // Liberar a conexão após o envio do e-mail
        transporter.close();
        // Chamar o callback passando qualquer erro e informações de envio
        callback(err, info);
    });
};
