import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUsers(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Dougrilhos Sucrilhos',
      password: await hash('987654321', 6),
    },
  })

  const authResponseUser = await request(app.server).post('/sessions').send({
    email: 'teste@teste.com',
    password: '987654321',
  })

  const { token } = authResponseUser.body

  return {
    token,
  }
}
