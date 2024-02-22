import { PrismaPetsRepository } from '@/repositories/prisma/PrismaPetsRepository'
import { FilterPetsUseCase } from '../filterPets/FilterPets'
import { PrismaPetImagensRepository } from '@/repositories/prisma/PrismaPetImagensRepository'

export function makeFilterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petImagensRepository = new PrismaPetImagensRepository()

  const useCase = new FilterPetsUseCase(petsRepository, petImagensRepository)

  return useCase
}
