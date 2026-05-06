import nodemailer from 'nodemailer';

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendContactEmail(payload: EmailPayload) {
  const transporter = createTransporter();

  const { name, email, subject, message } = payload;

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; background: #080B14; color: #F8F8F2; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(94,92,230,0.3);">
        <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(94,92,230,0.2);">
          <h2 style="color: #5E5CE6; font-size: 24px; margin-bottom: 4px;">New Contact Message</h2>
          <p style="color: #6B6B7B; font-size: 14px;">via bhoomik.dev portfolio</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #A8A8B3; font-size: 13px; width: 80px; vertical-align: top;">From</td>
            <td style="padding: 10px 0; color: #F8F8F2; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A8B3; font-size: 13px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #5E5CE6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A8B3; font-size: 13px; vertical-align: top;">Subject</td>
            <td style="padding: 10px 0; color: #F8F8F2;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: rgba(94,92,230,0.08); border-radius: 12px; border: 1px solid rgba(94,92,230,0.2);">
          <p style="color: #A8A8B3; font-size: 13px; margin-bottom: 12px;">Message</p>
          <p style="color: #F8F8F2; line-height: 1.7; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
