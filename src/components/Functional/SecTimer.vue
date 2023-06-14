<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    secounds:{
      required: true,
      type: Number
  },
  secoundsOnly: {required: false, type: Boolean}
},
  computed: {
    minutes(): string {
      if(this.secounds < 0) return '0'
      return Math.floor(Math.round(this.secounds) / 60) + ''
    },
    secs(): string {
      if(this.secounds < 0) return '00'
      let s = Math.round(this.secounds) % 60
      if(s < 10) return '0' + s
      return `${s}`
    }
  },
  watch:{
    seconds(newVal, oldValue) {
      if(oldValue > newVal && newVal === 0) this.$emit('timeover')
      if(newVal > oldValue && newVal === 10) this.$emit('')
    }
  }
})
</script>

<template>
  <div>
    <span v-if="!secoundsOnly">{{ minutes }}:</span>{{ secs }}
  </div>
</template>

<style lang="stylus" scoped>
div
  font-weight: bold
</style>