export class ListMatch {
  matchIdx: number
  whiteNr: number
  blueNr: number
  winnerNr: number
  winnerName?: string
  whiteName?: string
  blueName?: string
  winnerScore: number

  constructor
  (whiteNr: number, blueNr: number, matchIdx: number) {
    this.matchIdx = matchIdx
    this.whiteNr = whiteNr < blueNr ? whiteNr : blueNr
    this.blueNr = blueNr > whiteNr ? blueNr : whiteNr
    this.winnerNr = -1
    this.winnerScore = -1
  }

  get Indexes () : Array<number> { 
    return [this.whiteNr, this.blueNr] 
  }

  isEqual (el: ListMatch): boolean { return el.whiteNr === this.whiteNr && el.blueNr === this.blueNr }

  doesOverlapp(el: ListMatch): boolean { return el.whiteNr === this.whiteNr || el.blueNr === this.blueNr || el.blueNr === this.whiteNr || el.whiteNr === this.blueNr }
}