import logo from '@/app/(assets)/logo.svg'
import { Pagination } from '@/app/(components)/pagination'
import { Button, buttonVariants } from '@/components/ui/button'
import { getSailingsAPI } from '@/lib/api'
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
import { FilterList } from './(components)/filters/filter-list'
import { PortsFilter } from './(components)/filters/port'
import { SearchFilter } from './(components)/filters/search'
import { SealingCard } from './(components)/sealing-card'
import { SortList } from './(components)/sort-list'

type HomeProps = {
  searchParams: SealingSearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const sailings = await getSailingsAPI()

  const sealing = await getSealing(searchParams, sailings)

  const ports = await getDeparturePort()

  return (
    <section className="grid grid-cols-12 gap-4 flex-1">
      <aside className=" hidden lg:col-span-4 xl:col-span-3 lg:flex bg-secondary p-6 flex-col gap-8 h-screen">
        <Button color={'secondary-light'} className="ml-auto">
          <ArrowLeft />
        </Button>

        <SearchFilter />

        <DepartureFilter />

        <PortsFilter options={ports} />

        <Image src={logo} alt="Logo" className="mt-auto mx-auto" />
      </aside>

      <div className="col-span-12 lg:col-span-8 xl:col-span-9 p-6 pb-16 flex flex-col overflow-hidden max-h-screen">
        <FilterList ports={ports} />

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

        <div className="flex-1 flex flex-col gap-8 my-8 overflow-auto">
          {sealing.results.map((s, index) => (
            <SealingCard key={index} sealing={s} />
          ))}
        </div>

        <Pagination total={sealing.totalPages} />
      </div>
    </section>
  )
}
