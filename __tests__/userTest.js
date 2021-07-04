//importing required modules.
const app = require('../app')
const test = require('supertest')

//model used for the user objects in the database
const Users = require('../models/users') 


/******************** TESTS *****************************/


describe('Post registered user unsuccesfully (poor password)', () => {
  it('should try to register a new user and fail due to wrong password format', async () => {
    const res = await test(app)
      .post('/api/users/register')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed",
        name: "Guest Man",
        role: "user"
      })
    expect(res.statusCode).toEqual(400)
  })
});

describe('Post registered user unsuccesfully (empty fields)', () => {
  it('should try to register a new user and fail due to empty fields', async () => {
    const res = await test(app)
      .post('/api/users/register')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed99",
        name: "",
        role: "user"
      })
    expect(res.statusCode).toEqual(400)
  })
});

describe('Post newly registered user', () => {
  it('should try to register a new user', async () => {
    const res = await test(app)
      .post('/api/users/register')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed99",
        name: "Guest Man",
        role: "user"
      })
    expect(res.statusCode).toEqual(201)
  })
});

describe('Post registered user who already exists', () => {
  it('should try to register a new user and fail due to same email', async () => {
    const res = await test(app)
      .post('/api/users/register')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed99",
        name: "Guest Man",
        role: "user"
      })
    expect(res.statusCode).toEqual(400)
  })
});

describe('Post unsuccessful login into demo account', () => {
  it('should try to log into test accountand fail', async () => {
    const res = await test(app)
      .post('/api/users/login')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed98",
      })
    expect(res.statusCode).toEqual(400)
  })
});

describe('Post login into demo account', () => {
  it('should try to log into test account', async () => {
    const res = await test(app)
      .post('/api/users/login')
      .send({
        email: 'demo@hotmail.co.uk',
        password: "Mohammed99",
      })
    expect(res.statusCode).toEqual(200)
  })
});
