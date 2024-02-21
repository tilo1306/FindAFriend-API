import { InMemoryPetImagensRepository } from '@/repositories/inMemory/InMemoryPetImagensRepository'
import { InMemoryPetsRepository } from '@/repositories/inMemory/InMemoryPetsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsUseCase } from './FilterPets'
import { CreatePetUseCase } from '../createPet/CreatePet'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'

let petsRepository: InMemoryPetsRepository
let petImagensRepository: InMemoryPetImagensRepository
let sut: FilterPetsUseCase

let createPetUseCase: CreatePetUseCase

describe('Filter pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petImagensRepository = new InMemoryPetImagensRepository()

    sut = new FilterPetsUseCase(petsRepository, petImagensRepository)

    createPetUseCase = new CreatePetUseCase(
      petsRepository,
      petImagensRepository,
    )
  })

  it('should be able find pet for city', async () => {
    const dataCreatePet1: ICreatePetDTO = {
      description: 'Lindo dog com cara de dog',
      city: 'Caracas City',
      energyLevel: 'HIGH',
      environment: 'OPEN',
      gender: 'Macho',
      independenceLevel: 'HIGH',
      name: 'Dogão e mal',
      old: 'SENIOR',
      orgId: '1',
      petImage: 'www.google.com.br',
      requiredNeeds: ['sei la'],
      size: 'AVERAGE',
      state: 'São Paulo',
    }

    const dataCreatePet2: ICreatePetDTO = {
      description: 'Lindo dog com cara de dog',
      city: 'Osasco',
      energyLevel: 'HIGH',
      environment: 'OPEN',
      gender: 'Macho',
      independenceLevel: 'HIGH',
      name: 'Dogão e mal',
      old: 'SENIOR',
      orgId: '1',
      petImage: 'www.google.com.br',
      requiredNeeds: ['sei la'],
      size: 'AVERAGE',
      state: 'São Paulo',
    }

    await createPetUseCase.execute(dataCreatePet1)

    await createPetUseCase.execute(dataCreatePet2)

    const { data, page } = await sut.execute({
      city: dataCreatePet1.city,
      page: 1,
    })

    expect(data[0].city).toEqual(dataCreatePet1.city)
    expect(page).toEqual(1)
    expect(data.length).toEqual(1)
  })

  it('should not be able find pet for city', async () => {
    const { data, page } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(page).toEqual(1)
    expect(data.length).toEqual(0)
  })
})
