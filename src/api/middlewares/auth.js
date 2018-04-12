module.exports = {
  restrictAccess: restrict
}

function restrict (req, res, next) {
  console.log('restriced route: do require auth')
  next()
}