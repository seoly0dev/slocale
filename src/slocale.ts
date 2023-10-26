export const MissingStrategyType = {
  RETURN_KEY: Symbol(),
  RETURN_KEY_FULL_KEY: Symbol(),
}

export class Slocale {
  private localeList: Array<string> = []
  private localeIndex = 0
  private localeMap = {}
  private seperator = '.'
  private strategy = MissingStrategyType.RETURN_KEY

  constructor() {
    //
  }
  loadLocaleMap(localeMap: object) {
    this.localeMap = localeMap
  }
  setLocaleList(list: Array<string>) {
    this.localeList = list
  }
  getLocaleList() {
    return this.localeList
  }
  setLocale(name: string) {
    this.localeIndex = this.localeList.indexOf(name)
  }
  getLocale() {
    return this.localeList[this.localeIndex]
  }
  setLocaleIndex(index: number) {
    this.localeIndex = index
  }
  getLocaleIndex() {
    return this.localeIndex
  }
  setSeperator(seperator: string) {
    this.seperator = seperator
  }
  getSeperator() {
    return this.seperator
  }
  setMissingStrategy(strategy: symbol) {
    this.strategy = strategy
  }
  find(key: string) {
    let node = this.localeMap
    for (const token of key.split(this.seperator)) {
      node = node[token] ?? null
      if (node == null) return this.strategy == MissingStrategyType.RETURN_KEY_FULL_KEY ? key : token
    }
    return node[this.localeIndex]
  }
}
