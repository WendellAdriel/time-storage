import 'mock-local-storage'
import dayjs from 'dayjs'
import TimeStorage from '../../src/storage'

const TEST_NAMESPACE = 'time-storage-test'
const storage = new TimeStorage(TEST_NAMESPACE)

global.afterEach(global.localStorage.clear)

global.test('buildKey() must return the right key for the time storage', () => {
  global.expect(storage.buildKey('my_key')).toBe(`${TEST_NAMESPACE}_my_key`)
})

global.test(
  'get() without default value must return null when no item is set',
  () => {
    global.expect(storage.get('test')).toBe(null)
  }
)

global.test(
  'get() with default value must return default value when no item is set',
  () => {
    global.expect(storage.get('test', 'default')).toBe('default')
  }
)

global.test(
  'get() must return the item value when item is set and valid',
  () => {
    const storeObject = {
      valid_until: dayjs().add(1, 'day'),
      data: 'my_data'
    }
    global.localStorage.setItem(
      `${TEST_NAMESPACE}_value`,
      JSON.stringify(storeObject)
    )

    global.expect(storage.get('value')).toBe('my_data')
  }
)

global.test(
  'get() without default value must return null when item is set and invalid',
  () => {
    const storeObject = {
      valid_until: dayjs().subtract(1, 'hour'),
      data: 'my_data'
    }
    global.localStorage.setItem(
      `${TEST_NAMESPACE}_value`,
      JSON.stringify(storeObject)
    )

    global.expect(storage.get('value')).toBe(null)
  }
)

global.test(
  'get() with default value must return default when item is set and invalid',
  () => {
    const storeObject = {
      valid_until: dayjs().subtract(1, 'hour'),
      data: 'my_data'
    }
    global.localStorage.setItem(
      `${TEST_NAMESPACE}_value`,
      JSON.stringify(storeObject)
    )

    global.expect(storage.get('value', 'default_value')).toBe('default_value')
  }
)

global.test(
  'set() must set an item to the local storage using the given namespace',
  () => {
    storage.set('my_key', 'my_value')

    global.expect(storage.get('my_key')).toBe('my_value')
  }
)

global.test('remove() must remove an item from the local storage', () => {
  storage.set('my_key', 'my_value')
  storage.remove('my_key')

  global.expect(storage.get('my_key')).toBe(null)
})

global.test('getAll() must return all items from the time storage', () => {
  storage.set('my_key', 'my_value')
  storage.set('my_second_key', 'my_second_value')

  global.expect(storage.getAll().length).toBe(2)
})

global.test('clear() must remove all items from the time storage', () => {
  storage.set('my_key', 'my_value')
  storage.set('my_second_key', 'my_second_value')
  storage.clear()

  global.expect(storage.getAll().length).toBe(0)
})
