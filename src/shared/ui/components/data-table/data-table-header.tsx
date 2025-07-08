import type { DataTableHeadProps } from '@/shared/types/data-table.types'
import { TableCell, TableHead, TableRow } from '@mui/material'

/**
 * This is the header component for the data table
 * it will render the header for the data table
 * docs: https://mui.com/material-ui/react-table/
 */
export function DataTableHead<T>({ columns }: DataTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={String(column.key)}
            align={column.align}
            style={{ width: column.width }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
