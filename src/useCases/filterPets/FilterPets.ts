import { Pet } from '@prisma/client'
import { IFilterPetsDTO } from '@/dtos/IFilterPetsDTO'
import { IPetImagensRepository } from '@/repositories/IPetImagensRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'

interface IData extends Pet {
  imagens: string[]
}

interface IResponsePetUseCase {
  data: IData[]
  page: number
}

export class FilterPetsUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private petImagensRepository: IPetImagensRepository,
  ) {}

  async execute(data: IFilterPetsDTO): Promise<IResponsePetUseCase> {
    const filterPets = await this.petsRepository.petsFilter(data)

    if (filterPets.length > 0) {
      const listPets = await Promise.all(
        filterPets.map(async (pet) => {
          const listPetImagens = await this.petImagensRepository.findPetImage(
            pet.id,
          )

          const listUrlImagens = listPetImagens.map((imagem) => imagem.url)

          return {
            ...pet,
            imagens: listUrlImagens,
          }
        }),
      )

      return {
        data: listPets,
        page: data.page,
      }
    }
    return { data: [], page: 1 }
  }
}
