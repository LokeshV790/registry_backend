import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

import dotenv from 'dotenv'; 
dotenv.config();

const transporter = nodemailer.createTransport(mg({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    }
  }));

async function sendEmail(email, subject, message) {
  try {
    await transporter.sendMail({
      from: 'Backend Tester <lokeshvazirani29@gmail.com>',
      to: email,
      subject,
      text: message
    });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
}

export default sendEmail;
