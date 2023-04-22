export interface Sealing {
  price: number
  name: string
  ship: Ship
  itinerary: string[]
  region: string
  departureDate: string
  returnDate: string
  duration: number
}

export interface Ship {
  name: string
  rating: number
  reviews: number
  image?: string
  line: Line
}

export interface Line {
  logo?: string
  name: string
}

// Source: https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
// Get nested keys of an object as a string literal union type
// Example:
// type NestedKeys = NestedKeyOf<Sealing>
// const nestedKeys: NestedKeys = 'ship.name'
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type Order = 'asc' | 'desc'

export type SearchParamsSort<T extends object> = {
  sort?: NestedKeyOf<T>
  order?: Order
}
