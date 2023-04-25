import { getSailingsAPI } from './lib/api'
import { AbstractFilter, applyFilters } from './lib/filters'
import { applyPagination } from './lib/pagination'
import { applySort } from './lib/sort'
import { BaseSearchParams, Sealing } from './types'

export type SearchParamsDepartureDate = {
  departureDate?: string
}

export class DepartureDateFilter extends AbstractFilter<
  Sealing,
  SearchParamsDepartureDate
> {
  apply(sailing: Sealing) {
    const departureDate = this.getSearchParam('departureDate')

    if (!departureDate) {
      return true
    }

    return sailing.departureDate === departureDate
  }
}

type SearchParamsPort = {
  port?: string
}

export class PortFilter extends AbstractFilter<Sealing, SearchParamsPort> {
  apply(sailing: Sealing) {
    const line = this.getSearchParamOrDefault('port', '')

    if (!line) {
      return true
    }

    return sailing.itinerary
      .map((i) => i.toLowerCase())
      .includes(line.toLowerCase())
  }
}

type SearchParamsQ = {
  q?: string
}

export class QFilter extends AbstractFilter<Sealing, SearchParamsQ> {
  apply(sailing: Sealing) {
    const q = this.getSearchParamOrDefault('q', '')

    return JSON.stringify(sailing).toLowerCase().includes(q.toLowerCase())
  }
}

export type SearchParamsFilter = SearchParamsPort &
  SearchParamsDepartureDate &
  SearchParamsQ

export type SealingSearchParams = SearchParamsFilter & BaseSearchParams<Sealing>

export async function getDeparturePort() {
  const sailing = await getSailingsAPI()

  return sailing
    .map((sailing) => sailing.itinerary)
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
}

export async function getSealing(searchParams: SealingSearchParams) {
  const filters = [
    new DepartureDateFilter(searchParams),
    new PortFilter(searchParams),
    new QFilter(searchParams),
  ]

  let data = applyFilters(searchParams, filters, await getSailingsAPI())

  data = applySort<Sealing>(data, searchParams.sort, searchParams.order)

  const results = applyPagination(
    data,
    searchParams.page,
    searchParams.pageSize
  )

  return results
}
