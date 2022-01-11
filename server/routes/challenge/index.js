const express = require('express')

const { API_RESPONSE } = require('constants')
const { schema } = require('server/routes/challenge/helper')

const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        // Would've ideally used different http codes for the errors.
        // To comply with the instructions, will be using a status code in the body instead.
        res.status(200)
        let body = {}

        const basicValidation = schema.post.validate(req.body)
        if (basicValidation.error) {
            body.status = API_RESPONSE.VALIDATION_FAILURE.code
            body.errType = API_RESPONSE.VALIDATION_FAILURE.type
            body.msg = basicValidation.error.details[0].message
            return res.json(body)
        }

        body.status = API_RESPONSE.SUCCESS.code
        body.msg = API_RESPONSE.SUCCESS.msg
        body.records = []
        res.json(body)
    } catch (err) {
        return next(err)
    }
})

module.exports = router