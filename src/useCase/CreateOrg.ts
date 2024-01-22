import { IOrgRepository } from '@/repositories/IOrgRepository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute(data: Organization): Promise<Organization> {
    const passwordHash = await hash(data.password, 6)

    data.password = passwordHash

    const org = await this.orgsRepository.create(data)

    return org
  }
}
