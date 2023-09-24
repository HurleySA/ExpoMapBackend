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
    await transporter.sendMail({
        subject: 'ExpoMap - Solicitação de Evento aceita!!',
        from: 'ExpoMap <expomaptcc@gmail.com>',
        to: [adminEmail],
        text: 'O cadastro do seu evento já está liberado!',
        html: `<h1>Complete seu cadastro seguindo o link:</h1><br><a>https://expo-map-front.vercel.app/complete/solicitation/${solicitationId}</a>`
    })
}

export async function sendRejectEmail(adminEmail: string) {
    await transporter.sendMail({
        subject: 'ExpoMap - Solicitação de Evento negada!',
        from: 'ExpoMap <expomaptcc@gmail.com>',
        to: [adminEmail],
        html: `<p>Após avaliação da solicitação foi notado que o evento aparenta não condizer com o ExpoMap. Você pode abrir uma nova solicitação com mais detalhes para que seja reavaliado.</p>`
    })
}

export async function sendEmailExhibitorSolicitation(detail: string, email: string, name: string, phone: string, workedInThePast: boolean, emailAdmin: string) {
    await transporter.sendMail({
        subject: 'ExpoMap - Solicitação de Participação no evento!',
        from: 'ExpoMap <expomaptcc@gmail.com>',
        to: [emailAdmin],
        html: `<h1>Você possui uma nova solicitação para participação no evento:</h1><br><p>Nome: ${name}</p><br><p>Telefone: ${phone}</p><br><p>Email: ${email}</p><br><p>Detalhes: ${detail}</p><br><p>Já trabalho no evento: ${name ? 'Sim' : 'Não'}</p>`
    })
}
