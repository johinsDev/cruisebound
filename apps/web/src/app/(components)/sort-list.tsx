'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SEALING_SORT_OPTIONS } from '@/config'
import { useNavigation } from '@/hooks/use-navigation'
import { Order } from '@/types'
import { useMemo } from 'react'

export function SortList() {
  const { updateQueryParams, params } = useNavigation()

  const options = useMemo(() => {
    const OPTIONS: Record<string, string> = {}

    Object.entries(SEALING_SORT_OPTIONS).forEach(([sortOption, label]) => {
      if (!sortOption || !label) return

      OPTIONS[`${sortOption}-asc`] = label
      OPTIONS[`${sortOption}-desc`] = label
    })

    return OPTIONS
  }, [])

  const currentSort = params.get('sort') || undefined

  const value = currentSort
    ? `${currentSort}-${params.get('order')}`
    : undefined

  const handleSortChange = (sort: string, order?: Order) => {
    updateQueryParams((params) => {
      params.set('sort', sort)

      params.set('order', order ?? 'asc')

      params.set('page', '1')
    })
  }

  return (
    <Select
      onValueChange={(value) => {
        const [sort, order = 'asc'] = value.split('-')

        handleSortChange(sort, order as Order)
      }}
      value={value}
    >
      <SelectTrigger className="w-[160px] h-12">
        <SelectValue placeholder="Sort options" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(options).map(([sortOption, label]) => (
            <SelectItem value={sortOption} key={sortOption}>
              {label}
              <span className="block  text-xs text-gray-400 font-semibold">
                {sortOption.includes('desc') ? 'Highest first' : 'Lowest first'}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
