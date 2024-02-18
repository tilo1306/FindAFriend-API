import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { CreateUserUseCase } from '../createUser/CreateUser'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
