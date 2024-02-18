import { ICreatePetDTO } from '@/dtos/ICreatePetDTO'
import { IPetImagensRepository } from '@/repositories/IPetImagensRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private petImagensRepository: IPetImagensRepository,
  ) {}

  async execute(data: ICreatePetDTO) {
    const pet = await this.petsRepository.create(data)
    await this.petImagensRepository.create({
      petId: pet.id,
      urlImage: data.petImage,
    })

    return pet
  }
}
