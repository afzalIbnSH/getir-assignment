const winston = require('winston')
const { combine, colorize, splat, simple } = winston.format

require('module-alias/register')

const { LOG_LEVEL, SILENT_LOGS } = require('constants')

const logger = winston.createLogger({
    level: LOG_LEVEL,
    transports: [
        new winston.transports.Console({
            format: combine(colorize(), splat(), simple())
        })
    ],
    silent: SILENT_LOGS === true
})

module.exports = logger