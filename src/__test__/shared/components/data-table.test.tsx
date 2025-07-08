import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTable } from '@/shared/ui/components/data-table'
import type { Column } from '@/shared/types/data-table.types'

/**
 * Mock data
 */
const mockData = [
  { id: '1', name: 'Test Item 1', status: 'active' },
  { id: '2', name: 'Test Item 2', status: 'inactive' },
]

const mockColumns: Column<(typeof mockData)[0]>[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
]

/**
 * DataTable component should be tested as it is the base for the data table in the app
 * It is one of the most critical parts of the app
 */
describe('DataTable Component', () => {
  test('should render table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Test Item 1')).toBeInTheDocument()
    expect(screen.getByText('Test Item 2')).toBeInTheDocument()
  })

  test('should show loading spinner when loading', () => {
    render(<DataTable data={[]} columns={mockColumns} loading={true} />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('should show empty message when no data', () => {
    const emptyMessage = 'No items found'

    render(
      <DataTable data={[]} columns={mockColumns} emptyMessage={emptyMessage} />
    )

    expect(screen.getByText(emptyMessage)).toBeInTheDocument()
  })

  test('should render custom content using render function', () => {
    const columnsWithRender: Column<(typeof mockData)[0]>[] = [
      { key: 'name', label: 'Name' },
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span data-testid="custom-status">{value.toUpperCase()}</span>
        ),
      },
    ]

    render(<DataTable data={mockData} columns={columnsWithRender} />)

    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('INACTIVE')).toBeInTheDocument()
  })

  test('should call onRowClick when row is clicked', () => {
    const mockOnRowClick = vi.fn()

    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        onRowClick={mockOnRowClick}
      />
    )

    const firstDataRow = screen.getByText('Test Item 1').closest('tr')
    firstDataRow?.click()

    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0], 0)
  })

  test('should show pagination when enabled', () => {
    render(
      <DataTable data={mockData} columns={mockColumns} pagination={true} />
    )

    expect(screen.getByText('Rows per page:')).toBeInTheDocument()
  })

  test('should not show pagination when disabled', () => {
    render(
      <DataTable data={mockData} columns={mockColumns} pagination={false} />
    )

    expect(screen.queryByText('Rows per page:')).not.toBeInTheDocument()
  })
})
