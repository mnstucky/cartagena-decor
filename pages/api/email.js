const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
  if (req.method === "POST") {
    const msg = {
      to: "info@cartagenadecor.com", // Update SendGrid to include l
      from: "info@cartagenadecor.com", // same
      subject: "Contact Form for Cartagena Decor",
      html: `<h2>Message from <strong>${req.body.name}</strong>:</h2></br><p>"${req.body.subject}"</p></br><p>Respond to ${req.body.email}</p>`,
    };
    sgMail.send(msg).then(
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
