import { defineStore } from 'pinia'
import { Participant } from '../Models/Participant'

export const useBoardStore = defineStore('board', {
  state: () => ({
    ipponWhite: 0,
    ipponBlue: 0,
    wazaWhite: 0,
    wazaBlue: 0,
    shidoWhite: 0,
    shidoBlue: 0,
    hansoWhite: false,
    hansoblue: false,
    osaikomiWhite: 0,
    osaikomiBlue: 0,
    fightSecounds: 120,
    maxIppons: 1,
    maxWazaAris: 2,
    maxShidos: 2,
    osaikomiIppon: 20,
    osaikomiWaza: 10,
    defaultFightTime: 120,
    fightTimeColor: '#00ff2a',
    Participants: [] as Participant[]
  }),
  actions: {
    setShidoWhite (val: boolean) {
      if (val) this.shidoWhite++
      else this.shidoWhite--
      if (this.shidoWhite < 0) this.shidoWhite = 0
      if (this.shidoWhite > this.maxShidos) this.shidoWhite = this.maxShidos
    },
    setShidoBlue (val: boolean) {
      if (val) this.shidoBlue++
      else this.shidoBlue--
      if (this.shidoBlue < 0) this.shidoBlue = 0
      if (this.shidoBlue > this.maxShidos) this.shidoBlue = this.maxShidos
    },
    setWazaWhite (val: boolean) {
      if (val) this.wazaWhite++
      else this.wazaWhite--
      if (this.wazaWhite < 0) this.wazaWhite = 0
      if (this.wazaWhite > this.maxWazaAris) this.wazaWhite = this.maxWazaAris
    },
    setWazaBlue (val: boolean) {
      if (val) this.wazaBlue++
      else this.wazaBlue--
      if (this.wazaBlue < 0) this.wazaBlue = 0
      if (this.wazaBlue > this.maxWazaAris) this.wazaBlue = this.maxWazaAris
    },
    setIpponWhite (val: boolean) {
      if (val) this.ipponWhite++
      else this.ipponWhite--
      if (this.ipponWhite < 0) this.ipponWhite = 0
      if (this.ipponWhite > this.maxIppons) this.ipponWhite = this.maxIppons
    },
    setIpponBlue (val: boolean) {
      if (val) this.ipponBlue++
      else this.ipponBlue--
      if (this.ipponBlue < 0) this.ipponBlue = 0
      if (this.ipponBlue > this.maxIppons) this.ipponBlue = this.maxIppons
    },
    setHansoWhite (val: boolean) {
      this.hansoWhite = val
    },
    setHansoBlue (val: boolean) {
      this.hansoblue = val
    },
    setMax (ippons: number = 0, wazas: number = 0, shidos: number = 0) {
      if (ippons > 0) this.maxIppons = ippons
      if (wazas > 0) this.maxWazaAris = wazas
      if (shidos > 0) this.maxShidos = shidos
    },
    setLimits (maxOsaikomiIppon: number = 0, maxOsaikomiWaza: number = 0, defaultFightTime: number = 0) {
      if (maxOsaikomiIppon > 0) this.osaikomiIppon = maxOsaikomiIppon
      if (maxOsaikomiWaza > 0) this.osaikomiWaza = maxOsaikomiWaza
      if (defaultFightTime > 0) this.defaultFightTime = defaultFightTime
    },
    setFightTimeColor (c: string) {
      this.fightTimeColor = c
    },
    decreaseFightSecounds (millisecs: number = 0.500) {
      this.fightSecounds -= millisecs
    },
    restoreFighttime () { this.fightSecounds = this.defaultFightTime },
    restoreOsaikomiWhite () { this.osaikomiWhite = 0 },
    restoreOsaikomiBlue () { this.osaikomiBlue = 0},
    increaseOsaikomiWhite (millisecs: number = 0.500) { this.osaikomiWhite += millisecs },
    increaseOsaikomiBlue (millisecs: number = 0.500) { this.osaikomiBlue += millisecs }
  },
  getters: {
  },
  persist: { }
})
