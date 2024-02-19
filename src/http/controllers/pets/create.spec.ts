import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateOrgs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register Pet', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const res = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        city: 'Caracas City',
        description: 'Lindo dog com cara de dog',
        energyLevel: 'HIGH',
        environment: 'OPEN',
        gender: 'Macho',
        independenceLevel: 'HIGH',
        name: 'Dogão e mal',
        old: 'SENIOR',
        petImage: 'www.google.com.br',
        requiredNeeds: ['sei la'],
        size: 'AVERAGE',
        state: 'São Paulo',
      })

    expect(res.statusCode).toEqual(201)
  })
})
