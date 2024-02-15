import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/orgAlreadyExistsError'

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
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute(
    data: ICreateOrgUseCaseRequest,
  ): Promise<ICreateOrgUseCaseResponse> {
    const orgWithSameName = await this.orgsRepository.findByName(data.name)

    if (orgWithSameName) {
      throw new OrgAlreadyExistsError()
    }
    const passwordHash = await hash(data.password, 6)

    data.password = passwordHash

    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
