<script setup lang="ts">
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../store/SignageStore'
import NextMatches from '../components/Admin/NextMatchesList.vue'
import DoubleListe from '../components/Functional/DoublekoListe.vue'
export default defineComponent({
  components: { NextMatches, DoubleListe },
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  data(){
    return{
      iframeUrl: '',
      urls: ['admin', 'signage']
    }
  },
  computed: {
    ...mapStores(useSignageStore),
  },
  })
</script>

<template>
  <h3>Als nächstes auf Matte {{ signageStore.Matte }}</h3>
  <!--<double-liste/>-->
  <div class="matches">
    <next-matches />
  </div>
  <!--
  <p>Nächster Kampf</p>
  <p>{{ signageStore.nextFight?.pWhite.name }} ({{ signageStore.nextFight?.pWhite.verein }}) gegen {{ signageStore.nextFight?.pBlue.name }} ({{ signageStore.nextFight?.pWhite.verein }})</p>
  <p>Es bereiten sich vor</p>
  <p>{{ signageStore.overnextFight?.pBlue.name }} ({{ signageStore.nextFight?.pBlue.verein }}) gegen {{ signageStore.overnextFight?.pBlue.name }} ({{ signageStore.nextFight?.pBlue.verein }})</p>
-->
</template>

<style lang="stylus" scoped>
h3
  text-align center
.matches
  padding 1em
  font-size 200%
</style>
