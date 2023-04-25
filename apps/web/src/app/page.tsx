import logo from '@/app/(assets)/logo.svg'
import { Pagination } from '@/app/(components)/pagination'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tw'
import {
  SealingSearchParams,
  getDeparturePort,
  getSealing,
} from '@/sealing.service'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DepartureFilter } from './(components)/filters/departure'
import { PortsFilter } from './(components)/filters/port'
import { SearchFilter } from './(components)/filters/search'
import { SortList } from './(components)/sort-list'

type HomeProps = {
  searchParams: SealingSearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const sealing = await getSealing(searchParams)

  const ports = await getDeparturePort()

  return (
    <section className="grid grid-cols-12 gap-4 flex-1">
      <aside className="col-span-3 bg-secondary p-6 flex flex-col gap-8">
        <Button color={'secondary-light'} className="ml-auto">
          <ArrowLeft />
        </Button>

        <SearchFilter />

        <DepartureFilter />

        <PortsFilter options={ports} />

        <Image src={logo} alt="Logo" className="mt-auto mx-auto" />
      </aside>

      <div className="col-span-9 p-6 pb-16 flex flex-col">
        <div className="flex gap-4 items-center font-semibold justify-end">
          Sort by
          <SortList />
        </div>

        <div className="flex gap-4 items-center font-semibold">
          {sealing.totalResults} trips found
          <Link
            className={cn(
              buttonVariants({
                color: 'white',
                size: 'sm',
              })
            )}
            href={{
              pathname: '/',
            }}
          >
            Reset filters
          </Link>
        </div>

        <div className="flex-1">
          {sealing.results.map((s, index) => (
            <div
              className="flex flex-col items-center justify-between p-4"
              key={index}
            >
              <h1 className="text-4xl font-bold text-center">{s.name}</h1>
              <p>{s.departureDate}</p>
              <p>{s.ship.line.name}</p>
            </div>
          ))}
        </div>

        <Pagination total={sealing.totalPages} />
      </div>
    </section>
  )
}
