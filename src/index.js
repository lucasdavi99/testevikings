require('dotenv').config();
const express = require('express');
const multer = require('multer');
const upload = multer();
const mailer = require('./mailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/send-email', upload.none(), async (req, res) => {
    const { nome, email, mensagem } = req.body;

    try {
        // Enviar e-mail para o administrador
        await mailer.sendEmail(
            process.env.EMAIL_USERNAME, 
            'olevera92@gmail.com', 
            'Novo contato do formulário', 
            `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
        );

        // Enviar e-mail de confirmação para o usuário
        await mailer.sendEmail(
            process.env.EMAIL_USERNAME, // Remetente (você)
            email, // Destinatário (usuário)
            'Seu e-mail foi recebido!',
            'Obrigado por entrar em contato conosco. Sua mensagem foi recebida com sucesso!'
        );

        res.json({success: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false});
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
