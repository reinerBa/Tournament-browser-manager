<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { WeightClass } from '../../Models/WeightClass'
import { WeightList } from '../../Models/WeightList'
import { Participant } from '../../Models/Participant'
import { Match } from '../../Models/Match'

export default defineComponent({
  props: {
    controls: {default: false, type: Boolean}
  },
  data(){
    return{
      newWeightList: null as WeightList | null,
      nextMatchWhite: null as Participant | null,
      nextMatchRed: null as Participant | null
    }
  },
  computed: {
    ...mapStores(useSignageStore),
  },
  methods:{
    setNextFight() {
      if( !this.nextMatchWhite ||  !this.nextMatchRed) return ;
      let newM: Match = {pWhite: this.nextMatchWhite, pBlue: this.nextMatchRed, done: false, doneTimestamp: 0, nr: '', weightClass: this.newWeightList?.weightClass}
      this.signageStore.addMatch(newM)
    }
  }
})
</script>

<template>
  <div>
    <h5>Nächste Kämpfe</h5>
    <div>Gewichtsklasse <span v-show="!newWeightList">wählen</span></div>
    <select v-model="newWeightList" class="fit-input">
      <option v-for="(w, idx) in signageStore.weightLists" :key="idx+'wc'" :value="w">{{ w.weightClass.ageName }} {{ w.weightClass.weightName }} </option>
    </select>
    <form v-show="newWeightList" @submit.prevent.stop="setNextFight" class="inline">
      <label>
        <select v-model="nextMatchWhite">
          <option v-for="(p, idx) in signageStore.Participants" :key="idx+'pkW'" :value="p">{{ p.name }} - {{ p.verein }} </option>
        </select>
      </label>
      &ensp; gegen &ensp;
      <label>
        <select v-model="nextMatchRed">
          <option v-for="(p, idx) in signageStore.Participants" :key="idx+'pkR'" :value="p">{{ p.name }} - {{ p.verein }}</option>
        </select>
      </label>&ensp;
      <button>save</button>
    </form>
  </div>
</template>

<style lang="stylus" scoped>
form.inline
  display: flex
  flex-direction row
  justify-content space-between
form.inline > label
  width 100%
</style>
