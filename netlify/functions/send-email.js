// netlify/functions/send-email.js
const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  const sendGridResponse = await axios({
    method: 'post',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: {
      personalizations: [{
        to: [{ email: 'james@shawsteadgroup.com' }],
        subject: 'New Contact Form Submission',
      }],
      from: { email: 'no-reply@peytonshawcounseling.com' },
      content: [{
        type: 'text/plain',
        value: `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
      }],
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'success' }),
  };
};
