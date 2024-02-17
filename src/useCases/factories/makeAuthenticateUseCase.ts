import { PrismaOrgsRepository } from '@/repositories/prisma/prismaOrgsRepository'
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { AuthenticateUseCase } from '../authenticate/Authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new AuthenticateUseCase(usersRepository, orgsRepository)

  return useCase
}
