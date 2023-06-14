import { Match } from './Match'
import { Participant } from './Participant'
import { WeightClass } from './WeightClass'

export interface WeightList {
  weightClass: WeightClass
  participants: Participant[]
  type: string
  matches: Match[]
}
