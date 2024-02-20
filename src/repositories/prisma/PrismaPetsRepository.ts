import { Pet } from '@prisma/client'
import { IPetsRepository } from '../IPetsRepository'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { prisma } from '@/lib/prisma'
import { IFilterPetsDTO } from '@/dtos/IFilterPetsDTO'

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

  async petsFilter({
    city,
    energyLevel,
    environment,
    gender,
    independenceLevel,
    old,
    requiredNeeds,
    size,
    state,
    page,
  }: IFilterPetsDTO): Promise<Pet[]> {
    const pets: Pet[] = await prisma.pet.findMany({
      where: {
        city,
        energy_level: energyLevel ? { equals: energyLevel } : undefined,
        environment: environment ? { equals: environment } : undefined,
        gender: gender ? { equals: gender } : undefined,
        independence_level: independenceLevel
          ? { equals: independenceLevel }
          : undefined,
        old: old ? { equals: old } : undefined,
        requiredNeeds: requiredNeeds ? { equals: requiredNeeds } : undefined,
        size: size ? { equals: size } : undefined,
        state: state ? { equals: state } : undefined,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
