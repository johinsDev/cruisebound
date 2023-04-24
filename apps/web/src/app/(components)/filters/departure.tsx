'use client'

import { Calendar } from '@/components/ui/calendar'
import { useNavigation } from '@/hooks/use-navigation'
import { useDebounceEffect } from 'ahooks'
import dayjs from 'dayjs'
import React from 'react'

export function DepartureFilter() {
  const { params, updateQueryParams } = useNavigation()

  const [date, setDate] = React.useState<Date | undefined>(
    dayjs(params.get('departureDate')).isValid()
      ? dayjs(params.get('departureDate')).toDate()
      : undefined
  )

  useDebounceEffect(
    () => {
      if (!date) return

      updateQueryParams((params) => {
        // if date is valid date
        if (date && dayjs(date).isValid()) {
          params.set('departureDate', dayjs(date).format('YYYY-MM-DD'))
        } else {
          params.delete('departureDate')
        }
      })
    },
    [date],
    { wait: 500 }
  )

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
