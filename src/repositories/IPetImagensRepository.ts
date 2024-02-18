import { ICreatePetImagensDTO } from '@/dtos/ICreatePetImagensDTO'
import { PetImages } from '@prisma/client'

export interface IPetImagensRepository {
  create(data: ICreatePetImagensDTO): Promise<PetImages>
}
