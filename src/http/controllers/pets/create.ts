/* eslint-disable no-useless-catch */
import { makeCreatePetUseCase } from '@/useCases/factories/makeCreatePetUseCase'
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

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    old: z.nativeEnum(Old),
    size: z.nativeEnum(Size),
    energyLevel: z.nativeEnum(EnergyLevel),
    independenceLevel: z.nativeEnum(IndependenceLevel),
    environment: z.nativeEnum(Environment),
    gender: z.nativeEnum(Gender),
    state: z.string(),
    city: z.string(),
    requiredNeeds: z.string().array(),
    petImage: z.string(),
  })

  const body = registerBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({ ...body, orgId: request.user.sub })
  } catch (error) {
    throw error
  }
  reply.status(201).send()
}
