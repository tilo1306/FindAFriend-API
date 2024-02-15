import { CreateOrgUseCase } from './CreateOrg'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/InMemoryOrgsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from '../errors/orgAlreadyExistsError'

let orgRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create ORG Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should be able to create ORG', async () => {
    const data = {
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: '123456',
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    }

    const { org } = await sut.execute(data)

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual(data.name)
    expect(org.email).toEqual(data.email)
    expect(org.zip_code).toEqual(data.zip_code)
    expect(org.address).toEqual(data.address)
    expect(org.state).toEqual(data.state)
    expect(org.city).toEqual(data.city)
    expect(org.phone).toEqual(data.phone)
  })

  it('Should not be able to register ORG name already exists', async () => {
    const data = {
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: '123456',
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    }

    await sut.execute(data)

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('Should not be able to register ORG email already exists', async () => {
    const data = {
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: '123456',
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    }

    await sut.execute(data)

    await expect(() =>
      sut.execute({
        name: 'Teste ong1',
        email: 'teste@teste.com',
        password: '123456',
        zip_code: '123456',
        address: 'Rua: teste',
        state: 'teste',
        city: 'Testando',
        phone: '(11) 999999999',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
