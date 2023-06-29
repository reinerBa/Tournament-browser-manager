<script lang="ts">
import { useStorage } from '@vueuse/core'
import { useFileSystemAccess } from '@vueuse/core'
import { defineComponent, onMounted, PropType, Ref } from 'vue'
import { reactive, ref } from 'vue'
import { IListManagerData } from './ManagerModel'
export default defineComponent({
  setup(props, { emit }){
  const dataType = ref('Text') as Ref<'Text' | 'ArrayBuffer' | 'Blob'>
  const res = useFileSystemAccess({
    dataType,
    types: [{
      description: 'text',
      accept: {
        'text/plain': ['.json'],
      },
    }],
    excludeAcceptAllOption: true,
  })

    const content = res.data
    const str = JSON.stringify(reactive({
      isSupported: res.isSupported,
      file: res.file,
      fileName: res.fileName,
      fileMIME: res.fileMIME,
      fileSize: res.fileSize,
      fileLastModified: res.fileLastModified,
    }))

    async function onSave() {
      await res.save()
    }
    async function saveAs() {
      res.data.value = JSON.stringify(props.content)
      await res.saveAs()
    }
    async function openFromFile(){
      await res.open()
      console.log(res.data.value)
      emit('import', res.data.value)
    }

    // bind object
    const persistentState = useStorage('listmanager-store', [] as IListManagerData[])
    function saveBrowser() {
      persistentState.value.push(props.content)
    }
    return {saveAs, openFromFile, saveBrowser}  
  },
  emits:['clearAll', 'import'],
  props: {
    content:{      
      required: true, 
      type: Object as PropType<IListManagerData>
    }
  },
  methods:{
    print() {
      window.print()
    },
    clear(){
      let answer = window.confirm('Wirklich alle Eingaben entfernen?')
      if(answer) this.$emit('clearAll')
    },
    openFromBrowser(){
      let d = localStorage.getItem('listdata-'+this.content.listName)
    }
  }
})
</script>

<template>
  <div class="inline">
    <!--<button @click="saveBrowser" class="material-icons primary" title="Liste speichern im Browser">save</button>
    <button @click="openFromBrowser" class="material-icons primary" title="Öffnen vom Browser">file_open</button>-->
    <button @click="saveAs" class="material-icons primary" title="Liste speichern auf Festplatte">download_for_offline</button>
    <button @click="openFromFile" class="material-icons primary" title="Liste öffnen">open_in_browser</button>
    <button @click="print" class="material-icons primary" title="Ausdrucken">print</button>
    <button @click="clear" class="material-icons primary" title="Alle Eingaben löschen">delete</button>
  </div>
</template>

<style lang="stylus" scoped>
.inline
  display inline-flex
</style>