import { Button } from '@/components/ui/button'
import { Sealing } from '@/types'
import dayjs from 'dayjs'
import { ArrowRight, DollarSign, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function formatDate(departureDate: string, returnDate: string) {
  if (!departureDate) return ''

  if (!dayjs(departureDate).isValid() || !dayjs(returnDate).isValid()) return ''

  const returnDay = dayjs(returnDate).format('DD')

  const departure = dayjs(departureDate).format('MMM DD - ${Return}, YYYY')

  return departure.replace('${Return}', returnDay)
}

function formatCurrency(value: number) {
  if (!value) return ''

  if (isNaN(Number(value))) return ''

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('$', '')
}

type SealingCardProps = {
  sealing: Sealing
}

export function SealingCard({ sealing: s }: SealingCardProps) {
  return (
    <Link href={`/sealing/${s.name}`}>
      <article className="flex border flex-wrap rounded-lg shadow-lg overflow-hidden w-full min-h-64">
        <div className="relative w-full h-40 xl:h-[inherit] xl:w-72 flex-shrink-0">
          <div className="absolute top-4 left-4 text-white z-10 bg-black/70 py-0.5 px-2 rounded">
            {formatDate(s.departureDate, s.returnDate)}
          </div>

          {s.ship.image && (
            <Image
              className="w-full h-full object-cover"
              src={s.ship.image}
              alt={s.ship.name}
            />
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-col p-4 flex-1">
            <div className="flex justify-between gap-2 items-center">
              <p className="flex-1 font-bold text-2xl">{s.name}</p>
              {s.ship.line.logo && (
                <Image
                  className="w-24 object-contain h-16"
                  src={s.ship.line.logo}
                  alt={s.ship.line.name}
                />
              )}
            </div>

            <div className="flex gap-4 items-center mt-4 text-lg font-medium text-neutral-500">
              <p>{s.region}</p>
              <p>4 nights</p>
              <p className="flex gap-2 items-center">
                <Star width={20} className="fill-yellow-500 text-yellow-500" />
                {s.ship.rating}
                <span className="text-sm text-neutral-400">
                  {s.ship.reviews} reviews
                </span>
              </p>
            </div>

            <div className="flex mt-4 gap-2 flex-wrap">
              {s.itinerary.map((i, index) => (
                <div key={index} className="flex items-center">
                  <p className="font-semibold">{i}</p>
                  {index < 3 && (
                    <ArrowRight className="text-primary ml-2" width={16} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex bg-neutral-100 w-full justify-end p-4 gap-4 items-center h-20 flex-shrink-0">
            <div className="font-semibold ">
              <p className="text-sm  text-neutral-400">Interior from</p>
              <p className="text-right text-xl">
                <DollarSign className="inline-block pb-2" width={16} />
                {formatCurrency(s.price)}
              </p>
            </div>
            <Button size={'lg'} className="px-2">
              See sailings
            </Button>
          </div>
        </div>
      </article>
    </Link>
  )
}
