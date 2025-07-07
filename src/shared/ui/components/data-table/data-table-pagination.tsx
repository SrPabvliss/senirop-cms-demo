import type { DataTablePaginationProps } from '@/shared/types/data-table.types'
import { TableFooter, TableRow, TablePagination } from '@mui/material'

/**
 * This is the pagination component for the data table
 * it will render the pagination for the data table
 * docs: https://mui.com/material-ui/react-table/
 */
export function DataTablePagination({
  colSpan,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: DataTablePaginationProps) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableRow>
    </TableFooter>
  )
}
