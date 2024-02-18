import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { AuthenticateUseCase } from '../authenticate/Authenticate'
import { PrismaOrgsRepository } from '@/repositories/prisma/PrismaOrgsRepository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new AuthenticateUseCase(usersRepository, orgsRepository)

  return useCase
}
