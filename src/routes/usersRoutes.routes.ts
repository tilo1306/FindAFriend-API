import { create } from '@/http/controllers/users/create'
import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Create a user',
        description: 'Create a new user',
        tags: ['Users'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
          },
          409: {
            description: 'User email already exists.',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    create,
  )
}
