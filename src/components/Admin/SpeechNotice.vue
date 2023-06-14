<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapStores } from 'pinia'
import { useSignageStore } from '../../store/SignageStore'
import { useBoardStore} from '../../store/BoardStore'
import { onMounted, ref } from 'vue'
import { useSpeechSynthesis } from '@vueuse/core'
export default defineComponent({
  setup(props){
    const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
    let rede = `Nächster Kampf auf Matte ${useSignageStore().Matte}, ${useSignageStore().nextFight?.pWhite.name ?? ''} 
    vom ${useSignageStore().nextFight?.pWhite.verein ?? ''} gegen 
    ${useSignageStore().nextFight?.pBlue.name ?? ''} vom ${useSignageStore().nextFight?.pBlue.verein ?? ''}`
    
    const prepare = `Es bereiten sich vor
    ${useSignageStore().overnextFight?.pWhite.name ?? ''} gegen ${useSignageStore().overnextFight?.pBlue.name ?? ''}`
    if(useSignageStore().overnextFight) rede += prepare

    const speech = useSpeechSynthesis(rede, {
      lang: 'de-DE',
      pitch: 1,
      rate: 1,
      volume: 1, 
      voice
    })

    let synth: SpeechSynthesis
    const voices = ref<SpeechSynthesisVoice[]>([])
    onMounted(() => {
      if (speech.isSupported.value) {
      // load at last
        setTimeout(() => {
          synth = window.speechSynthesis
          voices.value = synth.getVoices()
          voice.value = voices.value[0]
        })
      }
    })
    function play() {
      if (speech.status.value === 'pause') {
        console.log('resume')
        window.speechSynthesis.resume()
      }
      else {
        speech.speak()
      }
    }
    function pause() {
      window.speechSynthesis.pause()
    }
    function stop() {
      speech.stop()
    }
    return {stop, play, pause}
  },
  props: {
    text: {type: String, default: 'hallo'}
  },
  computed: {
    ...mapStores(useSignageStore, useBoardStore),
  },
  })
</script>

<template> 
  <button @click="play" class="material-icons">play_arrow</button> 
  <button @click="stop" class="material-icons">stop</button> 
</template>