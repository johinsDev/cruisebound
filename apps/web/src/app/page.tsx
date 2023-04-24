import { SealingSearchParams, getSealing } from '@/sealing.service'
import { Inter } from 'next/font/google'
import { Pagination } from './(components)/pagination'
import { SelectSort } from './(components)/select-sort'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  searchParams: SealingSearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const sealing = await getSealing(searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SelectSort />

      {sealing.results.map((s) => (
        <div className="flex flex-col items-center justify-between p-4">
          <h1 className="text-4xl font-bold text-center">{s.name}</h1>
          <p>{s.departureDate}</p>
          <p>{s.ship.line.name}</p>
        </div>
      ))}

      <Pagination total={sealing.totalPages} />
    </main>
  )
}
