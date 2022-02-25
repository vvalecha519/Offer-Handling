var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vvalecha01@gmail.com',
    pass: 'A8v41s519!'
  }
});

var mailOptions = {
  from: 'vvalecha01@gmail.com',
  to: 'vvalecha@uwaterloo.ca',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});