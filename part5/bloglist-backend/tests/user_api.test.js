const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})


describe('user route tests', () => {

  test('user is properly saved to the database', async () => {
    const newUser = {
      username: 'timmy123',
      password: 'password',
      name: 'Timmy',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('adding user with duplicate username returns 400 bad request', async () => {
    const newUser = {
      username: 'timmy123',
      password: 'password123',
      name: 'Timmy Smith',
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)
  })

  test('adding user with a password that is too short returns 400 bad request', async () => {
    const newUser = {
      username: 'lreiland',
      password: 'pa',
      name: 'Lindsey',
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)
  })

  test('adding user with a username that is too short returns 400 bad request', async () => {
    const newUser = {
      username: 'lr',
      password: 'password',
      name: 'Lindsey',
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)
  })

  test('adding user without a username returns 400 bad request', async () => {
    const newUser = {
      password: 'password',
      name: 'Lindsey',
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})