<script lang="ts">

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
    matchOrder: {default: []},
    edit: {default: false},
    title: {default: ''}
  },
  data(){return{editName: '', editVerein: ''}},
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
  <table class="pool">
    <thead><tr><td colspan="2">{{ title }}</td>
      <td v-for="fs in pSize" :key="'k' + fs">{{fs}}</td>
      <td>Punkte</td><td>Platz</td>
    </tr></thead>
    <tbody>
      <tr v-for="(p, idx) in participants" :key="'partiwl' + idx">
        <td class="name">{{ p.name }} <span v-show="p.verein">({{ p.verein }})</span></td>
        <td style="width: 1em;">{{ idx +1 }}</td>
        <td v-for="fs in pSize" :key="idx + '-' + fs" class="match" :class="{'hit': (1+ idx === fs)}">
          <i>{{ getCellNumber(idx, fs-1) }}</i></td>
        <td class="score"></td><td class="score"></td>
      </tr>
      <tr v-if="edit">
        <td><input v-model="editName" type="text" placeholder="Name" />
          <input v-model="editVerein" type="text" placeholder="Verein" /></td>
          <td><button @click="emitNewP" style="padding: 0 0.4rem;" class="material-icons">add</button></td>
        <td :colspan="pSize+2"></td></tr>
    </tbody>
  </table>
  <div v-if="showMatches">
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