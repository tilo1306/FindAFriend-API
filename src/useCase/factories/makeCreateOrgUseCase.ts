import { PrismaOrgsRepository } from '@/repositories/prisma/prismaOrgsRepository'
import { CreateOrgUseCase } from '../createOrg/CreateOrg'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new CreateOrgUseCase(orgsRepository)

  return useCase
}
