import type { SxProps, Theme } from '@mui/material'

/**
 * Add to have an id to the data table rows
 */
export interface BaseDataRow {
  id: string | number
}

/**
 * Generic column configuration for the data table
 */
export interface Column<T> {
  key: keyof T | 'actions'
  label: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T, index: number) => React.ReactNode
}

/**
 * Main DataTable props for the data table
 */
export interface DataTableProps<T extends BaseDataRow> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  onRowClick?: (row: T, index: number) => void
  pagination?: boolean
  emptyMessage?: string
  headerSx?: SxProps<Theme>
  bodySx?: SxProps<Theme>
  paginationSx?: SxProps<Theme>
  sx?: SxProps<Theme>
}

/**
 * Header component props
 */
export interface DataTableHeadProps<T> {
  columns: Column<T>[]
  sx?: SxProps<Theme>
}

/**
 * Body component props for the data table
 */
export interface DataTableBodyProps<T> {
  data: T[]
  columns: Column<T>[]
  loading: boolean
  emptyMessage?: string
  onRowClick?: (row: T, index: number) => void
  sx?: SxProps<Theme>
}

/**
 * Pagination component props for the data table
 */
export interface DataTablePaginationProps {
  colSpan: number
  count: number
  rowsPerPage: number
  page: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  sx?: SxProps<Theme>
}
