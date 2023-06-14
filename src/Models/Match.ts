import { Participant } from './Participant'
import { WeightClass } from './WeightClass'

export interface Match {
  nr: string
  done: boolean
  doneTimestamp: number
  pWhite: Participant
  pBlue: Participant
  weightClass?: WeightClass
}
