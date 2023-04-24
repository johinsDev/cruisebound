import { getSailingsAPI } from './lib/api'
import { AbstractFilter, Filter, applyFilters } from './lib/filters'
import { applyPagination } from './lib/pagination'
import { applySort } from './lib/sort'
import { BaseSearchParams, Sealing } from './types'

export type SearchParamsFilter = SearchParamsLine & SearchParamsDepartureDate

export type SealingSearchParams = SearchParamsFilter & BaseSearchParams<Sealing>

function getShipLineList(data: Sealing[]) {
  return data
    .map((sailing) => sailing.ship.line.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
}

export async function getSealing(searchParams: SealingSearchParams) {
  const filters = [
    new DepartureDateFilter(searchParams),
    new LineFilter(searchParams),
  ]

  let data = applyFilters(searchParams, filters, await getSailingsAPI())

  const shipLineList = getShipLineList(data)

  data = applySort<Sealing>(data, searchParams.sort, searchParams.order)

  const results = applyPagination(
    data,
    searchParams.page,
    searchParams.pageSize
  )

  return {
    shipLineList,
    ...results,
  }
}

export type SearchParamsDepartureDate = {
  departureDate?: string
}

export class DepartureDateFilter
  extends AbstractFilter<SearchParamsDepartureDate>
  implements Filter<Sealing, SearchParamsDepartureDate>
{
  apply(sailing: Sealing) {
    const departureDate = this.getSearchParam('departureDate')

    if (!departureDate) {
      return true
    }

    return sailing.departureDate === departureDate
  }
}

type SearchParamsLine = {
  line?: string
}

export class LineFilter
  extends AbstractFilter<SearchParamsLine>
  implements Filter<Sealing, SearchParamsLine>
{
  apply(sailing: Sealing) {
    const line = this.getSearchParamOrDefault('line', '')

    return sailing.ship.line.name.toLowerCase().includes(line.toLowerCase())
  }
}
