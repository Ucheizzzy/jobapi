const { StatusCodes } = require('http-status-codes')
const Job = require('../model/Job')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJob = async (req, res) => {
  //we want to get only the jobs that is associated with a users so we will sort by createdBy
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  //nested destructuring of the req
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  // const { userId } = req.user
  // const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  //nested destruction of the req
  const {
    user: { userId },
    body: { company, position },
    params: { id: jobId },
  } = req
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
  res.status(200).send('delete a job')
}

const showStats = async (req, res) => {
  res.status(200).send('show stats a job')
}

module.exports = {
  getAllJob,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
}
