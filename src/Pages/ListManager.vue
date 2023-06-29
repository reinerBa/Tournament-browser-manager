<script lang="ts">
import { defineComponent } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import { Participant } from '../Models/Participant'
import {IListManagerData} from '../components/ListManager/ManagerModel'
import EoneListe from '../components/Functional/EoneListe.vue'
import BestOfThreeListe from '../components/Functional/BestOfThreeListe.vue'
import DoublekoListe from '../components/Functional/Doublekotree-List.vue'
import ControllButtons from '../components/ListManager/ControllButtons.vue'
import examples from '../components/ListManager/examples'
import favicon from '../icon.png'
import { useFavicon } from '@vueuse/core'

export default defineComponent({
  components: { EoneListe, DoublekoListe, BestOfThreeListe, ControllButtons },
  setup(){
    useFavicon(favicon)
    const params = useUrlSearchParams('history')
    return {params}
  },
  beforeCreate(){
    document.getElementById('preload')?.remove()
  },
  async beforeMount() {
    if(this.params.example)
      this.readData(examples[Number.parseInt(this.params.example as string)])
  },
  data(){
    return {
      headers: [{ text: "Name", value: "name" },{ text: "Verein", value: "verein"},{ text: "Bearbeiten", value: "operation",  width: 250}],
      systemTypes: [{name:'Jeder-Gegen-Jeden', value: 'eve'}, {name:'Doppel-Ko', value: 'dko'} ], origin: 'Listmanager', version :'',
      systemPicked: 'eve', dontPrintList: true,
      listName: '', listMeta: '', 
      participants: [] as Participant[],
      newName: '', newVerein: '', isEdit: false as false | Participant
    }
  },
  computed: {
    vereine(): string[] {
      return this.participants.map(el => el.verein)
    },
    exportData(): IListManagerData {
      return {listName: this.listName, listMeta: this.listMeta, participants: this.participants }
    }
  },
  methods:{
    readData(data: any){
      this.clearAll()
      if(typeof data === 'string') data= JSON.parse(data)
      if (data.participants) data.participants.forEach((val: Participant) => this.participants.push(val))
      delete data.Participants
      // @ts-expect-error
      for (const [key, value] of Object.entries(data)) if(typeof this[key] !== 'undefined') this[key] = value
    },
    saveParticipant(){
      if(this.isEdit) return this.saveEditParticipant()
      if(!this.newName && !this.newVerein) return
      const p: Participant = {name: this.newName, verein: this.newVerein}
      this.participants.push(p)
      this.clearMeta()
    },    
    saveEditParticipant(){
      if(!this.newName && !this.newVerein) return

      if(this.isEdit) this.isEdit.name = this.newName
      if(this.isEdit) this.isEdit.verein = this.newVerein
      this.clearMeta()
    },    
    clearMeta() {
      this.newName = ''
      this.newVerein = ''
      this.isEdit = false 
    },
    clearAll(){ 
      //@ts-expect-error
      Object.assign(this.$data, this.$options.data.apply(this)) },
    edit(element: Participant){
      let idx = this.participants.findIndex(val => element.name === val.name && val.verein === element.verein)
      let orgElement = this.participants[idx]
      this.newName = element.name
      this.newVerein = element.verein
      this.isEdit = orgElement
    }, deleteRow(el: Participant){
      let idx = this.participants.findIndex((val, idx) => val.name === el.name && val.verein === el.verein)
      this.participants.splice(idx, 1)
    },
    move(el: Participant, direction: number){
      let idx = this.participants.findIndex(val => el.name === val.name && val.verein === el.verein)
      let orgElement = this.participants[idx]
      this.participants.splice(idx, 1)
      this.participants.splice(idx + direction || 0, 0, orgElement)
    }
  }
  })
</script>

