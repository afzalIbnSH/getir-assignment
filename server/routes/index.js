const express = require('express')

const challenge = require('server/routes/challenge')

const router = express.Router()

router.use('/challenge', challenge)

module.exports = router