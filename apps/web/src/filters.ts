import { Sealing } from '@/types'

export interface Filter<T extends Record<string, any> = Record<string, any>> {
  apply: (sailing: Sealing, searchParams: T, data: Sealing[]) => boolean
}

export class AbstractFilter {
  constructor(private searchParams: SearchParamsFilter) {}

  protected getSearchParams() {
    return this.searchParams
  }

  protected getSearchParam(key: keyof SearchParamsFilter) {
    return this.getSearchParams()[key]
  }

  protected getSearchParamOrDefault(
    key: keyof SearchParamsFilter,
    defaultValue: any
  ) {
    const value = this.getSearchParam(key)

    return value || defaultValue
  }
}

export type SearchParamsDepartureDate = {
  departureDate?: string
}

export class DepartureDateFilter
  extends AbstractFilter
  implements Filter<SearchParamsDepartureDate>
{
  apply(sailing: Sealing) {
    const departureDate = this.getSearchParam('departureDate')

    if (!departureDate) {
      return true
    }

    // Validate if  departureDate is a valid date

    return sailing.departureDate === departureDate
  }
}

type SearchParamsLine = {
  line?: string
}

export class LineFilter
  extends AbstractFilter
  implements Filter<SearchParamsLine>
{
  apply(sailing: Sealing) {
    const line = this.getSearchParamOrDefault('line', '')

    return sailing.ship.line.name.toLowerCase().includes(line.toLowerCase())
  }
}

export type SearchParamsFilter = SearchParamsLine & SearchParamsDepartureDate
