<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../store/SignageStore'
import { U13, U15, WeightClass } from '../Models/WeightClass'
import { useBoardStore } from '../store/BoardStore'
import { useUrlSearchParams } from '@vueuse/core'
import { Participant } from '../Models/Participant'

export default defineComponent({
  setup(){
    const params = useUrlSearchParams('history')
    return {params}
  },
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  async beforeMount() {
//    if(!this.signageStore.weightClasses.some((w: WeightClass) => w.ageName.startsWith('U13')))
//      this.signageStore.addWeightClasses(U13)
    if(!this.signageStore.weightClasses.some((w: WeightClass) => w.ageName.startsWith('U15')))
      this.signageStore.addWeightClasses(U15)
    this.boardStore.setMax(0,0,0)
    if(this.params.example) {
      const response = await fetch('./'+this.params.example)
      const data = await response.json()
      if (data.participants && data.participants.length) data.participants.forEach((p: Participant) => this.signageStore.addParticipant(p))
    }

  },
  computed:{
    ...mapStores(useSignageStore, useBoardStore)
  },
  data(){
    return{
      iframeUrl: '',
      urls: ['admin', 'signage', 'board']
    }
  },
  methods:{
  }
  })
</script>

<template>
  <div class="flex">
    <div style="width: 90vw; flex-direction: row;" class="flex">
      <div v-for="(url, idx) in urls" :key="idx+'url'"><button @click="iframeUrl=url" :href="url">{{ url }}</button><a :href="'./'+url+ '/'" target="_blank"> >Open {{ url }}</a></div>
    </div>
    <iframe v-if="iframeUrl" :src="'./'+iframeUrl+ '/index.html'" ref=iframe width="100%" height="100%"></iframe>
  </div>
</template>

<style lang="stylus" scoped>
.flex div
  width 50vw
.flex
  display flex
  flex-direction column
iframe
  height 100vh
</style>
