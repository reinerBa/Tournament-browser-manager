import { Match } from './Match'
import { Scores } from './Scores'

export interface Fight {
  match: Match
  scoresWhite: Scores
  scoresBlue: Scores

  fightTime: number
  goldenScore: boolean
  osaikomi: boolean
  fightDone: boolean

}
