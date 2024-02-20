import { ICreatePetImagensDTO } from '@/dtos/ICreatePetImagensDTO'
import { IPetImagensRepository } from '../IPetImagensRepository'
import { PetImages } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetImagensRepository implements IPetImagensRepository {
  public db: PetImages[] = []
  async create({ petId, urlImage }: ICreatePetImagensDTO): Promise<PetImages> {
    const petImagens: PetImages = {
      id: randomUUID(),
      url: urlImage,
      pet_id: petId,
    }

    this.db.push(petImagens)

    return petImagens
  }

  async findPetImage(petId: string): Promise<PetImages[]> {
    const petImagens: PetImages[] = this.db.filter(
      (petImage) => petImage.pet_id === petId,
    )

    return petImagens
  }
}
