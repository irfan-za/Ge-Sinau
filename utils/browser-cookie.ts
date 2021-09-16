/**
 * Set cookie to browser
 * @param cname
 * @param cvalue
 * @param expireday
 */
export function setCookie (cname: string, cvalue: string, expireday: number) {
  const d = new Date()
  d.setTime(d.getTime() + (expireday * 24 * 60 * 60 * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${encodeURIComponent(cvalue)};${expires};path=/`
}

/**
 * Get browser cookie value by key
 * @param cname
 * @returns
 */
export function getCookie (cname: string) {
  const name = `${cname}=`
  const decodedCookie = document.cookie
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length))
    }
  }

  return ''
}

/**
 * Delete browser cookie by key
 * @param cname
 */
export function deleteCookie (cname: string) {
  const now = new Date()
  const cvalue = getCookie(cname)
  now.setTime(now.getTime() - (30 * 24 * 60 * 60 * 1000))
  document.cookie = `${cname}=${encodeURIComponent(cvalue)};expires=${now.toUTCString()};path=/`
}
