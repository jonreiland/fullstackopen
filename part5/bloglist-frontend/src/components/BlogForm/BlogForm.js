import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <label>title</label>
      <input
        id='title'
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /><br />
      <label>author</label>
      <input
        id='author'
        type='text'
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      /><br />
      <label>url</label>
      <input
        id='url'
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button id='create-new-blog-submit-button' type='submit'>create</button><br />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm