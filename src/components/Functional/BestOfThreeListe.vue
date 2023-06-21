<script lang="ts">
export class ListMatch{
  matchIdx: number
  whiteNr: number
  blueNr: number
  winnerNr: number
  winnerName?: string
  whiteName?: string
  blueName?: string
  winnerScore: number
  constructor(whiteNr: number, blueNr: number, matchIdx: number){
    this.matchIdx = matchIdx ,this.whiteNr = whiteNr < blueNr? whiteNr: blueNr, this.blueNr= blueNr > whiteNr ? blueNr: whiteNr, this.winnerNr= -1, this.winnerScore= -1}
  get Indexes(){ return [this.whiteNr, this.blueNr] }
  isEqual(el: ListMatch): boolean { return el.whiteNr === this.whiteNr && el.blueNr === this.blueNr }
  doesOverlapp(el: ListMatch): boolean { return el.whiteNr === this.whiteNr || el.blueNr === this.blueNr || el.blueNr === this.whiteNr || el.whiteNr === this.blueNr }
}


import { defineComponent, PropType } from 'vue'
import { Participant } from '../../Models/Participant'
export default defineComponent({
  props: {
    participants:{
  //      required: true,
      default: [
        {name: 'hans', verein: 'ko', ageClass: 'U11'},
        {name: 'ji', verein: 'ko', ageClass: 'U11'},
        {name: 'jmmi lee jones Schnarrenberger', verein: 'ko', ageClass: 'U11'},
        {name: 'jim', verein: 'ko', ageClass: 'U11'},
        {name: 'Ann', verein: 'ko', ageClass: 'U11'}
      ] as Participant[],
      type: Object as PropType<Participant[]>,
    },
    showMatches: {default: true},
    matchOrder: {default: []}
  },
  data(){return{editName: '', editVerein: ''}},
  computed: {
    pSize(): number { return this.participants.length},
    matches() {
      if(this.matchOrder.length) return this.matchOrder

      let m: string[] = []
      new Array(3).fill(1).forEach(v => m.push(`${0}:${1}`))

      return m
    }
  },
  methods:{
    getCellNumber(i: number, j: number, round: number): number { return round + this.matches.findIndex(el => (i < j ? `${i}:${j}` : `${j}:${i}`) === el)+1},
    getParticipants(m: string): string {
      const counterparties = m.split(':').map((pNumber: string) => this.participants[Number.parseInt(pNumber)].name)
      return `${counterparties[0]} vs. ${counterparties[1]}`
    },
    getParticipant(nr: string): string {
      return this.participants[Number.parseInt(nr)].name
    }
  }
})
</script>

<template>
  <h5>Best-of-three-System</h5>
  <table class="pool">
    <thead><tr><td colspan="2"></td>
      <td colspan="2">1</td><td colspan="2">2</td><td colspan="2">Falls unentschieden</td>
      <td>Punkte</td><td>Platz</td>
    </tr></thead>
    <tbody>
      <tr v-for="(p, idx) in participants" :key="'partiwl' + idx">
        <td class="name">{{ p.name }} <span v-show="p.verein">({{ p.verein }})</span></td>
        <td style="width: 1em;">{{ idx +1 }}</td>
        <td v-for="fs in pSize" :key="idx + '-' + fs" class="match" :class="{'hit': (1+ idx === fs)}">
          <i>{{ getCellNumber(idx, fs-1, 0) }}</i></td>
          <td v-for="fs in pSize" :key="idx + '-' + fs" class="match" :class="{'hit': (1+ idx === fs)}">
          <i>{{ getCellNumber(idx, fs-1, 1) }}</i></td>
          <td v-for="fs in pSize" :key="idx + '-' + fs" class="match" :class="{'hit': (1+ idx === fs)}">
          <i>{{ getCellNumber(idx, fs-1, 2) }}</i></td>
        <td class="score"></td><td class="score"></td>
      </tr>
    </tbody>
  </table>
  <div v-if="showMatches">
    <div></div>
    <table>
      <tr v-for="(m, idx) in matches" :key="idx + 'fLi'" >
        <td class="small">{{ idx+1 }}.</td>
        <td>{{ getParticipant(m[0]) }}</td>
        <td class="small">vs</td>
        <td>{{ getParticipant(m[2]) }}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
h5
  margin-top 2rem
  margin-bottom 0
  margin-bottom 0.5rem
table.pool
  max-width 100%
  width fit-content
  border 0.1rem solid #e1e1e1
  thead td, td.score
    border-left 0.1rem solid #e1e1e1
  td.match
    border-left 0.1rem solid #e1e1e1
    font-weight bold
    color #5c5c5c50
  td.hit
    background-color grey
    color transparent
  td
    text-align center
  td:not(.name)
    width 4em
  td.name
    text-align right
  td:nth-last-of-type(2)
    border-left .25rem solid black
td.small
  max-width 1em
</style>