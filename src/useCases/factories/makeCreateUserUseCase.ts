import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { CreateUserUseCase } from '../createUser/CreateUser'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
