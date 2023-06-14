<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { Participant } from '../../Models/Participant'
import { Match } from '../../Models/Match'
import { WeightClass } from '../../Models/WeightClass'
import ImportParticipants from './ImportParticipants.vue'
import { WeightList } from '../../Models/WeightList'
import ParticipantsList from './ParticipantsList.vue'

export default defineComponent({
  components: { ImportParticipants, ParticipantsList },
  data(){return{
    newWeightClass: false,
    newWeightClassAge: '',
    newWeightClassWeight: '',
    newWeightClassNick: '',
    choosenWeightList: null as WeightList | null,
  }},
  computed: {
    ...mapStores(useSignageStore),
    ageNames(): string[] {
      let wArr =  this.signageStore.weightClasses.map(w => w.ageName)
      return Array.from(new Set(wArr))
    }    
  },
  methods: {
    addWeightClass(){
      let wc: WeightClass = {nickName: this.newWeightClassNick, ageName: this.newWeightClassAge, weightName: this.newWeightClassWeight}
      this.signageStore.addWeightClasses([wc]) 
      this.newWeightClassAge= ''
      this.newWeightClassWeight= ''
      this.newWeightClassNick= ''
    },
    getAllClassesFrom(ageName: string): WeightClass[] {
      return this.signageStore.weightClasses.filter(s => s.ageName === ageName)
    },
    selectWeightClass(wc: WeightClass) {
      let wl: WeightList | undefined = this.signageStore.weightLists.find((wl: WeightList) => wl.weightClass.ageName === wc.ageName && wl.weightClass.weightName === wc.weightName )

      if(!wl?.weightClass?.weightName) {
        wl = {weightClass: wc, participants: [], type: '', matches: []}
        this.signageStore.addWeightList(wl)
      }
      this.choosenWeightList = null
      //@ts-expect-error
      this.$nextTick(()=> this.choosenWeightList = wl )
    }
  }
})
</script>


<template>
  <div>
    <h5>Pool Management</h5>
    Gewichtsklasse Anlegen<button class="material-icons" @click="newWeightClass = !newWeightClass">create</button>
    <div v-if="newWeightClass">
    <form @submit.prevent.stop="addWeightClass" class="newWeightClass">
      <label>Altersklasse<input type="text" v-model="newWeightClassAge"/></label>
      <label>Gewichtsklasse<input type="text" v-model="newWeightClassWeight" /></label>
      <label>Listenname<input type="text" v-model="newWeightClassNick"/></label>
      <input type="submit"/>
    </form> </div>
    <h6>Gewichtsklassen bearbeiten</h6>

    <div v-for="(n, idx) in ageNames" :key="'an'+idx">
    <h6>{{ n }}</h6>
      <div>
        <button v-for="(an, idx2) in getAllClassesFrom(n)" :key="'agn'+ idx2" @click="selectWeightClass(an)" class="button-outline weight-button">
          <span v-if="an.nickName">({{ an.nickName }}) </span>
          {{ an.weightName }}
        </button> 
      </div>
    </div>

    <div v-if="choosenWeightList">
      <h5>{{ choosenWeightList.participants.length }} Teilnehmer in Gewichtsklasse {{ choosenWeightList && (choosenWeightList.weightClass.ageName +' '+  choosenWeightList.weightClass.weightName) }} </h5>
      <participants-list :weight-list="choosenWeightList"/>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.inline
  display inline-flex
form.form.newWeightClass
  display inline-flex
form.newWeightClass > *
  max-width 500px
  margin-right 1em
.weight-button
  padding 0 .75em
  margin-right .5em
h6
  margin .5em 0 0 0
</style>