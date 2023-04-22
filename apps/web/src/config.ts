import { NestedKeyOf, Order, Sealing } from './types'

export const API_URL =
  process.env.API_URL || 'https://sandbox.cruisebound-qa.com/sailings'

export const SEALING_SORT_OPTIONS: Partial<
  Record<NestedKeyOf<Sealing>, string>
> = {
  price: 'Price',
  departureDate: 'Departure Date',
  duration: 'Duration',
}

export const INVERTED_ORDER: Record<Order, Order> = {
  asc: 'desc',
  desc: 'asc',
}
