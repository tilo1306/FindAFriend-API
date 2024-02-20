import { create } from '@/http/controllers/users/create'
import { refresh } from '@/http/controllers/users/refresh'
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

  app.patch(
    '/token/refresh',
    {
      schema: {
        summary: 'Refresh Token',
        description: 'Refresh Token',
        tags: ['Token'],

        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    refresh,
  )
}
