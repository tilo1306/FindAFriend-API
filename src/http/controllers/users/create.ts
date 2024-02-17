import { UserAlreadyExistsError } from '@/useCases/errors/userAlreadyExistsError'
import { makeCreateUserUseCase } from '@/useCases/factories/makeCreateUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const body = registerBodySchema.parse(request.body)

  try {
    const registerUserUserCase = makeCreateUserUseCase()

    await registerUserUserCase.execute(body)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
  reply.status(201).send()
}
