/**
 * Generate random alphabet string
 * @param length - string ouput length
 * @returns random alphabet string
 */
function randomString (length: number) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
 * Generate random number
 * @param length - output length
 * @returns random number string
 */
function randomStringNumber (length: number) {
  const result = []
  const characters = '0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
 * Generate random string with alpabet and number combination
 * @generator
 * @param {Number} length
 * @yields {String} random string alpha number
 */
function randomStringAlphaNumber (length: number) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
 * Foreach looping for string
 * @param {String} string
 * @param {Function} callback
 */
function forEachString (string: string, callback: Function) {
  const loopString: Function = (string: string, callback: Function, index: number = 0) => {
    const character = string.charAt(index)
    if (!character) {
      return
    }
    callback(character)
    return loopString(string, callback, index + 1)
  }

  return loopString(string, callback)
}

/**
 * Reverse string function
 * @param {String} string
 * @return {String}
 */
function reverseString (string: string): string {
  const splitString = string.split('')
  const reverseArray = splitString.reverse()
  const joinArray = reverseArray.join('')
  return joinArray
}

/**
 * Split string with array output
 * @param {String} string
 * @returns {Array} splited string
 */
function splitHalfString (string: string): Array<string> {
  return [
    string.slice(0, Math.ceil(string.length / 2)),
    string.slice(Math.ceil(string.length / 2), string.length)
  ]
}

/**
 * Convert string to title case type
 * @param {String} text
 * @return {String}
 */
function convertTitleCase (input: string, trim = false): string {
  const text = input
  const lastIndex = text.length - 1
  const isCanTitleCase = text.length > 0 && text[0] !== ' '
  let result = ''

  if (isCanTitleCase) {
    const trimmedText = text.trim()
    result = trimmedText.split(' ').map((ele) => {
      return ele[0].toUpperCase() + ele.slice(1).toLowerCase()
    }).join(' ')

    const isLastIndexSpace = text[lastIndex] === ' '
    if (isLastIndexSpace && !trim) {
      result += ' ' // Add space to last string
    }
  }

  return result
}

/**
 * Extracting number from the string
 * @param {String} string
 * @return {String} number of string
 */
function extractNumber (string: string): string {
  return string.replace(/[^0-9]/g, '')
}

/**
 * Upercase first character of string
 * @param input
 * @returns - uppercased frist character string
 */
function uppercaseFirstString (input: string) {
  const firstLetter = input.slice(0, 1)
  return firstLetter.toUpperCase() + input.substring(1)
}

export {
  randomString,
  randomStringNumber,
  randomStringAlphaNumber,
  forEachString,
  reverseString,
  splitHalfString,
  convertTitleCase,
  extractNumber,
  uppercaseFirstString
}
