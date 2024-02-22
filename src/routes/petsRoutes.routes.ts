import { create } from '@/http/controllers/pets/create'
import { filterPet } from '@/http/controllers/pets/filterPet'
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
            size: { type: 'string' },
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
            description: 'Unauthorized response',
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
  app.get(
    '/pets/search',
    {
      schema: {
        summary: 'Filter pets ',
        description: 'Filter pets',
        tags: ['Pets'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        querystring: {
          type: 'object',
          required: ['city'],
          properties: {
            city: {
              type: 'string',
              description: 'Value to filter by city',
            },
            page: {
              description: 'Value page for pagination',
              type: 'number',
            },
            old: {
              description: 'Value old pet',
              type: 'string',
              enum: ['PUPPY', 'ADULT', 'SENIOR'],
            },
            size: {
              description: 'Value size pet',
              type: 'string',
              enum: ['SMALL', 'AVERAGE', 'BIG'],
            },
            energyLevel: {
              description: 'Value energy level pet',
              type: 'string',
              enum: ['LOW', 'AVERAGE', 'HIGH'],
            },
            independenceLevel: {
              description: 'Value independence level pet',
              type: 'string',
              enum: ['LOW', 'AVERAGE', 'HIGH'],
            },
            environment: {
              description: 'Value environment pet',
              type: 'string',
              enum: ['OPEN', 'environment'],
            },
            gender: {
              description: 'Value gender pet',
              type: 'string',
              enum: ['Femea', 'Macho'],
            },
            state: {
              description: 'Value state org',
              type: 'string',
              enum: ['Femea', 'Macho'],
            },
            requiredNeeds: {
              description: 'Value required needs Pet',
              type: 'string',
            },
          },
        },
        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    energy_level: { type: 'string' },
                    independence_level: { type: 'string' },
                    environment: { type: 'string' },
                    gender: { type: 'string' },
                    state: { type: 'string' },
                    city: { type: 'string' },
                    requiredNeeds: { type: 'string' },
                    created_at: { type: 'string' },
                    ong_id: { type: 'string' },
                    imagens: {
                      type: 'array',
                    },
                  },
                },
              },
              page: {
                type: 'number',
              },
            },
          },
          401: {
            description: 'Unauthorized response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    filterPet,
  )
}
