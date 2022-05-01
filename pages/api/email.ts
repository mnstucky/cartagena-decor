const nodemailer = require("nodemailer");

export default function handler(req, res) {
  if (req.method === "POST") {
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 587,
      secure: false,
      auth: { user: process.env.YAHOO_USER, pass: process.env.YAHOO_PASSWORD },
    });
    const msg = {
      to: process.env.EMAIL_FROM,
      from: "cartagenadecor@yahoo.com",
      subject: "Contact Form for Cartagena Decor",
      html: `<h2>Message from <strong>${req.body.name}</strong>:</h2></br><p>"${req.body.subject}"</p></br><p>Respond to ${req.body.email}</p>`,
    };
    transporter.sendMail(msg).then(
      () => {
        res.json({
          status: "success",
        });
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        res.json({
          status: "fail",
        });
      }
    );
  }
}
