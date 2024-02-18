import { create } from '@/http/controllers/orgs/create'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {
  app.post(
    '/orgs',
    {
      schema: {
        summary: 'Create a Orgs',
        description: 'Create a new Orgs',
        tags: ['Orgs'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            zip_code: { type: 'string' },
            address: { type: 'string' },
            state: { type: 'string' },
            city: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
          },
          409: {
            description: 'Organization name or email already exists.',
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
