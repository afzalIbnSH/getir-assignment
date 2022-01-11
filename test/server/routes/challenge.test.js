const assert = require('assert')
const request = require('supertest')

const app = require('server')

const agent = request.agent(app)
const endpoint = '/routes/challenge'

describe('Challenge API', () => {
    it('Should detect missing startDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"startDate" is required' })
    })

    it('Should detect invalid startDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: 'startDate' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"startDate" must be in YYYY-MM-DD format' })
    })

    it('Should detect missing endDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"endDate" is required' })
    })

    it('Should detect invalid endDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: 'endDate' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"endDate" must be in YYYY-MM-DD format' })
    })

    it('Should detect missing minCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"minCount" is required' })
    })

    it('Should detect invalid minCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 'i' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"minCount" must be a number' })
    })

    it('Should detect missing maxCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6 })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"maxCount" is required' })
    })

    it('Should detect invalid maxCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6, maxCount: 'i' })
            .expect('Content-Type', /json/)
            .expect(400)
        assert.deepEqual(res.body, { error: '"maxCount" must be a number' })
    })

    it('Should succeed in the absence of all above errors', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6, maxCount: 10 })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            endDate: '2021-12-12',
            maxCount: 10,
            minCount: 6,
            startDate: '2021-11-11'
        })
    })
})