import {
  EnergyLevel,
  Environment,
  Gender,
  IndependenceLevel,
  Old,
  Size,
} from '@prisma/client'

export interface ICreatePetDTO {
  name: string
  description: string
  old: Old
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  gender: Gender
  state: string
  city: string
  requiredNeeds: string[]
  orgId: string
  petImage: string
}