<template>
  <div>
    <h2>Listen Manager</h2>
    <p class="only-print">Turniermanager</p>
    <details open>
   <summary>Listeneinstellungen</summary>

   <div class="flex">
    <input type="text" v-model="listName" placeholder="Listenname"/>
    <span class="only-print">{{ listName }}</span>
    <span class="only-print">{{ listMeta }}</span>
    <span v-if="participants.length < 2" class="only-print">{{ participants.length }} TeilnehmerInnen eingetragen</span>

    <input type="text" v-model="listMeta" placeholder="Listenmetadaten: Turnier - Alter - Gewicht"/>
    <controll-buttons @clearAll="clearAll" @import="readData" :content="exportData" />

    <template v-for="(el, idx) in systemTypes" :key="'sty'+idx">
      <label ><input type="radio" :value="el.value" v-model="systemPicked" />
        {{ el.name }}</label>
    </template>
  </div>
   
   <div class="flex">

    </div>
  </details>

  <details open :class="{'no-print': dontPrintList}">
    <summary>TeilnehmerInnen-Verwaltung</summary>
    <h5><span v-if="!isEdit">Hinzufügen</span><span v-else>Bearbeiten</span></h5>
    <div class="flex">
      <input @keypress.enter="saveParticipant" v-model="newName" type="text" placeholder="Name"/>
      <input @keypress.enter="saveParticipant"  v-model="newVerein" type="text" list="vereine" placeholder="Verein"/>
      <datalist id="vereine">
        <option v-for="(as, idx) in vereine" :key="'ve'+idx" :value="as" />
      </datalist>
      <button v-if="isEdit" @click="saveEditParticipant" class="material-icons primary" title="Speichern" :disabled="!newName && !newVerein">save</button>
      <button v-if="isEdit" @click="clearMeta()" class="material-icons primary" title="Abbrechen">cancel</button>
      <button v-else @click="saveParticipant" class="material-icons primary" :disabled="!newName && !newVerein" title="Teilnehmer Hinzufügen">save</button>
    </div>
    <div class="flex">
      <h5>TeilnehmerInnen-Liste</h5>
      <button @click="dontPrintList = !dontPrintList" class="material-icons primary" title="Teilnehmerliste (nicht) drucken">
        <span v-if="dontPrintList">print_disabled</span><span v-else>print</span>
      </button>
    </div>
    <EasyDataTable
       show-index alternating 
      :headers="headers"
      :items="participants">
      <template #empty-message>
        <p>Noch wurden keine TeilnehmerInnen eingetragen</p>
      </template>
      <template #item-operation="element">
        <button @click="edit(element)" class="material-icons primary">edit</button>
        <button v-if="element.index > 1" @click="move(element, -1)" class="material-icons primary">arrow_upward</button>
        <button v-if="element.index < participants.length" @click="move(element, 1)" class="material-icons primary">arrow_downward</button>
        <button @click="deleteRow(element)" class="material-icons primary">delete</button>
      </template> 
    </EasyDataTable>
  </details>

  <details open>
    <summary>Listen-Ansicht</summary>
    <h5 v-if="systemPicked === 'dko'">Doppel-Ko-System</h5>
    <h5 v-else-if="systemPicked === 'eve'">Jeder-Gegen-Jeden-System</h5>
    <template v-if="systemPicked === 'eve'">
      <eone-liste v-if="participants.length < 10 && participants.length > 2" :participants="participants"/>
      <best-Of-three-liste v-else-if="participants.length === 2" :participants="participants"/>
      <h2 v-else>{{participants.length}} TeilnehmerInnen funktioniert nicht für jeder-gegen-jeden.</h2>
    </template>
    <doubleko-liste v-else-if="systemPicked === 'dko'" :participants="participants"/>
  </details>
  </div>
</template>

<style lang="stylus" scoped>

details
  padding 0 1rem
  margin 1em auto 0 auto
summary
  cursor pointer

</style>
<style lang="stylus">
@media screen
  .only-print
    display none
@media print 
  summary, .no-print, button, h2, label, input
    display none !important
    position fixed
    left -10000
  .print
    display inherit
  details
    margin 0
    max-width 100vw

@page
  margin 1cm
  size a4 landscape
</style>
