import { authenticate } from '@/http/controllers/login/authenticate'
import { FastifyInstance } from 'fastify'

export async function authenticateRoute(app: FastifyInstance) {
  app.post(
    '/sessions',
    {
      schema: {
        summary: 'Login user or orgs',
        description: 'Login user or orgs',
        tags: ['Login'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          400: {
            description: 'Erro login user or org.',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    authenticate,
  )
}
