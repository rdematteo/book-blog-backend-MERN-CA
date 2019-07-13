const request = require('request');

//email subscription
const emailSubscription = (req, res) => {
  console.log(req.body)
  const { firstName, lastName, email } = req.body;
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
      Authorization: 'auth c8c947be5ffc22189c9a6e13d164f40c-us6'
    },
    body: postData
  };

  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/fail.html');
    } else {
      if (response.statusCode === 200) {
        res.redirect('/success.html');
      } else {
        res.redirect('/fail.html');
      }
    }
  });
}

module.exports = { emailSubscription } 
