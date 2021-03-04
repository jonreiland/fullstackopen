const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!Object.prototype.hasOwnProperty.call(request.body, 'likes')) {
    request.body.likes = 0
  }
  if (!Object.prototype.hasOwnProperty.call(request.body, 'title') &&
    !Object.prototype.hasOwnProperty.call(request.body, 'url')) {
    response.sendStatus(400)
  } else {
    const user = await User.findOne({ username: decodedToken.username })
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    lean: true
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
