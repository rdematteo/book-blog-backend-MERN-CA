// private endpoints go here
const secrets = (req, res) => {
  return res.send('accessed private endpoint')
}

module.exports = {
  secrets
}