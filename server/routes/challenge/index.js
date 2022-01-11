const express = require('express')

const { schema } = require('server/routes/challenge/helper')

const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        const basicValidation = schema.post.validate(req.body)
        if (basicValidation.error) {
            return res.status(400).json({ error: basicValidation.error.details[0].message })
        }
        res.status(200).json(req.body)
    } catch (err) {
        return next(err)
    }
})

module.exports = router