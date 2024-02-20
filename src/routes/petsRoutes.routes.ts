import { create } from '@/http/controllers/pets/create'
import { verifyJWT } from '@/http/middlewares/verifyJwt'
import { FastifyInstance } from 'fastify'

export async function petsRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post(
    '/pets',
    {
      schema: {
        summary: 'Create a pet',
        description: 'Create a new pet',
        tags: ['Pets'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            old: { type: 'string' },
            energyLevel: { type: 'string' },
            independenceLevel: { type: 'string' },
            environment: { type: 'string' },
            gender: { type: 'string' },
            state: { type: 'string' },
            city: { type: 'string' },
            requiredNeeds: { type: 'array', items: { type: 'string' } },
            petImage: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
          },
          401: {
            description: 'Succesful response',
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
