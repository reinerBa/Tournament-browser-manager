<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Participant } from '../../Models/Participant'

export class ListMatchTree {
  level: number
  white: ListMatchTree | null
  blue: ListMatchTree | null
  winner: Participant | null | number
  constructor(level:number, white: ListMatchTree|null, blue: ListMatchTree|null, winner: Participant| number | null = null){
    this.white = white, this.blue = blue, this.winner = winner, this.level = level
  }
}

export default defineComponent({
  props: {
    node: { type: Object as PropType<ListMatchTree> },
    root: { type: Object as PropType<ListMatchTree> },
  },
  computed: {
  },
  methods:{
  }
})
</script>

<template>
  <div class="flex">
    <div>
      <match-tree v-if="node?.white" :node="node?.white"/>
      <match-tree v-if="node?.blue" :node="node?.blue"/>
    </div>
    <div class="winner">{{node?.winner ?? ''}}-{{ node?.level }}</div>
  </div>
<!--  <table class="pool">
    <thead><tr><td colspan="2"></td>
      <td v-for="fs in columns" :key="'k' + fs">Runde{{fs}}</td>
    </tr></thead>
    <tbody>
      <template v-for="(_, idx) in 2**columns" :key="'kowl' + idx">
        <tr >
          <td class="border-top" style="width: 1em;">{{ idx +1 }}</td>
          <td class="name border-right" :class="{'border-top': idx%2===0}">{{ getParticipantFromMatch(idx)?.name }} ({{getParticipantFromMatch(idx)?.verein }})</td>
          
          <template v-for="(__, idx1) in columns" :key="`${__}-${idx}`" >
            <td v-if="rows >= 2**idx1 &&  idx % 2**idx1===0" 
              :rowspan="2**idx1 * 1.5" class="td-spacer" :data-order="`${idx}-${idx1}`"
              :class="{'td-match': hasBottomBorder(idx, __), 'border-right': hasRightBorder(idx, __)}"
              >{{getWinner(idx, idx1)}} #{{ idx }} - {{ idx1 }}
            </td>
          </template>
        </tr>
        <tr v-if="(1+idx)%2==0"><td class="td-spacer" colspan="3" :class="{'border-right': hasRightBorder(idx, 1)}"></td></tr>
      </template>
    </tbody>
  </table>-->
</template>

<style lang="stylus" scoped>
.flex
  display flex
  flex-direction row
  border 1px solid red
  padding 1em 1em 1em 0
  align-items center

.pool
  max-width 70vw
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
.border-top
  border-top 0.1rem solid #e1e1e1
</style>