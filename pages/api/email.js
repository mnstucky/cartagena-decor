const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// TODO: for production, need a unique account/key for cartagena

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Request received');
    const msg = {
      to: 'mnstucky@gmail.com', // need to update for production
      from: 'mnstucky@gmail.com', // same
      subject: 'Contact Form for Cartagena Decor',
      html: `<h1>Message from <strong>${req.body.name}</strong>:</h1></br> "${req.body.subject}"`,
    };
    sgMail.send(msg).then(
      () => {
        console.log('Sent');
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
