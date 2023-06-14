<script setup lang="ts">
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../store/SignageStore'
import { U13, U15, WeightClass } from '../Models/WeightClass'
import { useBoardStore } from '../store/BoardStore'
export default defineComponent({
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  beforeMount() {
//    if(!this.signageStore.weightClasses.some((w: WeightClass) => w.ageName.startsWith('U13')))
//      this.signageStore.addWeightClasses(U13)
    if(!this.signageStore.weightClasses.some((w: WeightClass) => w.ageName.startsWith('U15')))
      this.signageStore.addWeightClasses(U15)
    this.boardStore.setMax(0,0,0)
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
  {{ iframeUrl }}
  <div class="flex">
    <div style="width: min-content">
      <p v-for="(url, idx) in urls" :key="idx+'url'" @click="iframeUrl=url"><button :href="url">{{ url }}</button></p>
    </div>
    <iframe v-if="iframeUrl" :src="'/'+iframeUrl+ '/index.html'" ref=iframe width="100%" height="100%"></iframe>
  </div>
</template>

<style lang="stylus" scoped>
.flex div
  margin 1em
  padding 1em
  width 50vw
  border 1px solid red
.flex
  display flex
iframe
  height 100vh
</style>
