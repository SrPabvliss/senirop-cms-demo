import { useState } from 'react'

/**
 * Hook for data table pagination
 * Takes data array and returns pagination state + paginated data
 */
export const useDataTablePagination = <T>(data: T[]) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  return {
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    paginatedData,
  }
}
