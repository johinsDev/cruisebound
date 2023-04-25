'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useNavigation } from '@/hooks/use-navigation'
import { cn } from '@/lib/tw'
import { useDebounceEffect } from 'ahooks'
import dayjs from 'dayjs'
import { CalendarIcon, X } from 'lucide-react'
import React from 'react'

export function DepartureFilter() {
  const { params, updateQueryParams } = useNavigation()

  const [open, setOpen] = React.useState(false)

  const [date, setDate] = React.useState<Date | undefined>(
    dayjs(params.get('departureDate')).isValid()
      ? dayjs(params.get('departureDate')).toDate()
      : undefined
  )

  useDebounceEffect(
    () => {
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
    <div className="flex flex-col gap-1">
      <label htmlFor="q">Departure Date</label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            color={'white'}
            className={cn('w-full justify-start text-left relative')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? dayjs(date).format('YYYY-MM-DD') : <span>Pick a date</span>}
            {!!date && (
              <button
                className="absolute right-0 top-0 w-10 h-10 grid place-content-center"
                onClick={(e) => {
                  e.stopPropagation()

                  setDate(undefined)
                }}
              >
                <X />
              </button>
            )}{' '}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
