const request = require('request');

//email subscription
const emailSubscription = (req, res) => {
  const { firstName, lastName, email } = req.body;
  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect(firstName);
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us6.api.mailchimp.com/3.0/lists/f32ed9429d',
    method: 'POST',
    headers: {
      Authorization: `auth ${process.env.MAILCHIMP_KEY}`
    },
    body: postData
  };

  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/fail.html');
    } else {
      if (response.statusCode === 200) {
        //console.log("hello1")

        res.redirect('/success.html');
      } else {
        //console.log("hello")

        res.redirect('/fail.html');
      }
    }
  });
}

module.exports = { emailSubscription } 
