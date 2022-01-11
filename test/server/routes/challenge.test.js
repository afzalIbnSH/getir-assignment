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
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"startDate" is required',
            status: 1
        })
    })

    it('Should detect invalid startDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: 'startDate' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"startDate" must be in YYYY-MM-DD format',
            status: 1
        })
    })

    it('Should detect missing endDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"endDate" is required',
            status: 1
        })
    })

    it('Should detect invalid endDate', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: 'endDate' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"endDate" must be in YYYY-MM-DD format',
            status: 1
        })
    })

    it('Should detect missing minCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"minCount" is required',
            status: 1
        })
    })

    it('Should detect invalid minCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 'i' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"minCount" must be a number',
            status: 1
        })
    })

    it('Should detect missing maxCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6 })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"maxCount" is required',
            status: 1
        })
    })

    it('Should detect invalid maxCount', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6, maxCount: 'i' })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            errType: 'Validation Failure',
            msg: '"maxCount" must be a number',
            status: 1
        })
    })

    it('Should succeed in the absence of all above errors', async () => {
        const res = await agent
            .post(endpoint)
            .set('Accept', 'application.json')
            .send({ startDate: '2021-11-11', endDate: '2021-12-12', minCount: 6, maxCount: 10 })
            .expect('Content-Type', /json/)
            .expect(200)
        assert.deepEqual(res.body, {
            msg: 'Success',
            records: [],
            status: 0
        })
    })
})