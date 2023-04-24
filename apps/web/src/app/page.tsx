import { Pagination } from '@/app/(components)/pagination'
import { SortList } from '@/app/(components)/sort-list'
import { SealingSearchParams, getSealing } from '@/sealing.service'
import { DepartureFilter } from './(components)/filters/departure'
import { SearchFilter } from './(components)/filters/search'

type HomeProps = {
  searchParams: SealingSearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const sealing = await getSealing(searchParams)

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <SortList />

      <SearchFilter />

      <DepartureFilter />

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

      <Pagination total={sealing.totalPages} />
    </section>
  )
}
