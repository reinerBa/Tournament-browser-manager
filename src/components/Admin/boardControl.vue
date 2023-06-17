<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useSignageStore } from '../../store/SignageStore'
import { useBoardStore } from '../../store/BoardStore'
import SecTimer from '../Functional/SecTimer.vue'
import ScoreEditor from './boardControl/ScoreEditor.vue'
import TimeEditor from './boardControl/TimeEditor.vue'
import ToggleButton from '../Functional/ToggleButton.vue'

export default defineComponent({
  components: { SecTimer, ScoreEditor, TimeEditor, ToggleButton },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  }
})
</script>

<template>
  <div class="title">
    <h3>Board Controls</h3>
    <toggle-button v-model="boardStore.boardOnlyMode" optionOne="Turniermodus" optionTwo="Anzeige ohne Namen" @update:modelValue="boardStore.setBoardOnlyMode($event)"/>
  </div>
  <div>
    <time-editor/>

    <br/>

    <score-editor/>
  </div>
</template>

<style lang="stylus" scoped>
.title
  display flex
  justify-content space-between
</style>