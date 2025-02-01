import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// SMTP configuration with port and SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // SMTP server for Gmail
  port: 465,               // Use port 465 for SSL (or 587 for TLS)
  secure: true,            
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});

const sender = process.env.EMAIL_USER;

export { transporter, sender };
