const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// TODO: for production, need a unique account/key for cartagena

export default function handler(req, res) {
  if (req.method === 'POST') {
    const msg = {
      to: 'mnstucky@gmail.com', // need to update for production
      from: 'mnstucky@gmail.com', // same
      subject: 'Contact Form for Cartagena Decor',
      html: `<h2>Message from <strong>${req.body.name}</strong>:</h2></br><p>"${req.body.subject}"</p></br><p>Respond to ${req.body.email}</p>`,
    };
    sgMail.send(msg).then(
      () => {
        res.json({
          status: 'success',
        });
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        res.json({
          status: 'fail',
        });
      },
    );
  }
}
