import { Pet } from '@prisma/client'
import { IPetsRepository } from '../IPetsRepository'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create({
    city,
    description,
    energyLevel,
    environment,
    gender,
    independenceLevel,
    name,
    old,
    orgId,
    requiredNeeds,
    size,
    state,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        city,
        description,
        energy_level: energyLevel,
        environment,
        gender,
        independence_level: independenceLevel,
        name,
        old,
        ong_id: orgId,
        requiredNeeds,
        size,
        state,
      },
    })
    return pet
  }
}
