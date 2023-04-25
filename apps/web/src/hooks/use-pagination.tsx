import { range } from '@/utils/range'
import { useMemo } from 'react'
import { useNavigation } from './use-navigation'

export const SIBLINGS = 1
export const BOUNDARIES = 1
export const DOTS = 'dots'

export function usePatination({ total: _total }: { total: number }) {
  const { params } = useNavigation()

  const total = Math.max(Math.trunc(_total), 0)

  const activePage = Math.min(
    Number(params.get('page')) || 1,
    Math.max(total, 1)
  )

  const paginationRange = useMemo(() => {
    const totalPageNumbers = SIBLINGS * 2 + 3 + BOUNDARIES * 2

    if (totalPageNumbers >= _total) {
      return range(1, _total)
    }

    const leftSiblingIndex = Math.max(activePage - SIBLINGS, BOUNDARIES)

    const rightSiblingIndex = Math.min(
      activePage + SIBLINGS,
      _total - BOUNDARIES
    )

    const shouldShowLeftDots = leftSiblingIndex > BOUNDARIES + 2

    const shouldShowRightDots = rightSiblingIndex < _total - (BOUNDARIES + 1)

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = SIBLINGS * 2 + BOUNDARIES + 2
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_total - (BOUNDARIES - 1), _total),
      ]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = BOUNDARIES + 1 + 2 * SIBLINGS
      return [
        ...range(1, BOUNDARIES),
        DOTS,
        ...range(_total - rightItemCount, _total),
      ]
    }

    return [
      ...range(1, BOUNDARIES),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total - BOUNDARIES + 1, _total),
    ]
  }, [_total, activePage])

  return {
    paginationRange,
    activePage,
    total,
  }
}
