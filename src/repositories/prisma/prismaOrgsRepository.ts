import { Prisma, Organization } from '@prisma/client'
import { IOrgsRepository } from '../IOrgsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org = await prisma.organization.create({ data })

    return org
  }

  async findByName(name: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: {
        name,
      },
    })
    return org
  }
}
