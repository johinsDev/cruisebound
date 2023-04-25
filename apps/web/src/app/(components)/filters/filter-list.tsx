'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useBoolean } from 'ahooks'
import { DepartureFilter } from './departure'
import { PortsFilter, PortsFilterProps } from './port'
import { SearchFilter } from './search'

type FilterListProps = {
  ports: PortsFilterProps['options']
}

export function FilterList({ ports }: FilterListProps) {
  const [open, { toggle }] = useBoolean(false)

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button className="lg:hidden mb-8">Filter sailings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filters sailings</DialogTitle>
          <DialogDescription>
            Select the filters you want to apply to your search
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SearchFilter />

          <DepartureFilter />

          <PortsFilter options={ports} />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={toggle}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
