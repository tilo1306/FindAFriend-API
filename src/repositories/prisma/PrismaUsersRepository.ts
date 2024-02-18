import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
