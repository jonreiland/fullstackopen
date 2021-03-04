import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm 
      createBlog={createBlog} 
      />
    )
  })

  test('submit handler receives correct details when called', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { 
      target: { value: 'this is a new blog' } 
    })
    fireEvent.change(authorInput, { 
      target: { value: 'Jon Reiland' } 
    })
    fireEvent.change(urlInput, { 
      target: { value: 'testingblogs.com' } 
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('this is a new blog' )
    expect(createBlog.mock.calls[0][0].author).toBe('Jon Reiland' )
    expect(createBlog.mock.calls[0][0].url).toBe('testingblogs.com' )
    expect(createBlog.mock.calls).toHaveLength(1)
  })

})
