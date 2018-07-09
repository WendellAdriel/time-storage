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
 * Checks if the given namespace is valid
 *
 * @param {String} namespace
 */
export function isNamespaceValid (namespace) {
  const isValid =
    namespace !== undefined &&
    namespace !== null &&
    typeof namespace === 'string' &&
    namespace.length > 0

  if (!isValid) {
    console.error('You must provide a valid namespace for the time storage')
  }
  return isValid
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
