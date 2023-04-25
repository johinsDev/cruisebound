import logo from '@/app/(assets)/logo.svg'
import { Pagination } from '@/app/(components)/pagination'
import { Button } from '@/components/ui/button'
import { SealingSearchParams, getSealing } from '@/sealing.service'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { DepartureFilter } from './(components)/filters/departure'
import { SearchFilter } from './(components)/filters/search'

type HomeProps = {
  searchParams: SealingSearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const sealing = await getSealing(searchParams)

  return (
    <section className="grid grid-cols-12 gap-4 flex-1">
      <aside className="col-span-3 bg-secondary p-6 flex flex-col gap-8">
        <Button color={'secondary-light'} className="ml-auto">
          <ArrowLeft />
        </Button>

        <SearchFilter />

        <DepartureFilter />

        <Image src={logo} alt="Logo" className="mt-auto mx-auto" />
      </aside>

      <div className="col-span-9 p-6 pb-16 flex flex-col">
        <Button>Sealing</Button>
        <Button className="my-4">Sealing</Button>
        <Button color={'secondary'}>Sealing</Button>
        <Button color={'white'}>Sealing</Button>
        <div className="flex gap-4 items-center">
          {sealing.totalResults} trips found
          <Button size={'sm'}>Reset filters</Button>
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
