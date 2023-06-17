<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue:{
      required: true,
      type: Boolean
    },
    optionOne: {type: String, default: ''},
    optionTwo: {type: String, default: ''}
  },
  emits: ['update:modelValue'],
  computed: { }
})
</script>

<template>
    <div class="flex toggle">
      <button :class="{'selected': !modelValue}" @click="$emit('update:modelValue', false)">{{ optionOne }}</button>
      <button :class="{'selected': modelValue}" @click="$emit('update:modelValue', true)">{{ optionTwo }}</button>
  </div>
</template>

<style lang="stylus" scoped>
.flex
  display inline-flex
  align-items center
.flex *
  margin 0
button:first-of-type
  border-top-right-radius 0 
  border-bottom-right-radius 0 
button:last-of-type
  border-bottom-left-radius 0 
  border-top-left-radius 0 
.selected
  background-color green
  color white
button:not(.selected)
  color black
  background-color lightgrey
.toggle input 
  display none
input
  zoom 2
</style>