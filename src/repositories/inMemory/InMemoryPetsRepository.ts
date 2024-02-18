import { Pet } from '@prisma/client'
import { IPetsRepository } from '../IPetsRepository'
import { randomUUID } from 'node:crypto'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'

export class InMemoryPetsRepository implements IPetsRepository {
  public db: Pet[] = []

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
    const pet: Pet = {
      id: randomUUID(),
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
      created_at: new Date(),
    }

    this.db.push(pet)

    return pet
  }
}
