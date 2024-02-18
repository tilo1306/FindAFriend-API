import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  public db: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
      role: 'MEMBER',
    }

    this.db.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
