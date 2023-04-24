export function applyPagination<T extends object>(
  data: T[],
  page?: number,
  pageSize?: number
) {
  const totalResults = data.length

  pageSize ??= 10

  pageSize = Math.min(Math.max(pageSize, 1), 100)

  const totalPages = Math.max(Math.trunc(totalResults / pageSize), 1)

  page ??= 1

  page = Math.min(Math.max(page, 1), totalPages)

  return {
    results: data.slice((page - 1) * pageSize, page * pageSize),
    totalPages,
    page,
    pageSize,
    nextPage: page < totalPages ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    totalResults,
  }
}
