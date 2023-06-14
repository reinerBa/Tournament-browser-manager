<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { useBoardStore} from '../../store/BoardStore'
import {Participant} from '../../Models/Participant'
export default defineComponent({
  props: {
    participantWhite: {
      required: true, 
      type: Object as PropType<Participant>,
    },
    participantBlue: {
      required: true, 
      type: Object as PropType<Participant>,
    },
    color: {type: String, default: 'white'}
  },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  },
  })
</script>

<template>
  <div class="player white">
    <div class="ident">
      <div>{{ participantWhite.name }}</div> 
      <div class="verein">({{ participantWhite.verein }})</div>
      <div v-if="boardStore.osaikomiWhite" class="osaikomi">{{Math.floor(boardStore.osaikomiWhite)}}</div>
    </div>
    <div class="scores">
      <div>{{ boardStore.ipponWhite }}</div>
      <div>{{ boardStore.wazaWhite }}</div> 
      <div class="shido">
        <i v-if="boardStore.hansoWhite" class="material-icons hanso">disabled_by_default</i>
        <i v-else-if="boardStore.shidoWhite === 1" class="material-icons">looks_one</i>
        <i v-else-if="boardStore.shidoWhite === 2" class="material-icons">looks_two</i>
        <i v-else-if="boardStore.shidoWhite === 3" class="material-icons">looks_3</i>
        <i v-show="boardStore.shidoWhite && !boardStore.hansoWhite" class="back">&emsp;</i>
      </div>
    </div>
  </div>  
  <div class="player blue">
    <div class="ident">
      <div>{{ participantBlue.name }}</div> 
      <div class="verein">({{ participantBlue.verein }})</div>
      <div v-if="boardStore.osaikomiBlue" class="osaikomi">{{ Math.floor(boardStore.osaikomiBlue) }}</div>
    </div>
    <div class="scores">
      <div>{{ boardStore.ipponBlue }}</div>
      <div>{{ boardStore.wazaBlue }}</div>
      <div class="shido">
        <i v-if="boardStore.hansoblue" class="material-icons hanso">disabled_by_default</i>
        <i v-else-if="boardStore.shidoBlue === 1" class="material-icons">looks_one</i>
        <i v-else-if="boardStore.shidoBlue === 2" class="material-icons">looks_two</i>
        <i v-else-if="boardStore.shidoBlue === 3" class="material-icons">looks_3</i>
        <i v-show="boardStore.shidoBlue && !boardStore.hansoblue" class="back">&emsp;</i>
      </div>
    </div>
  </div>  
</template>

<style lang="stylus" scoped>
* 
  line-height normal
.player 
  font-size 13vh
  display flex
  padding-left 1rem
  margin-bottom -1.25vh
.player .verein
  font-size: 5vh
.ident
  position relative
.player.blue
  background-color darkblue
  color white
.player > div
  min-height: 33vh
.player > .ident
  width 55%
.ident .osaikomi
  position absolute
  right 0
  bottom calc(1vh + 2px)
  color #ff3e3e
  background-color #000000c9
  font-weight bold
  padding 0.35em .5em
  border 1px solid white

.scores
  padding-left: .1em
  display flex
  width 45%
  font-size 2.5em
  margin-top 0
  margin-bottom -.35em
.scores > div
  flex-grow 1
  text-align center
.shido
  height 1.5em
  position relative
  width 0.75em
  overflow hidden
  .material-icons
    font-size 1em
    margin-top 0.1em
    color yellow
  .hanso
    color red
i.back
  background-color grey
  position absolute
  left 0.25em
  top 0.25em
  z-index -1
  width 40%
  height 40%
</style>