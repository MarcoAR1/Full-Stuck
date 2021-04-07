const list_halper = require('../utils/list_halper')
const demoBlogs = require('./demoBlogs')

test('dummy return one', () => {
  const result = list_halper.dummy(demoBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('the total like', () => {
    const result = list_halper.totalLikes(demoBlogs)
    expect(result).toBe(36)
  })
})

describe('Most popular author', () => {
  test('the most blogs', () => {
    const result = list_halper.mostBlogs(demoBlogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    expect(result).toStrictEqual(expected)
  })
  test('the most like in blogs', () => {
    const result = list_halper.mostLikes(demoBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toStrictEqual(expected)
  })
})
