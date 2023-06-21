<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../store/SignageStore'
import NextMatches from '../components/Admin/NextMatchesList.vue'
import WeightLists from '../components/Admin/WeightLists.vue'
import ParticipantsList from '../components/Admin/ParticipantsList.vue'
import NextMatchesCreate from '../components/Admin/NextMatchesCreate.vue'
import BoardControl from '../components/Admin/boardControl.vue'
import ImportParticipants from '../components/Admin/ImportParticipants.vue'
import PlaceSettings from '../components/Admin/PlaceSettings.vue'
import SpeechNotice from '../components/Admin/SpeechNotice.vue'
export default defineComponent({
  components: { NextMatches, ImportParticipants, BoardControl, PlaceSettings, WeightLists, ParticipantsList, NextMatchesCreate, SpeechNotice},
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  data(){
    return{
      curView: 'board'
    }
  },
  computed: {
    ...mapStores(useSignageStore),
  },
  methods:{

  }
  })
</script>

<template>
  <nav>
    <button @click="curView='board'" :class="{'button-outline': curView != 'board'}">Board</button>
    <button @click="curView = 'matches'" :class="{'button-outline': curView != 'matches'}">Kämpfe</button>
    <button @click="curView = 'players'" :class="{'button-outline': curView != 'players'}">Teilnehmer</button>
    <button @click="curView = 'tournament'" :class="{'button-outline': curView != 'tournament'}">Turnier</button>
    <button @click="curView = 'teams'" :class="{'button-outline': curView != 'teams'}">Mannschaften</button>
    <button @click="curView = 'meta'" :class="{'button-outline': curView != 'meta'}">Meta</button>
  </nav>
  <main v-if="curView === 'meta'">
    <h4>Verwaltungsansicht</h4>
    <place-settings />
  </main>
  <main v-if="curView === 'board'">
    <board-control />
  </main>
  <main v-if="curView === 'matches'">
    <speech-notice />
    <next-matches-create />
    <next-matches :controls="true" />
    </main>
  <main v-if="curView === 'players'">
    <weight-lists/>
    <participants-list/>
  </main>
  <main v-if="curView === 'teams'">
    <weight-lists/>
    <participants-list/>
  </main>
  <main v-if="curView === 'tournament'">
    <h1>Turnierverwaltung</h1>
  </main>
</template>

<style lang="stylus" scoped>
.main
  margin 1em
  padding 1em
  width 50vw
.flex
  display flex
input[type="submit"]
  position absolute
button.red
  background-color red
button.white
  background-color white
  color black
  border 1px solid black
td.flex
  display flex

</style>