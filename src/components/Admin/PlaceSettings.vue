<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { useBoardStore } from '../../store/BoardStore'

export default defineComponent({
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
    }
})
</script>


<template>
  <div>
    <h5>Matten-Einstellungen</h5>
    <div class="flex">
      <div><label class="inline">Turniername:
        <div style="display:flex;">        
        <input v-model="signageStore.turnamentName" @change="signageStore.setTurnamentName(signageStore.turnamentName)" type="text" list="tnames" />
        <button @click="signageStore.setTurnamentName('')" class="material-icons">delete</button>
      </div>
      </label>
    </div>
      <div><label class="inline">Matte Nr.: <input type="number" v-model="signageStore.Matte"/></label></div>
    </div>
  </div>
  <h5>Kampf-Einstellungen</h5>
  <div class="flex">
    <div><label class="inline">Standard Kampfdauer: <input type="number" v-model="boardStore.defaultFightTime" @change="boardStore.setLimits(0 ,0, boardStore.defaultFightTime)" /></label></div>
    <div><label class="inline">Maximal mögliche Ippons: <input type="number" v-model="boardStore.maxIppons" @change="boardStore.setMax(boardStore.maxIppons)"/></label></div>
    <div><label class="inline">Maximal mögliche Waza-Ari: <input type="number" v-model="boardStore.maxWazaAris" @change="boardStore.setMax(0, boardStore.maxWazaAris)"/></label></div>
    <div><label class="inline">Maximal mögliche Shidos: <input type="number" v-model="boardStore.maxShidos" @change="boardStore.setMax(0, 0, boardStore.maxShidos)" /></label></div>
    <div><label class="inline">Haltegriffdauer für Ippon: <input type="number" v-model="boardStore.osaikomiIppon" @change="boardStore.setLimits(boardStore.osaikomiIppon)" /></label></div>
    <div><label class="inline">Haltegriffdauer für Waza-Ari: <input type="number" v-model="boardStore.osaikomiWaza" @change="boardStore.setMax(0, boardStore.osaikomiWaza)" /></label></div>
    <div><label class="inline">Wettkampfzeit Farbe <input type="color" v-model="boardStore.fightTimeColor" @change="boardStore.setFightTimeColor(boardStore.fightTimeColor)" /></label></div>
  </div>
  <details>
   <summary>Kampfsettings</summary>
   <div></div>
</details>
</template>

<style lang="stylus" scoped>
.inline
  display inline-grid
.flex
  display flex
  flex-wrap wrap
  div
    margin-right 1em
</style>