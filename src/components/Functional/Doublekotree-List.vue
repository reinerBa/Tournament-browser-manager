<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Participant } from '../../Models/Participant'
export class MatchTree {
  idx: number
  level: number
  waitPos: number = -1
  p: Participant | null
  constructor(idx: number, level: number, p: Participant| null){
    this.idx = idx, this.level = level, this.p = p
  }
}

export default defineComponent({
  props: {
    participants:{
  //      required: true,
      default: [
        {name: 'hans', verein: 'ko', ageClass: 'U11'},
        {name: 'ji', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim2', verein: 'ko', ageClass: 'U11'},
        {name: 'jim3', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
/*          {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
 /*       {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},        
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'Ann', verein: 'ko', ageClass: 'U11'},
        {name: 'Anni', verein: 'ko', ageClass: 'U11'},*/
        {name: 'Anne', verein: 'ko', ageClass: 'U11'}
      ] as Participant[],
      type: Object as PropType<Participant[]>,
    },
    matchOrder: {default: [] as Participant[], type: Object as PropType<Participant[]>}
  },
  data(){return{
    //matchesDone: []
  }},
  computed: {
    pSize(): number { return this.participants.length},
    columns(): number {
      let size = 1
      while(Math.pow(2, size) < this.participants.length) size++
      return size
    },
    rows(): number {
      return 2**this.columns
    },
    participantMatchOrder(): Participant[] {
      if(this.matchOrder.length) return this.matchOrder
      const pArr = [...this.participants]
      let idx = 0

      let ma = new Array(this.rows)
      for(let i = 0; i < ma.length; i+=2)
        ma[i] = pArr.pop()

      while(pArr.length){
        let idx = Math.floor(Math.random() * ma.length)
        if(!ma[idx]) ma[idx] = pArr.pop()
      }
      return ma
    },    
    matchesTree(): MatchTree[][] {

      const a: MatchTree[][] = []
      a[0]= [] as MatchTree[]
      for(let i =0; i < this.participantMatchOrder.length; i++)
        a[0][i] = new MatchTree(i, 0, this.participantMatchOrder[i])

      for(let i = 1; i<= Math.log2(2**this.columns); i++) {
        a[i] = [] as MatchTree[]
        for(let j=0; j < 2**(Math.log2(2**this.columns)-(i)); j++)
          a[i].push(new MatchTree(j * 2**i, i, null))
      }

      a[1].forEach((val, idx) => val.p = !a[0][idx*2+1].p ? a[0][idx*2].p : val.p)
      let next = 1
      a.forEach((valLevel, idxLevel) => valLevel.forEach((val, idx) => {if(!val.p && val.level) val.waitPos = next++}))
      return a
    },
  },
  methods:{
    getParticipants(m: string): string {
      const counterparties = m.split(':').map((pNumber: string) => this.participants[Number.parseInt(pNumber)].name)
      return `${counterparties[0]} vs. ${counterparties[1]}`
    },
    getParticipant(nr: string): string {
      return this.participants[Number.parseInt(nr)].name
    },
    getMatchNumber(idx: number, level: number) {
      let match = this.matchesTree[level][idx / 2**level]
      if(match?.p) return 0
      return match?.waitPos
    },
    getWinner(idx: number, level: number) {
      let match = this.matchesTree[level][idx / 2**level]
      if(match?.p) return match.p.name
      return ''
    },
    getParticipantFromMatch(idx: number): Participant | null {
      return this.matchesTree[0][idx]?.p
    },
    hasBottomBorder(idx: number, secoundIdx:number): boolean { 
      return idx%(2**secoundIdx)===0
    },
    hasRightBorder(idx: number, secoundIdx: number): boolean {
      if (this.rows === 2**(secoundIdx)) 
        return false
      if ((idx / (2**secoundIdx))%2 === 1) 
        return true
      if (((idx + 2**(secoundIdx-1) )/ (2**secoundIdx)) %2 ===1) 
        return true
      return false
    },
    getRound(idx: number) {
      if(idx === this.columns) return 'Finale'
      else if (idx === this.columns-1) return 'Halbfinale'
      return `Runde ${idx}`
    }
  }
})
</script>

<template>
  <table class="liste">
    <thead ><tr><td colspan="2" style="border: 0;"></td>
      <td v-for="fs in columns" :key="'k' + fs">{{getRound(fs)}}</td>
    </tr></thead>
    <tbody>
      <template v-for="(_, idx) in 2**columns" :key="'kowl' + idx">
        <tr >
          <td class="border-top" style="width: 1em;">{{ idx +1 }}</td>
          <td class="name border-right" :class="{'border-top': idx%2===0, 'dark-bg': !getParticipantFromMatch(idx)}">
            {{ getParticipantFromMatch(idx)?.name }} <span v-if="getParticipantFromMatch(idx)?.verein">({{getParticipantFromMatch(idx)?.verein }})</span>
          </td>
          
          <template v-for="(__, idx1) in columns" :key="`${__}-${idx}`" >
            <td v-if="rows >= 2**idx1 &&  idx % 2**idx1===0" 
              :rowspan="2**idx1 * 1.5" class="td-spacer" :data-order="`${idx}-${idx1}`"
              :class="{'td-match': hasBottomBorder(idx, __), 'border-right': hasRightBorder(idx, __)}"
              ><div v-if="getMatchNumber(idx, idx1+1)" class="matchNum">{{ getMatchNumber(idx, idx1+1) }}</div>{{getWinner(idx, idx1+1)}}
            </td>
          </template>
        </tr>
        <tr v-if="(1+idx)%2==0"><td class="td-spacer" colspan="3" :class="{'border-right': hasRightBorder(idx, 1)}"></td></tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="stylus" scoped>
.liste
  max-width 70vw
.dark-bg
  background repeating-linear-gradient(45deg, lightgrey, lightgrey 1px, white 1px, white 7px)
td.small
  max-width 1em
.td-spacer
  border-bottom none
  color transparent
.border-right
  border-right 0.1rem solid #e1e1e1
.td-match
  border-bottom 0.1rem solid #e1e1e1
  vertical-align bottom
  color black
  position relative
  min-width 4em
.matchNum
  position absolute
  left 0
  bottom 0
  background-color #b3b3b3
  color white
  font-size large
  padding 0 0.5rem
  border-left 0
  border-bottom 0  
.border-top
  border-top 0.1rem solid #e1e1e1
</style>