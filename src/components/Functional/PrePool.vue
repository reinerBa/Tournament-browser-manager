<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Participant } from '../../Models/Participant'
import DoublekotreeList from './Doublekotree-List.vue'
import EoneListe from './EoneListe.vue'
export default defineComponent({
  components: { EoneListe, DoublekotreeList },
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
    matchOrder: {default: []},
    edit: {default: false}
  },
  data(){return{editName: '', editVerein: '', declaration: [{name: 'A1', verein: ''}, {name: 'B2', verein: ''} , {name: 'B1', verein: ''} , {name: 'A2', verein:''}]}},
  computed: {
    pSize(): number { return this.participants.length},
    matches() {
      if(this.matchOrder.length) return this.matchOrder

      let m: string[] = []
      for(let i = 0; i < this.pSize; i++)
        for(let j = 0+1; j < this.pSize; j++){
          let newVal = i < j ? `${i}:${j}` : `${j}:${i}`
          if (!m.includes(newVal) && i !== j) m.push(newVal)
        }
      
      for(let i = 1; i < m.length; i++)
        if (m[i-1].split(':').findIndex(v => m[i].includes(v)) !== -1) {
          let lastIdx = m.map(el => el.split(':').findIndex(v => m[i-1].includes(v)) === -1).indexOf(true, i+1)
          m.splice(i, 0, ...m.splice(lastIdx, 1))
        }
      if (this.pSize === 5) m.splice(0, 0, ...m.splice(-1, 1))

      return m
    },
    participantsA (): Participant[] {
      return this.participants.filter((el, idx, arr) => idx < arr.length/2)
    },
    participantsB (): Participant[] {
      return this.participants.filter((el, idx, arr) => idx >= arr.length/2)
    }
  },
  methods:{
    getCellNumber(i: number, j: number): number { return this.matches.findIndex(el => (i < j ? `${i}:${j}` : `${j}:${i}`) === el)+1},
    getParticipants(m: string): string {
      const counterparties = m.split(':').map((pNumber: string) => this.participants[Number.parseInt(pNumber)].name)
      return `${counterparties[0]} vs. ${counterparties[1]}`
    },
    getParticipant(nr: string): string {
      return this.participants[Number.parseInt(nr)].name
    },
    emitNewP() {
      this.$emit('new', {'name': this.editName, 'verein': this.editVerein})
      this.editName = this.editVerein = ''
    }
  }
})
</script>

<template>
  <div class="flex">
    <eone-liste :participants="participantsA" title="Pool A" :show-matches="false"/>
    <eone-liste :participants="participantsB" title="Pool B" :showMatches="false"/>
  </div>
  <doublekotree-list :participants="declaration" :match-order="declaration"/>
  <div>

</div>
  <div v-if="false">
    <div></div>
    <table style="width: fit-content;">
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
.flex
  display flex
  justify-content space-between
table.pool
  max-width 47%
  width 47%
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