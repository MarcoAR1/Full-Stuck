import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const testLikeButton = jest.fn()
  beforeEach(() => {
    const usuario = {
      name: 'Marco',
      username: 'MarcoARcoARco',
      token: 'asdasda54sd654a4sd65a46s5d46as4d',
    }
    const blogs = [
      {
        author: 'Marco',
        title: 'Las vacas locas',
        likes: 0,
        id: 1213,
        user_id: { usarname: 'MarcoARcoARco' },
        url: 'http://blog.cleancoder.com/uncle-bob/',
      },
    ]
    component = render(
      <Blog blogs={blogs} usuario={usuario} handleLiked={testLikeButton} />
    )
  })

  test('dont show likes and author', () => {
    const button = component.getByText('view')
    const url = component.getByText('http://blog.cleancoder.com/uncle-bob/')
    expect(url.parentNode).toHaveClass('hidden')
    fireEvent.click(button)
    expect(url.parentNode).not.toHaveClass('hidden')
    expect(button).toHaveTextContent('hiden')
  })
  test('clicks in the like button', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(testLikeButton).toHaveBeenCalledTimes(2)
  })
})
