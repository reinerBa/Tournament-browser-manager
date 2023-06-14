<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useSignageStore } from '../../store/SignageStore'
import { useBoardStore } from '../../store/BoardStore'
import SecTimer from '../Functional/SecTimer.vue'
import ScoreEditor from './boardControl/ScoreEditor.vue'
import TimeEditor from './boardControl/TimeEditor.vue'

export default defineComponent({
  components: { SecTimer, ScoreEditor, TimeEditor },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  }
})
</script>

<template>
  <h3>Board Controls</h3>
  <div>
    <time-editor/>

    <br/>

    <score-editor/>
  </div>
</template>

<style lang="stylus" scoped>

</style>