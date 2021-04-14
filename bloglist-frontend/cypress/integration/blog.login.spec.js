const usuarioTest = {
  username: 'Marco',
  password: 'MarcoARcoMar',
  name: 'Marco',
}
const usuarioTest2 = {
  username: 'MarcoAR',
  password: 'MarcoARcoMar',
  name: 'MarcoTest2',
}

describe('Blog', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/user', usuarioTest)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', () => {
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[placeholder="Username"]').type('Marco')
      cy.get('[placeholder="Password"]').type('MarcoARcoMar')
      cy.contains('Login').click()
      cy.contains('Blogs')
    })
    it('fail with wrong credentials', () => {
      cy.get('[placeholder="Username"]').type('Marco')
      cy.get('[placeholder="Password"]').type('MarcoArco')
      cy.contains('Login').click()
      cy.get('.error')
        .should('contain', 'pasword or username incorrect.')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/user', usuarioTest2)
      cy.login(usuarioTest)
      cy.CreateBlog({
        title: 'eltitulo20516',
        author: 'el super author',
        url: 'http://www.estasmuerto.com',
      })
    })

    it('A blog can be created', () => {
      cy.contains('New Blog').click()
      cy.get('[placeholder="Title"]').type('Mi nuevo titulo')
      cy.get('[placeholder="Author"]').type('Marco')
      cy.get('[placeholder="Url"]').type('https://www.google.com')
      cy.contains('Create').click()
      cy.get('.notification')
        .should('contain', 'Add blog successful Mi nuevo titulo')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Mi nuevo titulo Marco')
    })
    it('A blog can give like', () => {
      cy.contains('view').click()
      cy.contains('likes: 0')
      cy.contains('Like').click()
      cy.contains('likes: 1')
    })
    it('A blog can be delete for his creator', () => {
      cy.contains('eltitulo20516 el super author').as('titleBlog')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('@titleBlog').should('not.exist')
    })
    it('A blog can`t be delete for other user', () => {
      cy.outLogin()
      cy.login(usuarioTest2)
      cy.contains('eltitulo20516 el super author').as('titleBlog')
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe.only('Blogs order', () => {
    beforeEach(() => {
      cy.login(usuarioTest)
      const newBlogs = [
        {
          title: 'Titutlo Tercero',
          author: 'el super author',
          url: 'http://www.estasmuerto.com',
          likes: 3,
        },
        {
          title: 'Titutlo Segundo',
          author: 'el super author',
          url: 'http://www.estasmuerto.com',
          likes: 4,
        },
        {
          title: 'Titulo Primero',
          author: 'el super author',
          url: 'http://www.estasmuerto.com',
          likes: 5,
        },
        {
          title: 'Titulo Cuarto',
          author: 'el super author',
          url: 'http://www.estasmuerto.com',
          likes: 2,
        },
      ]
      cy.CreateBlogs(newBlogs)
    })

    it('oder for likes is correct', () => {
      cy.get('#Blogs-Containers')
        .children()
        .then((childrens) => {
          cy.wrap(childrens[0]).should(
            'contain',
            'Titulo Primero el super author'
          )
          cy.wrap(childrens[1]).should(
            'contain',
            'Titutlo Segundo el super author'
          )
          cy.wrap(childrens[2]).should(
            'contain',
            'Titutlo Tercero el super author'
          )
          cy.wrap(childrens[3]).should(
            'contain',
            'Titulo Cuarto el super author'
          )
        })
    })
  })
})
