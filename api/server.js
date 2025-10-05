import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import sgMail from "@sendgrid/mail";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: [
    "https://s3anfinnegan.github.io", // optional: keep old domain
    "https://www.voltsafe.ie"         // new custom domain
  ] }));

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send-quote", async (req, res) => {
  const { name, email, phone, location, message } = req.body;

  // // Basic validation
  // if (!name || !email || !message) {
  //   return res.status(400).json({ success: false, error: "Missing required fields" });
  // }

  const msg = {
    to: process.env.TO_EMAIL, // Your destination email
    from: process.env.SENDGRID_FROM_EMAIL, // Must be a verified sender in SendGrid
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
    const info = await sgMail.send(msg);
    console.log("Email sent:", info);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("SendGrid error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
