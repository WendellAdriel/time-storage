const VALID_UNITS = ['minute', 'hour', 'day']

/**
 * Checks if the given timeUnit is valid
 * if not, the default time unit is used
 *
 * @param {String} timeUnit
 */
export function isUnitValid (timeUnit) {
  return VALID_UNITS.includes(timeUnit)
}

/**
 * Checks if the Local Storage is supported by the environment
 */
export function isLocalStorageSupported () {
  try {
    const testValue = 'time-storage-test'
    window.localStorage.setItem(testValue, testValue)
    window.localStorage.removeItem(testValue)
    return true
  } catch (err) {
    console.error(
      `Local Storage is not supported, Time Storage can't be initialized`
    )
    return false
  }
}
