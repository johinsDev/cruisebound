import get from 'lodash.get'
import { NestedKeyOf, Order } from '../types'

// Sort for sealing and other models
export function applySort<T extends object>(
  data: T[],
  sort?: NestedKeyOf<T>,
  order?: Order
) {
  if (!sort) {
    return data
  }

  return [...data].sort((a, b) => {
    const aSelector = get(a, sort)?.toString()

    const bSelector = get(b, sort)?.toString()

    if (!aSelector || !bSelector) {
      return 0
    }

    if (order === 'asc') {
      return new Intl.Collator('en').compare(
        aSelector.toString(),
        bSelector.toString()
      )
    }

    return new Intl.Collator('en').compare(
      bSelector.toString(),
      aSelector.toString()
    )
  })
}
