const mongoose = require('mongoose')
const { dbResetUser, Server, api } = require('../utils/list_halper')
const url = `/api/login`

beforeEach(async () => {
  await dbResetUser()
})

describe('login', () => {
  test('a try correct login', async () => {
    const user = {
      username: 'Micheltone',
      password: 'React patterns',
    }

    const requestApi = await api
      .post(url)
      .send(user)
      .expect(202)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body.token).toBeDefined()
  })

  test('a try login with a user dont exist', async () => {
    const user = {
      username: 'Michelton',
      password: 'React patterns',
    }

    const requestApi = await api
      .post(url)
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body).toStrictEqual({
      message: 'pasword or username incorrect.',
    })
  })
  test('a try login with a password incorrect', async () => {
    const user = {
      username: 'Micheltone',
      password: 'React pattern',
    }

    const requestApi = await api
      .post(url)
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(requestApi.body).toStrictEqual({
      message: 'pasword or username incorrect.',
    })
  })
})

afterAll(async () => {
  await Server.close()
  await mongoose.connection.close()
})
