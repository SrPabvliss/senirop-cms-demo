import type {
  BaseDataRow,
  DataTableBodyProps,
  Column,
} from '@/shared/types/data-table.types'
import { TableBody, TableRow, TableCell, CircularProgress } from '@mui/material'

/**
 * This is the body component for the data table
 * it will render the body for the data table
 * docs: https://mui.com/material-ui/react-table/
 */
export function DataTableBody<T extends BaseDataRow>({
  data,
  columns,
  loading,
  emptyMessage,
  onRowClick,
  sx,
}: DataTableBodyProps<T>) {
  const renderCellContent = (column: Column<T>, row: T, index: number) => {
    if (column.render) {
      return column.render(row[column.key as keyof T], row, index)
    }
    return row[column.key as keyof T] as React.ReactNode
  }

  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody sx={sx}>
      {data.map((row, index) => (
        <TableRow
          key={row.id}
          hover={!!onRowClick}
          onClick={(event) => {
            const target = event.target as HTMLElement
            const isRowOrCell =
              target.tagName === 'TD' ||
              target.tagName === 'TR' ||
              target.closest('td') !== null ||
              target.closest('tr') === event.currentTarget

            if (isRowOrCell && onRowClick) {
              onRowClick(row, index)
            }
          }}
          sx={{
            cursor: onRowClick ? 'pointer' : 'default',
            '&:hover': onRowClick
              ? {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              : {},
          }}
        >
          {columns.map((column) => (
            <TableCell
              key={String(column.key)}
              align={column.align}
              style={{ width: column.width }}
            >
              {renderCellContent(column, row, index)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
