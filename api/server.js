import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-quote", async (req, res) => {
  const { name, email, phone, location, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_SMTP_USER,
      pass: process.env.GOOGLE_SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Volt Safe Quote Form" <${process.env.GOOGLE_SMTP_USER}>`,
    to: process.env.TO_EMAIL,
    subject: `New Quote Request from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}

Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000; // use 5000 locally if PORT is undefined
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

