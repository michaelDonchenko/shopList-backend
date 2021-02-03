const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.isAuth = async (req, res, next) => {
  //get the token
  const token = req.header('authToken')

  //check for token
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.room = decoded.room
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' })
  }
}
