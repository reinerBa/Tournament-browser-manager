<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent,getCurrentInstance } from 'vue'
import { useSignageStore } from '../../../store/SignageStore'
import { useBoardStore } from '../../../store/BoardStore'
import SecTimer from '../../Functional/SecTimer.vue'
import { useIntervalFn } from '@vueuse/core'

export default defineComponent({
  mounted(){
    this.intervalNr = setInterval(this.updateValues, 500)
  },
  unmounted(){
    clearInterval(this.intervalNr)
  },
  components: { SecTimer },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  },
  data(){ return {
    intervalNr: 0,
    fightTime: 0,
    fightRunning: false,
    isOsaikomiWhite: false,
    isOsaikomiBlue: false
  }},
  methods:{
    updateValues(){
      if(this.fightRunning) this.boardStore.decreaseFightSecounds()
      if(this.isOsaikomiWhite) this.boardStore.increaseOsaikomiWhite()
      if(this.isOsaikomiBlue) this.boardStore.increaseOsaikomiBlue()
    },
    startFightTime(){ this.fightRunning = true },
    pauseFightTime(){ this.fightRunning = false },
    stopFightTime(){ this.fightRunning = false, this.boardStore.resetBoard() },
    startOsaikomiWhite() { this.boardStore.restoreOsaikomiWhite(), this.isOsaikomiWhite = true, this.isOsaikomiBlue = false, this.pauseOsaikomiBlue() },
    stopOsaiKomiWhite(){ this.isOsaikomiWhite = false, this.boardStore.restoreOsaikomiWhite() },
    pauseOsaikomiWhite(){ this.isOsaikomiWhite = false; if(this.boardStore.osaikomiWhite < this.boardStore.osaikomiWaza) this.boardStore.restoreOsaikomiWhite() },
    startOsaikomiBlue() { this.boardStore.restoreOsaikomiBlue(), this.isOsaikomiBlue = true, this.pauseOsaikomiWhite() },
    pauseOsaikomiBlue(){ this.isOsaikomiBlue = false; if(this.boardStore.osaikomiBlue < this.boardStore.osaikomiWaza) this.boardStore.restoreOsaikomiBlue()},
    stopOsaiKomiBlue(){ this.isOsaikomiBlue = false, this.boardStore.restoreOsaikomiBlue()  }
  }
})
</script>

<template>
    <table class="times">
      <tbody>
        <tr><td>Kampfzeit</td>
          <td><sec-timer :secounds="boardStore.fightSecounds"/></td>
          <td><div>
            <button v-if="!fightRunning" @click="startFightTime" class="material-icons">play_arrow</button>
            <button v-else @click="pauseFightTime" class="material-icons">pause</button>
            <button @click="stopFightTime" class="button-outline material-icons">refresh</button>
        </div></td></tr>
        <tr><td>Osaikomi Weiß</td>
          <td><sec-timer :secounds="boardStore.osaikomiWhite"/></td>
          <td><div>
            <button v-if="!isOsaikomiWhite" @click="startOsaikomiWhite" class="material-icons">play_arrow</button>
            <button v-else @click="pauseOsaikomiWhite" class="material-icons">stop</button>
            <button v-show="boardStore.osaikomiWhite" @click="stopOsaiKomiWhite" class="button-outline material-icons">refresh</button>
        </div></td></tr>
        <tr><td>Osaikomi Blau</td>
          <td><sec-timer :secounds="boardStore.osaikomiBlue"/></td>
          <td><div>
            <button v-if="!isOsaikomiBlue" @click="startOsaikomiBlue" class="material-icons">play_arrow</button>
            <button v-else @click="pauseOsaikomiBlue" class="material-icons">stop</button>
            <button v-show="boardStore.osaikomiBlue" @click="stopOsaiKomiBlue" class="button-outline material-icons">refresh</button>
        </div></td></tr>
      </tbody>
    </table>
</template>

<style lang="stylus" scoped>
td
  text-align center
  vertical-align middle
thead td
  font-weight bold
  text-align center
button
  margin .1em
  height: 2em
.inline
  display inline-flex
  justify-content space-between

table.times
  max-width: 600px
  tbody td:nth-of-type(even)
    font-size 2em
</style>