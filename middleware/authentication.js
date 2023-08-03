const { UnauthenticatedError } = require('../errors')
const User = require('../model/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  //collect the header authorization from the req

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authenication invalid')
  }
  //get the token as an array
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_sECRET)
    //create a request of user
    // attach the user to the job routes
    // const user = User.findById(payload.id).select('-password')
    // req.user = user
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication error')
  }
}
module.exports = auth
