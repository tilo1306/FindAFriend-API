import { makeFilterPetUseCase } from '@/useCases/factories/makeFilterPetUseCase'
import {
  EnergyLevel,
  Environment,
  Gender,
  IndependenceLevel,
  Old,
  Size,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function filterPet(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    old: z.nativeEnum(Old).optional(),
    size: z.nativeEnum(Size).optional(),
    energyLevel: z.nativeEnum(EnergyLevel).optional(),
    independenceLevel: z.nativeEnum(IndependenceLevel).optional(),
    environment: z.nativeEnum(Environment).optional(),
    gender: z.nativeEnum(Gender).optional(),
    state: z.string().optional(),
    city: z.string(),
    requiredNeeds: z.string().array().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const token = request.user

  if (!token) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const query = filterPetsQuerySchema.parse(request.query)

  const filterPetsUseCase = makeFilterPetUseCase()

  const result = await filterPetsUseCase.execute(query)

  reply.status(200).send(result)
}
