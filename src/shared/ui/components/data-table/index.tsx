import type {
  BaseDataRow,
  DataTableProps,
} from '@/shared/types/data-table.types'
import { Paper, Table, TableContainer } from '@mui/material'
import { DataTableHead } from './data-table-header'
import { DataTableBody } from './data-table-body'
import { DataTablePagination } from './data-table-pagination'
import { useDataTablePagination } from '@/shared/hooks/use-data-table-pagination'

/**
 * This is the main data table component
 * it will render the data table with the given props
 * docs: https://mui.com/material-ui/react-table/
 */
export function DataTable<T extends BaseDataRow>({
  data,
  columns,
  loading = false,
  onRowClick,
  pagination = false,
  emptyMessage = 'No data available',
  headerSx,
  bodySx,
  paginationSx,
  sx,
}: DataTableProps<T>) {
  const {
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    paginatedData,
  } = useDataTablePagination(data)

  return (
    <TableContainer component={Paper} sx={sx}>
      <Table>
        <DataTableHead columns={columns} sx={headerSx} />

        <DataTableBody
          data={paginatedData}
          columns={columns}
          loading={loading}
          emptyMessage={emptyMessage}
          onRowClick={onRowClick}
          sx={bodySx}
        />

        {pagination && (
          <DataTablePagination
            colSpan={columns.length}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            sx={paginationSx}
          />
        )}
      </Table>
    </TableContainer>
  )
}
