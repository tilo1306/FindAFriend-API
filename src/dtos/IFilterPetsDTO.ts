import {
  EnergyLevel,
  Environment,
  Gender,
  IndependenceLevel,
  Old,
  Size,
} from '@prisma/client'
export interface IFilterPetsDTO {
  old?: Old
  size?: Size
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
  gender?: Gender
  state?: string
  city: string
  requiredNeeds?: string[]
  page: number
}
