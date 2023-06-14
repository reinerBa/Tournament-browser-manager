<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useSignageStore } from '../../../store/SignageStore'
import { useBoardStore } from '../../../store/BoardStore'

export default defineComponent({
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  },
  data(){ return {
    fightTime: 0,
    fightRunning: false,
    osaikomiWhite: 0,
    isOsaikomiWhite: false,
    osaikomiBlue: 0,
    isOsaikomiBlue: false
  }}
})
</script>

<template>
      <table>
      <thead>
        <tr><td></td><td colspan="2">Ippon</td><td colspan="2">Waza-Ari</td><td colspan="2">Shido</td><td>Hansokumake</td></tr>
      </thead>
      <tbody>
  <tr>
    <td>Wertungen Weiß</td><td>{{ boardStore.ipponWhite }}</td><td>
      <div class="inl"><button @click="boardStore.setIpponWhite(true)">+</button><button @click="boardStore.setIpponWhite(false)" class="button-outline">-</button></div>
    </td>
    <td>{{ boardStore.wazaWhite }}</td><td class="inl">
      <div class="inl"><button @click="boardStore.setWazaWhite(true)">+</button><button @click="boardStore.setWazaWhite(false)" class="button-outline">-</button></div></td>
    <td>{{ boardStore.shidoWhite }}</td><td class="inl">
      <div class="inl"><button @click="boardStore.setShidoWhite(true)">+</button><button @click="boardStore.setShidoWhite(false)" class="button-outline">-</button></div></td>
    <td><input type="checkbox" v-model="boardStore.hansoWhite" @click="boardStore.setHansoWhite(!boardStore.hansoWhite)"/></td>
  </tr>
  <tr>
    <td style="background-color: blue; color: white">Wertungen Blau</td><td>{{ boardStore.ipponBlue }}</td><td class="inl">
      <div class="inl"><button @click="boardStore.setIpponBlue(true)">+</button><button @click="boardStore.setIpponBlue(false)" class="button-outline">-</button></div>
    </td>
    <td>{{ boardStore.wazaBlue }}</td><td class="inl">
      <div class="inl"><button @click="boardStore.setWazaBlue(true)">+</button><button @click="boardStore.setWazaBlue(false)" class="button-outline">-</button></div></td>
    <td>{{ boardStore.shidoBlue }}</td><td class="inl">
      <div class="inl"><button @click="boardStore.setShidoBlue(true)">+</button><button @click="boardStore.setShidoBlue(false)" class="button-outline">-</button></div></td>
    <td><input type="checkbox" v-model="boardStore.hansoblue" @click="boardStore.setHansoBlue(!boardStore.hansoblue)"/></td>
  </tr>
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

td
  input
    zoom 2
    margin 0
  button
    font-size 2em
    padding 0 .33em
    background-color black
    border-color black
    margin 0
    width 3em
    border-radius 0
  button:hover
    background-color darkgreen
    border-color darkgreen
  button:first-of-type
    border-top-left-radius 35%
    border-top-right-radius 35%
  button:last-of-type
    border-bottom-left-radius 35%
    border-bottom-right-radius 35%
  .button-outline
    background-color transparent
    color black
  .button-outline:hover
    background-color #00a10085
  tbody td:nth-of-type(even)
    font-size 2em
    font-weith bold
  .inl
    display flex
    flex-direction column
</style>
