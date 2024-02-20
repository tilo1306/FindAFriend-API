import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { IFilterPetsDTO } from '@/dtos/IFilterPetsDTO'
import { Pet } from '@prisma/client'

export interface IPetsRepository {
  create(data: ICreatePetDTO): Promise<Pet>
  petsFilter(data: IFilterPetsDTO): Promise<Pet[]>
}
