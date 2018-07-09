import TimeStorage from './storage'
import * as Helpers from './helpers'

/**
 * Time Storage Factory function to create a new Time Storage
 * with the given values
 *
 * @param {String} namespace
 * @param {Number} defaultValidity
 * @param {String} defaultTimeUnit
 */
export default function (
  namespace,
  defaultValidity = undefined,
  defaultTimeUnit = undefined
) {
  if (!Helpers.isLocalStorageSupported()) return null
  if (!Helpers.isNamespaceValid(namespace)) return null

  const timeUnit =
    defaultTimeUnit && Helpers.isUnitValid(defaultTimeUnit)
      ? defaultTimeUnit
      : undefined
  return new TimeStorage(namespace, defaultValidity, timeUnit)
}
