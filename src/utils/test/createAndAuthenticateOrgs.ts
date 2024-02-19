import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'teste@teste.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
