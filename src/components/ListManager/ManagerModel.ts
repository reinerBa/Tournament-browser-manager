import { Participant } from '../../Models/Participant'

export interface IListManagerData {
  listName: String
  listMeta: String
  participants: Participant[]
}
