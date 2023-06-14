<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { Participant } from '../../Models/Participant'
import { Match } from '../../Models/Match'
import { WeightClass } from '../../Models/WeightClass'

export default defineComponent({
  computed: {
    ...mapStores(useSignageStore),
  },
  data(){
    return{
      mNumber: 0,
      newName: '',
      newVerein: '',
      newWeightClass: null as WeightClass | null,
      participants: [] as Participant[]
    }
  },
  methods:{
    addParticipant(){
      let newP: Participant = {name: this.newName, verein: this.newVerein} 
      if(!!newP.name && !!newP.verein)
        this.participants.push(newP)
      this.newName = ''
      this.newVerein = ''
    },

  }
})
</script>


<template>
    <form @submit.stop.prevent="addParticipant()">
      <select v-model="newWeightClass" class="fit-input">
        <option v-for="(w, idx) in signageStore.weightClasses" :key="idx+'wc'" :value="w">{{ w.ageName }} {{ w.weightName }} </option>
      </select>
      <input type="text" v-model="newName" placeholder="Name" class="fit-input"/>
      <input type="text" v-model="newVerein" placeholder="Verein" class="fit-input"/>
      <input type="submit" value="speichern"/>
    </form>  
    <div>

    </div>
</template>

<style lang="stylus" scoped>
.fit-input
  max-width max-content
  margin-right 1em
</style>