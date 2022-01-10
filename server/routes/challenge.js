const express = require('express')

const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        res.status(200).json({})
    } catch (err) {
        return next(err)
    }
})

module.exports = router