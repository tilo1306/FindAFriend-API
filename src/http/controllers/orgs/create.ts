import { OrgAlreadyExistsError } from '@/useCases/errors/orgAlreadyExistsError'
import { makeCreateOrgUseCase } from '@/useCases/factories/makeCreateOrgUseCase'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    zip_code: z.string(),
    address: z.string(),
    state: z.string(),
    city: z.string(),
    phone: z.string(),
  })

  const body = registerBodySchema.parse(request.body)

  try {
    const registeOrgUseCase = makeCreateOrgUseCase()
    await registeOrgUseCase.execute(body)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
  reply.status(201).send()
}
