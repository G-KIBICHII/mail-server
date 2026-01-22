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
            from: '"Mail Server" kibichiigilbert024@gmail.com',
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
}



// https://myaccount.google.com/u/1/apppasswords?continue=https://myaccount.google.com/people-and-sharing&rapt=AEjHL4MCvOuNxJ852JDlStAcHCUqn-H9isWVSMViys6CPy-TrSpbPlIPk6nhNyaorrsV-MkQqphUehQbblKHEmt02BfOOiUL6c_A_OPYWpIrN_r2RSV8iKc

// ovxe igzk airz lhas