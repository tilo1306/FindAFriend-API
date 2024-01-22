import { Organization, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../IOrgsRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public db: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org: Organization = {
      id: randomUUID(),
      ...data,
      create_at: new Date(),
      role: 'ADMIN',
    }
    this.db.push(org as unknown as Organization)

    return org
  }

  async findByName(name: string): Promise<Organization | null> {
    const isOrg = this.db.find((org) => org.name === name)
    if (!isOrg) {
      return null
    }
    return isOrg
  }
}
