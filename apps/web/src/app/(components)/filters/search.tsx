'use client'

import { Input } from '@/components/ui/input'
import { useNavigation } from '@/hooks/use-navigation'
import { useDebounceEffect } from 'ahooks'
import { useState } from 'react'

export function SearchFilter() {
  const { params, updateQueryParams } = useNavigation()

  const [value, setValue] = useState(params.get('q') ?? undefined)

  useDebounceEffect(
    () => {
      if (value === params.get('q')) return

      updateQueryParams((params) => {
        params.set('page', '1')

        if (value) {
          params.set('q', value)
        } else {
          params.delete('q')
        }
      })
    },
    [value],
    { wait: 500 }
  )

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="q">Search</label>
      <Input
        placeholder="Search"
        value={value}
        name="q"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
