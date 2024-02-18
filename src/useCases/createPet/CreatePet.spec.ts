/* eslint-disable camelcase */
import { InMemoryPetImagensRepository } from '@/repositories/inMemory/InMemoryPetImagensRepository'
import { InMemoryPetsRepository } from '@/repositories/inMemory/InMemoryPetsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './CreatePet'
import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/InMemoryOrgsRepository'
import { CreateOrgUseCase } from '../createOrg/CreateOrg'

let petsRepository: InMemoryPetsRepository
let petImagensRepository: InMemoryPetImagensRepository
let sut: CreatePetUseCase

let orgRepository: InMemoryOrgsRepository
let orgUseCase: CreateOrgUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()

    petImagensRepository = new InMemoryPetImagensRepository()

    sut = new CreatePetUseCase(petsRepository, petImagensRepository)

    orgRepository = new InMemoryOrgsRepository()

    orgUseCase = new CreateOrgUseCase(orgRepository)
  })

  it('should be able to create Pet', async () => {
    const { org } = await orgUseCase.execute({
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: '123456',
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    })

    const data: ICreatePetDTO = {
      city: 'Caracas City',
      description: 'Lindo dog com cara de dog',
      energyLevel: 'HIGH',
      environment: 'OPEN',
      gender: 'Macho',
      independenceLevel: 'HIGH',
      name: 'Dogão e mal',
      old: 'SENIOR',
      orgId: org.id,
      petImage: 'www.google.com.br',
      requiredNeeds: ['sei la'],
      size: 'AVERAGE',
      state: 'São Paulo',
    }

    const {
      id,
      city,
      description,
      energy_level,
      environment,
      gender,
      independence_level,
      name,
      old,
      ong_id,
      requiredNeeds,
      size,
      state,
    } = await sut.execute(data)

    expect(id).toEqual(expect.any(String))
    expect(city).toEqual(data.city)
    expect(description).toEqual(data.description)
    expect(energy_level).toEqual(data.energyLevel)
    expect(environment).toEqual(data.environment)
    expect(gender).toEqual(data.gender)
    expect(independence_level).toEqual(data.independenceLevel)
    expect(name).toEqual(data.name)
    expect(old).toEqual(data.old)
    expect(ong_id).toEqual(data.orgId)
    expect(requiredNeeds).toEqual(data.requiredNeeds)
    expect(size).toEqual(data.size)
    expect(state).toEqual(data.state)
  })
})
