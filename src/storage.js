import dayjs from 'dayjs'

const DEFAULT_VALIDITY = 30
const DEFAULT_TIME_UNIT = 'minute'

/**
 * Class that encapsulates all the actions for the local storage
 */
export default class {
  /**
   * Creates a new instance of the storage class
   *
   * @param {String} namespace
   * @param {Number} defaultValidity
   * @param {String} defaultTimeUnit
   */
  constructor (
    namespace,
    defaultValidity = DEFAULT_VALIDITY,
    defaultTimeUnit = DEFAULT_TIME_UNIT
  ) {
    this.namespace = namespace
    this.defaultValidity = defaultValidity
    this.defaultTimeUnit = defaultTimeUnit
    this.storage = window.localStorage
  }

  /**
   * Gets an item from this time storage or returns
   * the default value when no item is found
   * or if the item is not valid
   *
   * @param {String} key
   * @param {any} defaultValue
   * @returns {any}
   */
  get (key, defaultValue = null) {
    const value = this.storage.getItem(this.buildKey(key))
    if (value === undefined || value === null) return defaultValue

    const parsed = JSON.parse(value)
    if (dayjs().isAfter(dayjs(parsed.valid_until))) {
      this.remove(key)
      return defaultValue
    }

    return parsed.data
  }

  /**
   * Sets an item to this time storage
   *
   * @param {String} key
   * @param {any} value
   * @param {Number} validFor
   * @param {String} timeUnit
   */
  set (
    key,
    value,
    validFor = this.defaultValidity,
    timeUnit = this.defaultTimeUnit
  ) {
    const storeObject = {
      valid_until: dayjs().add(validFor, timeUnit),
      data: value
    }

    this.storage.setItem(this.buildKey(key), JSON.stringify(storeObject))
  }

  /**
   * Removes an item from this time storage
   *
   * @param {String} key
   */
  remove (key) {
    this.storage.removeItem(this.buildKey(key))
  }

  /**
   * Removes all items from this time storage
   */
  clear () {
    Object.keys(this.storage)
      .filter(key => key.startsWith(this.namespace))
      .map(key => this.storage.removeItem(key))
  }

  /**
   * Builds the storage key
   *
   * @param {String} key
   * @returns {String}
   */
  buildKey (key) {
    return `${this.namespace}_${key}`
  }
}
