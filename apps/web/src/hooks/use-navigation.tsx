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

// Husky lint staged 1hr
// github action deploy 1hr
// design 1hr
// select, input, button 1hr
// docs 1hr
// skeleton loading 1hr
// framer motion and nprogress 1hr
// unit test 1hr
