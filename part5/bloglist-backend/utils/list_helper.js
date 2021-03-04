const countBy = require('lodash/countBy')
const forIn = require('lodash/forIn')
const find = require('lodash/find')

const totalLikes = (blogs) => {
  const total = blogs.reduce((accumulator, current) => {
    return accumulator + current.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return max
}

const mostBlogs = (blogs) => {
  const authorCounts = []
  forIn(countBy(blogs, 'author'), (value, key) => {
    authorCounts.push({
      author: key,
      blogs: value
    })
  })
  const max = authorCounts.reduce((prev, current) => {
    return (prev.blogs > current.blogs) ? prev : current
  })
  return max
}

const mostLikes = (blogs) => {
  const authors = []
  blogs.forEach(blog => {
    authors.push(blog.author)
  })
  const uniqueAuthors = authors.filter((value, index, array) => {
    return array.indexOf(value) === index
  })
  const collection = []
  uniqueAuthors.forEach(author => {
    collection.push({
      author: author,
      likes: 0
    })
  })
  blogs.forEach(blog => {
    const object = find(collection, ['author', blog.author])
    const index = collection.indexOf(object)
    collection[index] = {
      author: object.author,
      likes: object.likes + blog.likes
    }
  })
  const max = collection.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return max
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
