const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const User = require('../models/User')
const {
  dbResetUser,
  dbResetBlog,
  dbFind,
  dbFindById,
  api,
  Server,
} = require('../utils/list_halper')
const [...demoBlogs] = require('./demoBlogs.js')
const [...demoUsername] = require('./demoUsername.js')
const url = `/api/user`

beforeEach(async () => {
  await dbResetUser()
  await dbResetBlog()
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
  test('the  username < to 3 characters', async () => {
    const newUserShortusername = {
      username: 'pa',
      password: '312132312231221',
      name: 'SoyPablito',
    }

    const requestApi = await api
      .post(url)
      .send(newUserShortusername)
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

describe('When delete a user', () => {
  test('when delete is successful', async () => {
    const userCreate = {
      username: 'hello my name',
      password: 'I have any password',
      name: 'o sea hello',
    }

    await api.post(url).send(userCreate).expect(201)
    const userToken = await api.post('/api/login').send(userCreate).expect(202)
    const prevDelete = await dbFind(Blog)
    await api
      .delete(url)
      .set('Authorization', `Bearer ${userToken.body.token}`)
      .send(userCreate)
      .expect(204)
    const currentBlogs = await dbFind(Blog)
    expect(currentBlogs.length).toBe(prevDelete.length)
  })
  test('when delete is try without token', async () => {
    const userCreate = {
      username: 'hello my name',
      password: 'I have any password',
      name: 'o sea hello',
    }

    await api.post(url).send(userCreate).expect(201)

    await api.delete(url).send(userCreate).expect(401)
  })
  test('When is delete and this user have many blogs all delete', async () => {
    const userCreate = {
      username: 'hello my name',
      password: 'I have any password',
      name: 'o sea hello',
    }

    await api.post(url).send(userCreate).expect(201)
    const userToken = await api.post('/api/login').send(userCreate).expect(202)
    const lengthBlog = demoBlogs.length
    const Blogdemo = {
      title: 'hola que hace facherado5646546546',
      author: 'o sea hello',
      url: 'http://blog.cleancoder.com/uncle-bob/',
    }
    for (let i = 0; i < 3; i += 1) {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken.body.token}`)
        .send(Blogdemo)
        .expect(201)
    }
    const prevDelete = await dbFind(Blog)
    await api
      .delete(url)
      .set('Authorization', `Bearer ${userToken.body.token}`)
      .send(userCreate)
      .expect(204)
    const currentBlogs = await dbFind(Blog)
    expect(prevDelete.length).toBe(lengthBlog + 3)
    expect(currentBlogs.length).toBe(lengthBlog)
    expect(currentBlogs.map((blog) => blog.title)).not.toContain(Blogdemo.title)
  })
})

afterAll(async () => {
  await Server.close()
  await mongoose.connection.close()
})
