const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, Server } = require('../index')
const Blog = require('../models/Blog')
const User = require('../models/User')
const { dbReset, dbFind, dbFindById } = require('../utils/list_halper')
const [...demoBlogs] = require('./demoBlogs')
const [...demoUsername] = require('./demoUsername.js')
const url = `/api/user`
const api = supertest(app)

beforeEach(async () => {
  await dbReset(User, Blog, demoUsername, demoBlogs)
})

describe('Get user test ', () => {
  test('get all user', async () => {
    const requestApi = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body.length).toBe(demoUsername.length)
  })

  test('get a user with blogs', async () => {
    const requestApi = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const indexblogs_idInUser = requestApi.body.findIndex((user) =>
      user.blogs_id[0] ? true : false
    )
    const BloginUser = requestApi.body[
      indexblogs_idInUser
    ].blogs_id.find((blog) => (blog.title ? true : false))
    const dbFindBlog = await dbFindById(Blog, BloginUser.id)

    expect(BloginUser.title).toContain(dbFindBlog.title)
  })
})

describe('post user test', () => {
  test('New user post', async () => {
    const newUser = {
      username: 'pablitoclavounclavito',
      password: 'altahackeada',
      name: 'pablito el calvito',
    }

    const requestApi = await api
      .post(url)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const dbRequest = await dbFind(User)

    expect({
      name: requestApi.body.name,
      username: requestApi.body.user,
    }).toStrictEqual({ username: newUser.user, name: newUser.name })
    expect(dbRequest.map((user) => user.password)).not.toContain(
      newUser.password
    )
    expect(dbRequest.map((user) => user.name)).toContain(newUser.name)
    expect(dbRequest.length).toStrictEqual(demoUsername.length + 1)
  })
  test('New user when exist a user', async () => {
    const newUser = {
      username: 'pablitoclavounclavito',
      password: 'altahackeada',
      name: 'pablito el calvito',
    }
    const newUserDuplicate = {
      username: 'pablitoclavounclavito',
      password: '312132312231221',
      name: 'SoyPablito',
    }

    await api
      .post(url)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    await api
      .post(url)
      .send(newUserDuplicate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when post incorrect user', () => {
  test('the  usarname < to 3 characters', async () => {
    const newUserShortUsarname = {
      username: 'pa',
      password: '312132312231221',
      name: 'SoyPablito',
    }

    const requestApi = await api
      .post(url)
      .send(newUserShortUsarname)
      .expect(400)
    expect(requestApi.body).toStrictEqual({
      message: 'usernama it too short, minimum 3 characters',
    })
  })
  test('the password  < to 3 characters', async () => {
    const newUserShortPassword = {
      username: 'pablitoclavounclavito',
      password: undefined,
      name: 'SoyPablito',
    }

    const requestApi2 = await api
      .post(url)
      .send(newUserShortPassword)
      .expect(400)
    expect(requestApi2.body).toStrictEqual({
      message: 'password it too short, minimum 3 characters',
    })
  })
})

afterAll(async () => {
  await Server.close()
  await mongoose.connection.close()
})
