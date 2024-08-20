import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
    private static gmailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    static async sendEmail(data: { to: string, subject: string, html: string }): Promise<void> {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: data.to,
            subject: data.subject,
            html: data.html,
        };

        try {
            await EmailService.gmailTransporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default EmailService;
