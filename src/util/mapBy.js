const idFn = d => d.id

export default (arr, keyFn = idFn) => {
  const out = {}
  arr.forEach(d => out[keyFn(d)] = d)
  return out
}
