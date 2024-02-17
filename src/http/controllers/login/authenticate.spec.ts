import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Login (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    await request(app.server).post('/orgs').send({
      name: 'Test org pets',
      email: 'test@test.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    })

    await request(app.server).post('/users').send({
      name: 'Dougrilhos Sucrilhos',
      email: 'test@test.com',
      password: '123456789',
    })
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate org', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '123456789',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate org with wrong email', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'erro@test.com',
      password: '123456789',
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      message: expect.any(String),
    })
  })

  it('should not be able to authenticate org with wrong password', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '987654321',
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      message: expect.any(String),
    })
  })

  it('should be able to authenticate user', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '123456789',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
  })
  it('should not be able to authenticate user with wrong email', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'error@test.com',
      password: '123456789',
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      message: expect.any(String),
    })
  })

  it('should not be able to authenticate user with wrong password', async () => {
    const res = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '987654321',
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      message: expect.any(String),
    })
  })
})
