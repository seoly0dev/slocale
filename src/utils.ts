export const flatten = (x: Object): Object => {
  const result = {}
  const recursive = (obj: Object, parent = '') => {
    Object.entries(obj).forEach(entry => {
      const key = entry[0]
      const value = entry[1]

      const tokenized = parent.split('.').filter(x => !!x)
      tokenized.push(key)
      const current = tokenized.join('.')

      if (typeof value == 'object') {
        recursive(value, current)
      }
      //
      else {
        result[current] = value
      }
    })
  }
  recursive(x)
  return result
}

export const stratify = (x: Object) => {
  const result = {}
  const keys = Object.keys(x)
  keys.forEach(key => {
    const tokenized = key.split('.')
    let current = result
    for (let i = 0; i < tokenized.length; i++) {
      const token = tokenized[i]
      if (i == tokenized.length - 1) {
        current[token] = x[key]
      }
      //
      else {
        if (current[token] == undefined) {
          current[token] = {}
        }
        current = current[token]
      }
    }
  })
  return result
}

export const merge = (...maps: Array<Object>) => {
  const flatList = maps.map(map => flatten(map))
  const master = flatList.shift() as Object
  const masterKeys = Object.keys(master)
  for (const map of flatList) {
    Object.keys(map)
  }

  // is same length
  flatList.reduce((acc, cur) => {
    const check = Object.keys(cur).length == masterKeys.length
    if (!check) throw Error('keys length is not same.')
    return acc && check
  }, true)

  // is all keys matched
  masterKeys.reduce((acc, cur) => {
    const check = flatList.every(slave => slave[cur] != undefined)
    if (!check) throw Error(`not every key matched: "${cur}"`)
    return acc && check
  }, true)

  for (const key in master) {
    master[key] = [master[key], ...flatList.map(slave => slave[key])]
  }

  return stratify(master)
}
// export const split = () => {}
