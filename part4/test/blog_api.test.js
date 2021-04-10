const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const {
  dbFind,
  dbFindById,
  dbResetBlog,
  dbResetUser,
  CreateABlogAndToken,
  singAUser,
  api,
  Server,
} = require('../utils/list_halper')
const [...demoBlogs] = require('./demoBlogs.js')
const url = `/api/blogs`

beforeEach(async () => {
  await dbResetUser()
  await dbResetBlog()
})

describe('Get blogs api', () => {
  test('Blogs return as json', async () => {
    const requestApi = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(typeof requestApi.body).toBe(typeof JSON)
  })
  test('Blogs return with user', async () => {
    const requestApi = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const UserinBlog = requestApi.body.find((blog) =>
      blog.user_id ? true : false
    )
    const dbUserFind = await dbFindById(User, UserinBlog.user_id.id)

    expect(UserinBlog.user_id.name).toContain(dbUserFind.name)
  })

  test('Get all blogs method', async () => {
    const requestApi = await api.get(url)
    expect(requestApi.body.length).toStrictEqual(demoBlogs.length)
  })

  test('the id is id not _id', async () => {
    const requestApi = await api.get(url)
    expect(requestApi.body.length).toStrictEqual(demoBlogs.length)
    const data = requestApi.body
    expect(data[0].id).toBeDefined()
    expect(data[0]._id).not.toBeDefined()
  })
})

describe('Post a blog', () => {
  test('the blog is created successful', async () => {
    const { token } = await singAUser()
    const newBlog = {
      title: 'Mi Primer Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'myprimerblog.blog.com',
      likes: 0,
    }

    const createdBlog = await api
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const requestApi = await api.get(url)
    const data = requestApi.body
    const iduser = jwt.verify(token, process.env.SING)

    expect(createdBlog.body.user_id).toStrictEqual(iduser.id)
    expect(data.map((blog) => blog.title)).toContain(newBlog.title)
    expect(data.length).toBe(demoBlogs.length + 1)
  })

  test('if like dont exist in the request her value is 0 ', async () => {
    const { token } = await singAUser()
    const newBlog = {
      title: 'Mi Segundo Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'mysegundoblog.blog.com',
    }

    const requestApi = await api
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const data = await api.get(url)
    expect(data.body.length).toBe(demoBlogs.length + 1)
    expect(requestApi.body.likes).toEqual(0)
  })
  test('if dont exist url, title or author a error 400 bad request', async () => {
    const { token } = await singAUser()
    const newBlog = {
      likes: 25,
    }
    await api
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    const data = await api.get(url)
    expect(data.body.length).toBe(demoBlogs.length)
  })

  test('if i not have a token user', async () => {
    const newBlog = {
      title: 'Mi Primer Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'myprimerblog.blog.com',
      likes: 0,
    }

    const requestApi = await api.post(url).send(newBlog).expect(401)

    expect(requestApi.body).toStrictEqual({ error: 'token missing or invalid' })
  })

  test('if I have a token user Invalid', async () => {
    const newBlog = {
      title: 'Mi Primer Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'myprimerblog.blog.com',
      likes: 0,
    }

    const requestApi = await api
      .post(url)
      .set('Authorization', `Bearer 75464654tokentekinsiismo1546`)
      .send(newBlog)
      .expect(401)

    expect(requestApi.body).toStrictEqual({ error: 'token missing or invalid' })
  })
})

describe('Update a blog', () => {
  test('when updateo a like correct', async () => {
    const { token, Blog_id } = await CreateABlogAndToken()

    const updaterBlog = {
      likes: 351,
    }

    const requestApi = await api
      .put(`${url}/${Blog_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updaterBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body.likes).toBe(351)
    const dbRequestFind = await dbFindById(Blog, Blog_id)
    expect(dbRequestFind.likes).toBe(351)
  })

  test('When update a note with other user', async () => {
    const { Blog_id: id } = await CreateABlogAndToken()
    const { token } = await singAUser()

    const updaterBlog = {
      likes: 351,
      author: 'ElMarcoQueRoba',
    }

    const requestApi = await api
      .put(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updaterBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body).toStrictEqual({
      message: "You haven't authorization for edit this blog",
    })
  })
})
describe('Delete a blog', () => {
  test('When a delete a blog successful', async () => {
    const { Blog_id: id, title, token } = await CreateABlogAndToken()

    await api
      .delete(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const dbRequestFind = await dbFind(Blog)
    expect(dbRequestFind.length).toBe(demoBlogs.length)
    expect(dbRequestFind.map((blog) => blog.title)).not.toContain(title)
  })
  test('When a try delete a blog with user not is a owner', async () => {
    const { title, Blog_id: id } = await CreateABlogAndToken()
    const { token } = await singAUser()

    const DontAuthorize = await api
      .delete(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    expect(DontAuthorize.body).toStrictEqual({
      message: "You haven't authorization for delete this blog",
    })

    const dbRequestFind = await dbFind(Blog)
    expect(dbRequestFind.length).toBe(demoBlogs.length + 1)
    expect(dbRequestFind.map((blog) => blog.title)).toContain(title)
  })
})
afterAll(async () => {
  await Server.close()
  await mongoose.connection.close()
})
