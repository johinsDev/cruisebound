'use client'

import { Input } from '@/components/ui/input'
import { useNavigation } from '@/hooks/use-navigation'
import { useDebounceEffect } from 'ahooks'
import { useEffect, useState } from 'react'

export function SearchFilter() {
  const { params, updateQueryParams } = useNavigation()

  const [value, setValue] = useState(params.get('q'))

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

  useEffect(() => {
    if (params.get('q') === value) return

    setValue(params.get('q'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('q')])

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="q">Search</label>
      <Input
        placeholder="Search"
        value={value ?? ''}
        name="q"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
