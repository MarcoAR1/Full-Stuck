const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, Server } = require('../index')
const Blog = require('../models/Blog')
const User = require('../models/User')
const { dbReset, dbFind, dbFindById } = require('../utils/list_halper')
const [...demoBlogs] = require('./demoBlogs.js')
const [...demoUsername] = require('./demoUsername')
const url = `/api/blogs`
const api = supertest(app)

beforeEach(async () => {
  await dbReset(User, Blog, demoUsername, demoBlogs)
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
    const newBlog = {
      title: 'Mi Primer Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'myprimerblog.blog.com',
      likes: 0,
    }
    await api
      .post(url)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const requestApi = await api.get(url)
    const data = requestApi.body
    expect(data.map((blog) => blog.title)).toContain(newBlog.title)
    expect(data.length).toBe(demoBlogs.length + 1)
  })

  test('if like dont exist in the request her value is 0 ', async () => {
    const newBlog = {
      title: 'Mi Segundo Blog hola Que Hacer',
      author: 'Marco Antonio Rivero',
      url: 'mysegundoblog.blog.com',
    }
    const requestApi = await api
      .post(url)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const data = await api.get(url)
    expect(data.body.length).toBe(demoBlogs.length + 1)
    expect(requestApi.body.likes).toEqual(0)
  })
  test('if dont exist url, title or author a error 400 bad request', async () => {
    const newBlog = {
      likes: 25,
    }
    await api.post(url).send(newBlog).expect(400)
    const data = await api.get(url)
    expect(data.body.length).toBe(demoBlogs.length)
  })
})

describe('Update a blog', () => {
  test('when updateo a like', async () => {
    const dbRequest = await dbFind(Blog)
    const { id } = dbRequest[Math.floor(Math.random() * dbRequest.length)]
    const updaterBlog = {
      likes: 351,
    }
    const requestApi = await api
      .put(`${url}/${id}`)
      .send(updaterBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(requestApi.body.likes).toBe(351)
    const dbRequestFind = await dbFindById(Blog, id)
    expect(dbRequestFind.likes).toBe(351)
  })
})
describe('Delete a blog', () => {
  test('when a delete a blog', async () => {
    const dbRequest = await dbFind(Blog)
    const position = Math.floor(Math.random() * dbRequest.length)
    const { id, title } = dbRequest[position]
    await api.delete(`${url}/${id}`).expect(204)
    const dbRequestFind = await dbFind(Blog)
    expect(dbRequestFind.length).toBe(dbRequest.length - 1)
    expect(dbRequestFind.map((blog) => blog.title)).not.toContain(title)
  })
})
afterAll(async () => {
  await Server.close()
  await mongoose.connection.close()
})
