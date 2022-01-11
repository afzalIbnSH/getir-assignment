const express = require('express')

require('module-alias/register')

const { HTTP_PORT } = require('constants')
const logger = require('logger')
const routes = require('server/routes')

const app = express()

app.use(express.json());
app.use('/routes', routes)

app.listen(HTTP_PORT, function () {
    logger.info(`Getir server listening on port ${HTTP_PORT}!`)
})

module.exports = app