const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = JoiBase.extend(JoiDate)

const dateFormat = 'YYYY-MM-DD'

const schema = {
    post: Joi.object({
        startDate: Joi.date().format(dateFormat).raw().required(),
        endDate: Joi.date().format(dateFormat).raw().required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required()
    })
}

module.exports = {
    schema
}