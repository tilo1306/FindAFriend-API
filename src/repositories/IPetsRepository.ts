import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { Pet } from '@prisma/client'

export interface IPetsRepository {
  create(data: ICreatePetDTO): Promise<Pet>
}
