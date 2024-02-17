import { InMemoryOrgsRepository } from '@/repositories/inMemory/InMemoryOrgsRepository'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './Authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'

let orgRepository: InMemoryOrgsRepository
let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository, orgRepository)

    orgRepository.create({
      name: 'Teste ong',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    })

    userRepository.create({
      email: 'user@user.com',
      name: 'Dougrilhos Sucrilhos',
      password: await hash('987654321', 6),
    })
  })

  it('should be able authenticate user', async () => {
    const { name, role, id } = await sut.execute({
      email: 'user@user.com',
      password: '987654321',
    })

    expect(id).toEqual(expect.any(String))
    expect(name).toEqual('Dougrilhos Sucrilhos')
    expect(role).toEqual('MEMBER')
  })

  it('should be able authenticate org', async () => {
    const { name, role, id } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
    expect(name).toEqual('Teste ong')
    expect(role).toEqual('ORG')
  })

  it('should not be able to authenticate user with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'erro@user.com',
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate user with wrong password', async () => {
    expect(() =>
      sut.execute({
        email: 'user@user.com',
        password: '9876543',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate Org with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'erro@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate Org with wrong password', async () => {
    expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '9876543',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
