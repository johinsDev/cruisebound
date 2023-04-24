'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { INVERTED_ORDER, SEALING_SORT_OPTIONS } from '@/config'
import { useNavigation } from '@/hooks/use-navigation'
import { cn } from '@/lib/tw'
import { Order } from '@/types'
import { ArrowDown, Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

export function SortList() {
  const { updateQueryParams, params } = useNavigation()

  const [open, setOpen] = React.useState(false)

  const currentSort = params.get('sort') || undefined

  const order: Order = (params.get('order') as Order) || 'asc'

  const handleSortChange = (sort: string) => {
    updateQueryParams((params) => {
      params.set('sort', sort)

      params.set('order', sort === currentSort ? INVERTED_ORDER[order] : order)

      params.set('page', '1')
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentSort
            ? Object.keys(SEALING_SORT_OPTIONS).find(
                (sortOption) => sortOption === currentSort
              )
            : 'Select option...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No sort options found.</CommandEmpty>
          <CommandGroup>
            {Object.entries(SEALING_SORT_OPTIONS).map(([sortOption, label]) => (
              <CommandItem
                key={sortOption}
                onSelect={() => {
                  handleSortChange(sortOption)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currentSort === sortOption ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {label}
                {sortOption === currentSort && (
                  <ArrowDown
                    className={cn('ml-auto h-4 w-4 transition', {
                      'transform rotate-180': order === 'desc',
                    })}
                  />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
