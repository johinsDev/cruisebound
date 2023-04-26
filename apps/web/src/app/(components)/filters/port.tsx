'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigation } from '@/hooks/use-navigation'
import { useDebounceEffect } from 'ahooks'
import { useEffect, useState } from 'react'

export type PortsFilterProps = {
  options: string[]
}

export function PortsFilter({ options }: PortsFilterProps) {
  const { params, updateQueryParams } = useNavigation()

  const [value, setValue] = useState(params.get('port'))

  useDebounceEffect(
    () => {
      if (value === params.get('port')) return

      updateQueryParams((params) => {
        params.set('page', '1')

        if (value) {
          params.set('port', value)
        } else {
          params.delete('port')
        }
      })
    },
    [value],
    { wait: 500 }
  )

  useEffect(() => {
    if (params.get('port') === value) return

    setValue(params.get('port'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('port')])

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="port">Departure port</label>

      <Select name="port" onValueChange={setValue} value={value ?? undefined}>
        <SelectTrigger>
          <SelectValue placeholder="Ship names" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
