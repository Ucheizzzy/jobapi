const express = require('express')
const router = express.Router()

const {
  getAllJob,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require('../controller/jobs')

router.route('/').post(createJob).get(getAllJob)
router.route('/stats').get(showStats)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router
