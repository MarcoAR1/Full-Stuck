Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((res) => {
    localStorage.setItem('login', JSON.stringify(res.body))
  })
  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('CreateBlog', ({ title = '', author = '', url = '' }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('login')).token
      }`,
    },
    body: {
      title,
      author,
      url,
    },
  })
  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('outLogin', () => {
  localStorage.clear()
  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('CreateBlogs', (blogs) => {
  blogs.forEach((blog) => {
    const { title, author, url, likes } = blog
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('login')).token
        }`,
      },
      body: {
        title,
        author,
        url,
        likes,
      },
    })
  })

  cy.visit('http://localhost:3000')
})
