import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import FormCreateBlog from './FromCreateBlog'

describe('<FormCreateBlog/>', () => {
  let component
  const testSumitForm = jest.fn()
  beforeEach(() => {
    component = render(<FormCreateBlog handleCreateBlogs={testSumitForm} />)
  })
  test('Sumit a form call function controlled and values correct', () => {
    const form = component.container.querySelector('#formSubmit')
    const input = component.container.querySelector('#Title')
    fireEvent.change(input, {
      target: {
        value: 'hola que hace soy un texto',
      },
    })
    const button = component.getByText('Create')
    fireEvent.click(button)
    expect(input).toHaveValue('hola que hace soy un texto')
    expect(form).toContainElement(input)
    expect(testSumitForm).toBeCalledTimes(1)
  })
})
