import { IUsersRepository } from '@/repositories/IUsersRepository'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'
import { hash } from 'bcryptjs'

interface ICreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: ICreateUserUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    password = passwordHash

    const user = await this.usersRepository.create({ email, name, password })

    return user
  }
}
