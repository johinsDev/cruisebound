import { getSailingsAPI } from './api'
import {
  DepartureDateFilter,
  Filter,
  LineFilter,
  SearchParamsFilter,
} from './filters'
import { applySort } from './sort'
import { Sealing, SearchParamsSort } from './types'

export type SealingSearchParams = SearchParamsFilter & SearchParamsSort<Sealing>

export async function getSealing(searchParams: SealingSearchParams) {
  const data = applyFilters(searchParams, await getSailingsAPI())
  console.log(applySort<Sealing>(data, searchParams.sort, searchParams.order))
  return {
    results: applySort<Sealing>(data, searchParams.sort, searchParams.order),
  }
}

// Filter for sealing
export function applyFilters(
  searchParams: SealingSearchParams,
  data: Sealing[]
) {
  const filters: Filter[] = [
    new DepartureDateFilter(searchParams),
    new LineFilter(searchParams),
  ]

  return data.filter((sailing) =>
    filters.every((filter) => filter.apply(sailing, searchParams, data))
  )
}
