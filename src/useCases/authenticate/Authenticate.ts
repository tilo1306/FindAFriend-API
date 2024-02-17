import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { IUsersRepository } from '@/repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'

interface IAuthenticateUseCase {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute({ email, password }: IAuthenticateUseCase) {
    const isUser = await this.usersRepository.findByEmail(email)

    if (isUser) {
      const doesPasswordMatches = await compare(password, isUser.password)

      if (!doesPasswordMatches) {
        throw new InvalidCredentialsError()
      }

      return isUser
    }

    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return org
  }
}
