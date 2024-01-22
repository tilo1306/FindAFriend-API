import { Organization, Prisma } from '@prisma/client'
import { IOrgRepository } from '../IOrgRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements IOrgRepository {
  public db: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const ong: Organization = {
      id: randomUUID(),
      name: 'Teste ong',
      create_at: new Date(),
      role: 'ADMIN',
      email: 'teste@teste.com',
      password: '123456',
      zip_code: '123456',
      address: 'Rua: teste',
      state: 'teste',
      city: 'Testando',
      phone: '(11) 999999999',
    }
    this.db.push(ong as unknown as Organization)

    return ong
  }
}
