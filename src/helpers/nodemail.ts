import nodemailer from 'nodemailer';

import STMP_CONFIG from '../config/smtp';

const transporter = nodemailer.createTransport({
    host: STMP_CONFIG.host,
    port: STMP_CONFIG.port,
    secure: true,
    auth: {
        user: STMP_CONFIG.user,
        pass: STMP_CONFIG.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})



export async function sendEmail(adminEmail: string, solicitationId: string) {
    const mailSent = await transporter.sendMail({
        subject: 'ExpoMap - Solicitação de Evento aceita!!',
        from: 'ExpoMap <expomaptcc@gmail.com>',
        to: [adminEmail],
        text: 'O cadastro do seu evento já está liberado!',
        html: `<a>http://localhost:5173/complete/solicitation/${solicitationId}</a>`
    })

    console.log(mailSent)
}
