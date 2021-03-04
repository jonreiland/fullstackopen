import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: "This is the blog title",
    author: "Jon",
    url: "example.com",
    likes: 10,
    user: {
      blogs: [
        "5ffbc7cf51944c0efe5b7790",
        "601b351c9d51ef592643004e",
      ],
      username: "jreiland",
      name: "Jon Reiland",
      id: "5ffbc59a24a6810e99d895b8"
    },
    id: "601da0b1bbf63080c2f5eacc"
  }

  const user = {
    username: "jreiland",
    name: "Jon Reiland",
    id: "5ffbc59a24a6810e99d895b8"
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog 
        blog={blog}
        user={user}
        submitLike={mockHandler}
      />
    )
  })

  test('renders initial content', () => {
    expect(component.container).toHaveTextContent(
      'This is the blog title'
    )
    const author = component.getByText(
      'Jon'
    )
    expect(author).toBeDefined()

    const div = component.container.querySelector('#togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('render additional content on button click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('#togglableContent')
    expect(div).toHaveStyle('display: block')
  })

  test('when like button is clicked twice, function is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
