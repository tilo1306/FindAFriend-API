import { Organization, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByName(name: string): Promise<Organization | null>
}
