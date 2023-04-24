'use client'

import { Input } from '@/components/ui/input'
import { useNavigation } from '@/hooks/use-navigation'
import { useDebounceEffect } from 'ahooks'
import { useState } from 'react'

export function SearchFilter() {
  const { params, updateQueryParams } = useNavigation()

  const [value, setValue] = useState(params.get('q') || '')

  useDebounceEffect(
    () => {
      updateQueryParams((params) => {
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
    <Input
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
