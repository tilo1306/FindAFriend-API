import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { CreateUserUseCase } from './CreateUser'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create User', async () => {
    const data = {
      email: 'user@user.com',
      name: 'Dougrilhos Sucrilhos',
      password: '987654321',
    }

    const { id, email, role, name } = await sut.execute(data)

    expect(id).toEqual(expect.any(String))
    expect(email).toEqual(data.email)
    expect(name).toEqual(data.name)
    expect(role).toEqual('MEMBER')
  })

  it('should not be able to create User with wrong email', async () => {
    const data = {
      email: 'user@user.com',
      name: 'Dougrilhos Sucrilhos',
      password: '987654321',
    }

    await sut.execute(data)

    expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
