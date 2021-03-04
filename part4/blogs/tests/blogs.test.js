const listHelper = require('../utils/list_helper')

const listWithZeroBlogs = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('when list no blogs, equals zero likes', () => {
    const total = listHelper.totalLikes(listWithZeroBlogs)
    expect(total).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const total = listHelper.totalLikes(listWithOneBlog)
    expect(total).toBe(5)
  })

  test('equals sum of likes across all blogs', () => {
    const total = listHelper.totalLikes(blogs)
    expect(total).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns the blog with the most likes', () => {
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('returns the author with the most blogs, and the number of blogs by that author', () => {
    const author = listHelper.mostBlogs(blogs)
    expect(author).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('returns the author with the most likes across the blogs, and the number of likes', () => {
    const author = listHelper.mostLikes(blogs)
    expect(author).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
