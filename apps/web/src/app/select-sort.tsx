'use client'

import { INVERTED_ORDER, SEALING_SORT_OPTIONS } from '@/config'
import { Order } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SelectSort() {
  const { push } = useRouter()

  const searchParams = useSearchParams()

  const pathname = usePathname()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value

    const params = new URLSearchParams(searchParams)

    const defaultOrder: Order = (searchParams.get('order') as Order) || 'asc'

    params.set('sort', sort)

    params.set(
      'order',
      sort === searchParams.get('sort')
        ? INVERTED_ORDER[defaultOrder]
        : defaultOrder
    )

    const url = pathname + '?' + params.toString()

    push(url)
  }

  return (
    <select
      name=""
      id=""
      onChange={handleSortChange}
      defaultValue={searchParams.get('sort') || 'Pick a sorting option'}
    >
      <option>Pick a sorting option</option>
      {Object.entries(SEALING_SORT_OPTIONS).map(([key, value]) => (
        <option value={key} key={key}>
          {value}{' '}
          {searchParams.get('order') === 'asc' &&
            key === searchParams.get('sort') && (
              <span className="text-green-500">↑</span>
            )}
        </option>
      ))}
    </select>
  )
}

// Todo: string line filter, select filter, date filter
// create hook to change filters URL
