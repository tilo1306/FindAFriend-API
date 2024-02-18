import { ICreatePetImagensDTO } from '@/dtos/ICreatePetImagensDTO'
import { IPetImagensRepository } from '../IPetImagensRepository'
import { PetImages } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPetImagensRepository implements IPetImagensRepository {
  async create({ petId, urlImage }: ICreatePetImagensDTO): Promise<PetImages> {
    const petImagem = await prisma.petImages.create({
      data: {
        url: urlImage,
        pet_id: petId,
      },
    })
    return petImagem
  }
}
