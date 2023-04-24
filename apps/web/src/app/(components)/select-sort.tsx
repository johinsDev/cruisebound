'use client'

import { INVERTED_ORDER, SEALING_SORT_OPTIONS } from '@/config'
import { useNavigation } from '@/hooks/use-navigation'
import { Order } from '@/types'

export function SelectSort() {
  const { updateQueryParams, params } = useNavigation()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value

    const currentSort = params.get('sort')

    const order: Order = (params.get('order') as Order) || 'asc'

    updateQueryParams((params) => {
      params.set('sort', sort)

      params.set('order', sort === currentSort ? INVERTED_ORDER[order] : order)

      params.set('page', '1')
    })
  }

  return (
    <select
      name=""
      id=""
      onChange={handleSortChange}
      defaultValue={params.get('sort') || 'Pick a sorting option'}
    >
      <option>Pick a sorting option</option>
      {Object.entries(SEALING_SORT_OPTIONS).map(([key, value]) => (
        <option value={key} key={key}>
          {value}{' '}
          {params.get('order') === 'asc' && key === params.get('sort') && (
            <span className="text-green-500">↑</span>
          )}
        </option>
      ))}
    </select>
  )
}
