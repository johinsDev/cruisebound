import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useNavigation() {
  const params = useSearchParams()

  const pathname = usePathname()

  const router = useRouter()

  const updateQueryParams = (cb: (params: URLSearchParams) => void) => {
    const newParams = new URLSearchParams(params)

    cb(newParams)

    router.push(`${pathname}?${newParams.toString()}`)
  }

  return {
    params,
    query: Object.fromEntries(params),
    pathname,
    router,
    updateQueryParams,
  }
}
