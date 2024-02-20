import { Pet } from '@prisma/client'
import { IPetsRepository } from '../IPetsRepository'
import { randomUUID } from 'node:crypto'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { IFilterPetsDTO } from '@/dtos/IFilterPetsDTO'

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
    const pets: Pet[] = this.db
      .filter(
        (pet) =>
          pet.city === city &&
          (!energyLevel || pet.energy_level === energyLevel) &&
          (!environment || pet.environment === environment) &&
          (!gender || pet.gender === gender) &&
          (!independenceLevel ||
            pet.independence_level === independenceLevel) &&
          (!old || pet.old === old) &&
          (!requiredNeeds || pet.requiredNeeds === requiredNeeds) &&
          (!size || pet.size === size) &&
          (!state || pet.state === state),
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
