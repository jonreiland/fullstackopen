const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blog route tests', () => {
  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(6)
  })

  test('blogs have property of id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
  })

  test('blog is properly saved to the database', async () => {
    const newBlog = {
      title: 'How to test backends',
      author: 'Jon Reiland',
      url: 'https://testme.com/',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      'How to test backends'
    )
  })

  test('blog saved with missing likes property has likes set to zero', async () => {
    const newBlog = {
      title: 'How to test backends',
      author: 'Jon Reiland',
      url: 'https://testme.com/'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  test('sending a blog without a url and title receives a 400 bad request', async () => {
    const newBlog = {
      author: 'Lindsey Reiland'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog is properly deleted from the database', async () => {
    const blog = await Blog.findOne({})
    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(response.body).toHaveLength(initialBlogs.length - 1)
    expect(ids).not.toContain(
      blog._id
    )
  })

  test('blog is properly updated in the database', async () => {
    const blog = await Blog.findOne({})
    const updatedBlog = { ...blog, likes: blog.likes++ }
    await api
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
