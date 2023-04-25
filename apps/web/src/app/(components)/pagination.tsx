'use client'

import { useNavigation } from '@/hooks/use-navigation'
import { DOTS, usePatination } from '@/hooks/use-pagination'
import { cn } from '@/lib/tw'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export type PaginationProps = {
  total: number
}

export function Pagination({ total }: PaginationProps) {
  const { pathname, query } = useNavigation()

  const { paginationRange, activePage } = usePatination({ total })

  return (
    <nav>
      <ul className="inline-flex items-center bg-neutral-100 h-12 rounded font-semibold">
        <li>
          <Link
            aria-disabled={activePage <= 1}
            href={{
              pathname,
              query: {
                ...query,
                page: activePage - 1 > 0 ? activePage - 1 : 1,
              },
            }}
            className="text-primary w-10 grid place-content-center"
          >
            <ChevronLeft />
          </Link>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={pageNumber}
                className="w-10 grid place-content-center text-gray-400"
              >
                <span>...</span>
              </li>
            )
          }

          return (
            <li
              key={pageNumber}
              className={cn(
                'w-8 h-8 rounded-full grid place-content-center transition-all',
                {
                  'bg-white': activePage === pageNumber,
                }
              )}
            >
              <Link
                href={{
                  pathname,
                  query: {
                    ...query,
                    page: pageNumber,
                  },
                }}
              >
                {pageNumber}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            aria-disabled={activePage >= total}
            href={{
              pathname,
              query: {
                ...query,
                page: activePage + 1 > total ? total : activePage + 1,
              },
            }}
            className="text-primary w-10 grid place-content-center"
          >
            <ChevronRight />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
