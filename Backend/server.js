const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" })); // Allow all origins for the final test
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀 - All Origins Allowed.");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, ""), // Auto-remove spaces just in case
      },
    });

    // Email to You (Owner)
    let mailOptionsOwner = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your own email as from to avoid spam filters
      to: process.env.EMAIL_USER,
      replyTo: email, // So you can reply directly to the visitor
      subject: `Portfolio Contact from ${name}`,
      text: `You have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Auto-reply to Visitor
    let mailOptionsVisitor = {
      from: `"Ankit Singh" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting Ankit Singh`,
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nAnkit Singh\n+91-7275003033\nGurugram, Haryana, India`,
    };

    await transporter.sendMail(mailOptionsOwner);
    await transporter.sendMail(mailOptionsVisitor);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  
  // Self-ping to keep the server awake (Render Free Tier)
  setInterval(() => {
    const https = require("https");
    const pingUrl = process.env.RENDER_EXTERNAL_URL || "https://amit-kumar-yadav-jlff.onrender.com/";
    https.get(pingUrl, (res) => {
      console.log("Self-ping successful: Server is awake!");
    }).on("error", (e) => {
      console.error("Self-ping failed:", e.message);
    });
  }, 840000); // 14 minutes
});
