import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const res = await request(app.server).post('/orgs').send({
      name: 'Test org pets',
      email: 'test@test.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    })

    expect(res.statusCode).toEqual(201)
  })

  it('Should not be able to register name org aready exits', async () => {
    const body = {
      name: 'Test org pets',
      email: 'test@test.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    }

    await request(app.server).post('/orgs').send(body)

    const res = await request(app.server).post('/orgs').send({
      name: 'Test org pets',
      email: 'node@node.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    })

    expect(res.statusCode).toEqual(409)
    // expect(res.body.message).toEqual(
    //   'Organization name or email already exists.',
    // )
  })

  it('Should not be able to register email aready exits', async () => {
    const body = {
      name: 'Test org pets',
      email: 'test@test.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    }

    await request(app.server).post('/orgs').send(body)

    const res = await request(app.server).post('/orgs').send({
      name: 'Test org pets1',
      email: 'test@test.com',
      password: '123456789',
      zip_code: '0123456',
      address: 'Rua do Teste n010101',
      state: 'Testelandia',
      city: 'teste',
      phone: '11998877445566',
    })
    console.log(res)

    expect(res.statusCode).toEqual(409)
    // expect(res.body.message).toEqual(
    //   'Organization name or email already exists.',
    // )
  })
})
