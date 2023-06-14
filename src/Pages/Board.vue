<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../store/SignageStore'
import PlayerRow from '../components/Board/PlayerRow.vue'
import { useBoardStore } from '../store/BoardStore'
import SecTimer from '../components/Functional/SecTimer.vue'
export default defineComponent({
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  components: { PlayerRow, SecTimer },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  },
})
</script>

<template>
  <div class="board-colum">
    <div class="metarow">
      <div class="turnament" :class="{'small': signageStore.turnamentName}">
        <span v-if="signageStore.turnamentName">{{signageStore.turnamentName }}<br/> </span>
        {{signageStore.nextFight?.weightClass?.ageName}} {{signageStore.nextFight?.weightClass?.weightName}} 
      </div>
      <div class="matte">{{ signageStore.Matte }}</div>
      <sec-timer :secounds="boardStore.fightSecounds" class="fighttime" :style="{color: boardStore.fightTimeColor}"/>
    </div>
    
    <player-row v-if="signageStore.nextFight"
      :participantWhite="signageStore.nextFight?.pWhite" 
      :participantBlue="signageStore.nextFight?.pBlue" 
    />
</div>
</template>

<style lang="stylus" scoped>
h3
  text-align center
.board-colum
  overflow hidden
  display flex
  flex-direction column
.metarow
  display flex
  flex-direction row
  justify-content space-between
  line-height normal
  background-color grey
  color white
  min-height 25vh
  font-size 4em
  max-height 28vh
  padding-left 1rem
  .turnament
    font-size 12vh
    font-weight bold
  .turnament.small
    font-size 10vh
    span
      font-weight normal
      font-size 8vh
.fighttime
  font-size 28vh
  font-weight bold
  margin-top -3vh
.matte
  border 3px solid #fff
  border-radius 50%
  align-self center
  padding 0.3em
  width 1.25em
  height 1.25em
  line-height .6em
  font-size 10vh
</style>
