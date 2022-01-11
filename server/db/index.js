const { MongoClient } = require('mongodb')

const { DB_URL, DB_NAME } = require('constants')
const logger = require('logger')

async function getDB() {
    const client = new MongoClient(`${DB_URL}?retryWrites=true`)
    await client.connect();
    logger.info('Connected successfully to db server');
    return client.db(DB_NAME);
}
module.exports = getDB()