<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'

export default defineComponent({
  props: {
    controls: {default: false, type: Boolean}
  },
  computed: {
    ...mapStores(useSignageStore),
  },
})
</script>

<template>
  <div v-for="(m, idx) in signageStore.openMatches" :key="'m' + idx" class="matches">
    <div class="idx">
      {{ idx }}
    </div>
    <div v-if="m.weightClass" class="weightclass">
      <div>{{ m.weightClass.ageName }}</div> 
      <div>{{ m.weightClass.weightName }} {{ m.weightClass.nickName || '' }}</div>
    </div>
  <div class="names">
    <div>{{ m.pWhite.name }} ({{ m.pWhite.verein }})</div>
    <div class="blue">{{ m.pBlue.name }} ({{ m.pWhite.verein }})</div>
  </div>
  <div v-if="controls" class="controls">
    <button v-if="idx===0" style="margin:0;">Start</button>
    <div class="inline">
      <button class="material-icons">expand_less</button>
      <button class="material-icons">expand_more</button>
    </div>
  </div>
</div>
</template>

<style lang="stylus" scoped>
.matches
  border 1px solid lightgrey
  display  flex
.matches > div.idx
  align-self center
  margin 0 .75em
.matches p
  margin 0
.blue
  color white
  background-color blue
.names
  border-left 1px solid lightgrey
  width 100%
.weightclass
  border-left 1px solid lightgrey
  border-right 1px solid lightgrey
  padding 0 .5em
.names > div
  padding 0 .5em
.controls
  padding-left 1em
  display flex
  flex-direction column

.controls button
  border 1px solid black
.inline
  display inline-flex
.inline > button
  padding-left 0.5em
  padding-right 0.5em
  margin 0
</style>