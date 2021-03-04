import React, { useEffect, useState } from 'react'

const Blog = ({ blog, user, submitLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [userCreatedBlog, setUserCreatedBlog] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (blog.user.id === user.id || blog.user === user.id) {
      setUserCreatedBlog(true)
    }
  }, [blog.user, user.id])


  return (
    <div style={{
      border: 'solid',
      margin: '10px',
      padding: '5px'
    }}>
      <div id='title'>
        {blog.title}
      </div>
      <div id='author'>
        {blog.author}
      </div>
      <button
        id='view-button'
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        view
      </button>
      <button
        onClick={toggleVisibility}
        style={showWhenVisible}
      >
        hide
      </button>
      <div>
        <div id='togglableContent' style={showWhenVisible}>
          <div className='url'>{blog.url}</div> <br />
          <div className='likes'>likes <span id='likesNum'>{blog.likes}</span><button onClick={() => submitLike(blog)}>like</button> <br /></div>
          {userCreatedBlog && <button id='remove-button' onClick={() => deleteBlog(blog.id)}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog
