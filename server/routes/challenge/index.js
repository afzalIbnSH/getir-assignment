const express = require('express')

const { API_RESPONSE } = require('constants')
const { schema } = require('server/routes/challenge/helper')
const getDB = require('server/db')
const logger = require('logger')

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
        const { startDate, endDate, minCount, maxCount } = req.body
        logger.info('Request body validated')

        body.status = API_RESPONSE.SUCCESS.code
        body.msg = API_RESPONSE.SUCCESS.msg

        const db = await getDB
        body.records = await db.collection('records').aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                        $sum: '$counts'
                    }
                }
            },
            {
                $match: {
                    totalCount: {
                        $gte: minCount,
                        $lte: maxCount
                    }
                }
            }
        ]).toArray()
        logger.info('Matching records fetched')

        res.json(body)
    } catch (err) {
        return next(err)
    }
})

module.exports = router