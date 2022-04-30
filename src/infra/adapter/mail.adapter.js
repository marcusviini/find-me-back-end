import 'dotenv/config'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

export class MailAdapter {
    async sendToken(data) {
        const { username, token, email } = data

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Token para alteração de senha',
            template: 'sendToken',
            context: {
                username,
                token,
                email,
            },
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        transporter.use(
            'compile',
            hbs({
                viewEngine: {
                    extName: '.handlebars',
                    partialsDir: path.resolve(__dirname, '..', 'templates'),
                    defaultLayout: false,
                },
                viewPath: path.resolve(__dirname, '..', 'templates'),
                extName: '.handlebars',
            })
        )
        const response = await transporter.sendMail(mailOptions)
        console.log('=======================')
        console.log('aceito:', response.accepted)
        console.log('rejeitado:', response.rejected)
        console.log('resposta:', response.response)
        console.log('message id:', response.messageId)
    }
}
