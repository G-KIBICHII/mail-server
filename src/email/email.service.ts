import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kibichiigilbert024@gmail.com',
                pass: 'ovxeigzkairzlhas',
            },
        });

    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const mailOptions = {
            from: '"Mail Server" kibichii Advocate ltm',
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}: ${info.messageId}`);
            return info;
        } catch (error) {
            console.error(`Failed to send email to ${to}`, error.stack);
            throw error;
        }

    }

    async sendBulkMail(recipients: string[], subject: string, text: string, html?: string) {
        const mailOptions = {
            from: '"Mail Server" kibichii Advocate ltm',
            bcc: recipients.join(', '),
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Bulk email sent to ${recipients.length} recipients: ${info.messageId}`);
            return info;
        } catch (error) {

        }
    }


}
