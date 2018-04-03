import sgMail from '@sendgrid/mail';
import { getUserEmail } from './emailQueries';

sgMail.setApiKey(process.env.EMAIL_KEY);

export const sendEmail = async (req, res) => {
  try {
    if (req.body.seller && req.body.to && req.body.post) {
      const data = await getUserEmail(req.body.to);
      const msg = {
        to: data.email,
        from: 'info@swapn.com',
        subject: 'Offer has been accepted!',
        html: `
        <h1>Swap'n</h1>
        <br/> Hi ${req.body.to}: <br /> <strong>${
  req.body.seller
} has accepted you offer on his/her post ${req.body.post}</strong>`,
      };
      sgMail.send(msg);
      res.send('go check your email');
    }
  } catch (err) {
    console.log('err sendEmail', err);
  }
};
