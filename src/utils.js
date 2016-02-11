import emojilib from 'emojilib'

const emojis = Object.keys(emojilib.lib).reduce((result, key) => {
  result[key] = result[key] || emojilib.lib[key].char
  emojilib.lib[key].keywords.forEach(keyword => {
    result[keyword] = result[keyword] || emojilib.lib[key].char
  })
  return result
}, {})

export function replaceEmojis(str) {
  const re = /\:(\w+)\:/g
  return (str.match(re) || []).reduce((str, match) => {
    const keyword = match.replace(/\:/g,"")
    if (emojis[keyword]) {
      return str.replace(match, emojis[keyword])
    } else {
      return str
    }
  }, str)
}

export function quote(str) {
  if (str === "") return str
  return "> ".concat(str).split("\n").join("\n> ").concat("\n\n")
}
