import { Organization, Prisma } from '@prisma/client'
import { IOrgRepository } from '../IOrgRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements IOrgRepository {
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
}
