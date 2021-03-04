import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(newBlogs =>
      setBlogs(sortedByLikes(newBlogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const sortedByLikes = (blogsArray) => {
    const sortedBlogs = blogsArray.sort((a, b) => {
      return b.likes - a.likes
    })
    return sortedBlogs
  }

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(sortedByLikes(blogs.concat(response)))
        showNotification('blog added')
      })
      .catch(error => {
        console.error(error)
        showNotification('failed')
      })
    blogFormRef.current.toggleVisibility()
  }

  const submitLike = (likedBlog) => {
    const updatedBlog = {
      user: likedBlog.user._id,
      likes: likedBlog.likes + 1,
      author: likedBlog.author,
      title: likedBlog.title,
      url: likedBlog.url
    }
    blogService
      .update(likedBlog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(sortedByLikes(blogs.map(blog => blog.id !== likedBlog.id ? blog : returnedBlog)))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const deleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(
          setBlogs(sortedByLikes(blogs.filter(blog => blog.id !== id)))
        )
    }
  }

  const showNotification = (text) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({
        username, password
      })
      console.log(returnedUser)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(returnedUser)
      )
      setUser(returnedUser)
      blogService.setToken(returnedUser.token)
      showNotification('login successful')
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <p>{notification}</p>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{notification}</p>
      <p>{user.name} logged in</p>
      <p><button onClick={handleLogout}>Log Out</button></p>
      <h3>create new</h3>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable><br />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          submitLike={submitLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}


export default App