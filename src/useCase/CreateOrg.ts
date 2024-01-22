import { IOrgRepository } from '@/repositories/IOrgRepository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface ICreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  zip_code: string
  address: string
  state: string
  city: string
  phone: string
}

interface ICreateOrgUseCaseResponse {
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute(
    data: ICreateOrgUseCaseRequest,
  ): Promise<ICreateOrgUseCaseResponse> {
    const passwordHash = await hash(data.password, 6)

    data.password = passwordHash

    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
