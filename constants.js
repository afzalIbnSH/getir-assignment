module.exports = {
    HTTP_PORT: process.env.PORT || 3000,
    LOG_LEVEL: 'debug',
    SILENT_LOGS: 'false',
    API_RESPONSE: {
        SUCCESS: {
            code: 0,
            msg: 'Success'
        },
        VALIDATION_FAILURE: {
            code: 1,
            type: 'Validation Failure'
        }
    },
    DB_URL: 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/',
    DB_NAME: 'getir-case-study'
}