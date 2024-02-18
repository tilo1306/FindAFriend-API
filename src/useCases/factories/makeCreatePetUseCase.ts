import { PrismaPetImagensRepository } from '@/repositories/prisma/PrismaPetImagensRepository'
import { PrismaPetsRepository } from '@/repositories/prisma/PrismaPetsRepository'
import { CreatePetUseCase } from '../createPet/CreatePet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const petImagensRepository = new PrismaPetImagensRepository()

  const useCase = new CreatePetUseCase(petsRepository, petImagensRepository)

  return useCase
}
