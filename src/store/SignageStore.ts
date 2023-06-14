import { defineStore } from 'pinia'
import { Match } from '../Models/Match'
import { Participant } from '../Models/Participant'
import { WeightClass } from '../Models/WeightClass'
import { WeightList } from '../Models/WeightList'

export const useSignageStore = defineStore('signage', {
  state: () => ({
    Participants: [] as Participant[],
    Matches: [] as Match[],
    Matte: 0,
    turnamentName: '',
    weightClasses: [] as WeightClass[],
    weightLists: [] as WeightList[]
  }),
  actions: {
    addMatch (match: Match) {
      const num = this.Matches.push(match)
      match.nr = num
    },
    addParticipant (p: Participant) {
      this.Participants.push(p)
    },
    addWeightClasses (list: WeightClass[]) {
      console.dir(list)
      this.weightClasses.push(...list)
    },
    addWeightList (list: WeightList) {
      this.weightLists.push(list)
    },
    setTurnamentName (s: string) {
      this.turnamentName = s
    }
  },
  getters: {
    associations (state): string[] {
      const a = this.Participants.map(p => p.verein)
      return Array.from(new Set(a))
    },
    openMatches (state): Match[] {
      return state.Matches.filter((m: Match) => !m.done)
    },
    nextFight (state): Match | null {
      const activeMatches: Match[] = state.Matches.filter(m => !m.done)
      const len = activeMatches.length
      if (len === 0) return null
      return activeMatches.reverse()[len - 1]
    },
    overnextFight (state): Match | null {
      const activeMatches: Match[] = state.Matches.filter(m => !m.done)
      const len = activeMatches.length
      if (len < 2) return null
      return activeMatches.reverse()[len - 2]
    },
    ageNames (state): string[] {
      const wArr = state.weightClasses.map(w => w.ageName)
      return Array.from(new Set(wArr))
    }
  },
  persist: { paths: ['Participants', 'Matches', 'Matte', 'weightClasses', 'associations', 'weightLists'] }
})
