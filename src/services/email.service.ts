import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import Handlebars from 'handlebars';

import { EMAIL_HOST, EMAIL_PASS, EMAIL_USER } from '../config';

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: EMAIL_HOST,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendEmail(email: string, subject: string, templateName: string, variables: any): Promise<void> {
    const templatePath = `${process.cwd()}/src/templates/${templateName}.hbs`;
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    const html = template(variables);

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
