import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register user', async () => {
    const res = await request(app.server).post('/users').send({
      name: 'Dougrilhos Sucrilhos',
      email: 'test@test.com',
      password: '123456789',
    })

    expect(res.statusCode).toEqual(201)
  })

  it('Should not be able to register user email aready exits', async () => {
    const body = {
      name: 'Dougrilhos Sucrilhos',
      email: 'test@test.com',
      password: '123456789',
    }

    await request(app.server).post('/users').send(body)

    const res = await request(app.server).post('/users').send(body)

    expect(res.statusCode).toEqual(409)
    expect(res.body.message).toEqual('User email already exists.')
  })
})
