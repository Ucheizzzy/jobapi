const User = require('../model/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
  const { email, password } = req.body
  //chek if the email or password is not provided
  if (!email || !password) {
    throw new BadRequestError('Please enter your email or passowrd')
  }
  //find the email in the database
  const user = await User.findOne({ email })
  //check if the email is in the database
  if (!user) {
    throw new UnauthenticatedError('invalid credentials')
  }
  //is the password correct? from the user model
  const isPasswordCorrect = await user.confirmPassword(password)
  //if it is false throw error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid email or password')
  }
  //create jwt
  const token = await user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}
const updateUser = async (req, res) => {
  res.status(200).send('update wroute is working')
}

module.exports = { register, login, updateUser }

//postman code for setting up dynamic authentication tokens
// const jsonData = pm.response.json()
// pm.globals.set('accessToken', jsonData.token)
