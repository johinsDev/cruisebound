export interface Filter<
  TData extends object,
  TSearch extends Record<string, any> = Record<string, any>
> {
  apply: (sailing: TData, searchParams: TSearch, data: TData[]) => boolean
}

export class AbstractFilter<TSearch extends object> {
  constructor(private searchParams: TSearch) {}

  protected getSearchParams() {
    return this.searchParams
  }

  protected getSearchParam(key: keyof TSearch) {
    return this.getSearchParams()[key]
  }

  protected getSearchParamOrDefault(key: keyof TSearch, defaultValue: any) {
    const value = this.getSearchParam(key)

    return value || defaultValue
  }
}

export function applyFilters<TData extends object, TSearch extends object>(
  searchParams: TSearch,
  filters: Filter<TData, TSearch>[],
  data: TData[]
) {
  return data.filter((sailing) =>
    filters.every((filter) => filter.apply(sailing, searchParams, data))
  )
}
