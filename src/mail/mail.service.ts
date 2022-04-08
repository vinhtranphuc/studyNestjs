import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService : ConfigService) { }

    async sendEmailToUserActiveAccount(activeCode: string, username: string, to: string, endpoint: string) {
        const host = this.configService.get('FRONTEND_HOST');
        const urlActive = `${host}/${endpoint}/${activeCode}?email=${to}`;
        await this.mailerService.sendMail({
            to: to,
            // from: from, tạm thời lấy mail chung
            subject: '【Async*】本メールより会員登録を完了させてください',
            template: 'userCreate',
            context: {
                userName: username,
                urlActive,
            },
        });
    }

    async sendEmailToUserResetPassword(inviteKey: string, to: string) {
        const host = this.configService.get('FRONTEND_HOST');
        const url = `${host}/updatepw/${inviteKey}?email=${to}`;
        await this.mailerService.sendMail({
            to: to,
            // from: from, tạm thời lấy mail chung
            subject: '【Async*】パスワード再発行メール',
            template: 'resetPassword',
            context: {
                url:url
            },
        });
    }
}