import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Restrict CORS to your GitHub Pages front-end
app.use(cors({ origin: "https://your-username.github.io" }));
app.use(express.json());

app.post("/send-quote", async (req, res) => {
  const { name, email, phone, location, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_SMTP_USER,
      pass: process.env.GOOGLE_SMTP_PASS, // App password if 2FA is enabled
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response); // log nodemailer response
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err); // full error
    res.status(500).json({ success: false, error: err.message });
  }
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
