const request = require("request");

//email subscription
const emailSubscription = (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    res.redirect(firstName);
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: "https://us6.api.mailchimp.com/3.0/lists/f32ed9429d",
    method: "POST",
    headers: {
      Authorization: `auth ${process.env.MAILCHIMP_KEY}`
    },
    body: postData
  };

  request(options, (err, response, body) => {
    if (err) {
      res.status(406).send("unable to subscribe");
    } else {
      if (response.statusCode === 200) {
        res.status(200).send("successfully subscribed");
      } else {
        res.status(406).send("unable to subscribe");
      }
    }
  });
};

module.exports = { emailSubscription };
