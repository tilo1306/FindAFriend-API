import { Organization, Prisma } from '@prisma/client'

export interface IOrgRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
