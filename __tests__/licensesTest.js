//importing required modules.
const app = require('../app')
const test = require('supertest')

//model used for the user objects in the database
const License = require('../models/licenses') 

describe('Post new license application', () => {
  it('should try to add new application but fail due to failed authentication', async () => {
    const res = await test(app)
      .post('/api/licenses/')
      .send({
        companyname: "Boris",
        companytype: "gov",
        details: "testtttttt",
        address: "10 downing street"
      })
    expect(res.statusCode).toEqual(400)
  })
});

describe('get the license applications', () => {
  it('should try to get the license application but fail due to failed authentication', async () => {
    const res = await test(app)
      .get('/api/licenses/')
    expect(res.statusCode).toEqual(400)
  })
});

/*
describe('Post updating license application', () => {
  it('should try to update license status but fail due to failed authentication', async () => {
    const res = await test(app)
      .post('/api/licenses/')
      .send({
        license_id, : "Boris",
        newstatus: "pending",
      })
    expect(res.statusCode).toEqual(400)
  })
});

*/