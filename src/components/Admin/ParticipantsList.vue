<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { Participant } from '../../Models/Participant'
import { WeightList } from '../../Models/WeightList'

export default defineComponent({
  props: {
    weightList: { default: null,  type: Object as PropType<WeightList | null>}
  },
  data(){return{
    newName: '',
    newVerein: '',
    newAgeClass: '',
    newWeight: ''
  }},
  computed: {
    ...mapStores(useSignageStore),
    list(): Participant[] {
      if(this.weightList) return this.weightList.participants
      else return this.signageStore.Participants
    }
  },
  mounted() {
    this.clearMeta()
  },
  methods: {
    saveParticipant(){
      const p: Participant = {name: this.newName, verein: this.newVerein, ageClass: this.newAgeClass, weight: this.newWeight}
      this.signageStore.addParticipant(p)
      this.weightList?.participants.push(p)
      this.clearMeta()
    },
    clearMeta() {
      this.newName = ''
      this.newVerein = ''  
      if(!this.weightList) return
      this.newAgeClass = this.weightList.weightClass.ageName
      this.newWeight = this.weightList.weightClass.weightName
    }
  }
})
</script>

<template>
  <h5 v-if="!weightList">Teilnehmer Liste ({{ list.length }})</h5>
    <table>
      <thead>
        <tr><th>Nr</th><th>Name</th><th>Verein</th><th>Alter</th><th>Gewicht</th></tr>
      </thead>
      <tbody>
        <tr @keypress.enter="saveParticipant">
          <td class="action-td"><button class="material-icons plusbutton">add_circle</button></td>
          <td><input v-model="newName" type="text"/></td>
          <td>
            <input v-model="newVerein" type="text" list="vereine" />
            <datalist id="vereine">
              <option v-for="(as, idx) in signageStore.associations" :key="'as'+idx" :value="as" />
            </datalist>
          </td>
          <td>
            <select v-model="newAgeClass" style="max-width:10em;" :disabled="!!weightList">
              <option v-for="(a, idx) in signageStore.ageNames" :key="'agenames'+idx" :value="a">{{ a }}</option> 
          </select>
        </td>
          <td><input v-model="newWeight" type="text" placeholder="Gewicht" style="max-width:7em;" :disabled="!!weightList"/></td>
        </tr>
        <tr v-for="(p, idx) in list" :key="'part'+idx">
          <td>{{ idx }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.verein }}</td>
          <td>{{p.ageClass}}</td>
          <td>{{ p.weight }}</td>
        </tr>
      </tbody>
    </table>
</template>

<style lang="stylus" scoped>
.action-td
  width 1em
  padding 0 0 0 .5em
.plusbutton
  padding 0 .3em
  background-color #3ddb3d
  border 1px solid green
  color white
</style>