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
  private self = '_'

  constructor() {
    this.t = this.t.bind(this)
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
  setSelfKey(self: string) {
    this.self = self
  }
  getSelfKey() {
    return this.self
  }
  setMissingStrategy(strategy: symbol) {
    this.strategy = strategy
  }
  t(key: string): string {
    let node = this.localeMap
    const keySplit = key.split(this.seperator)
    for (const token of keySplit) {
      node = node[token] ?? null
      if (node == null) return this.strategy == MissingStrategyType.RETURN_KEY_FULL_KEY ? key : token
    }

    let result = node[this.self] ? node[this.self][this.localeIndex] : node[this.localeIndex]
    if (result == null) return this.strategy == MissingStrategyType.RETURN_KEY_FULL_KEY ? key : keySplit[keySplit.length - 1]

    return result
  }
}
