import { TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import type { SearchInputProps } from '@/shared/types/search-input.types'
import { useSearchInput } from '@/shared/hooks/use-search-input'

/**
 * Input component with debounce functionality
 * Can be re used for any feature that needs a search input
 */
export const SearchInput = ({
  placeholder = 'Search...',
  value: controlledValue,
  onDebouncedChange,
  debounceDelay = 300,
  fullWidth = true,
  size = 'small',
  variant = 'outlined',
}: SearchInputProps) => {
  const { value, onChange } = useSearchInput({
    value: controlledValue,
    debounceDelay,
    onDebouncedChange,
  })

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
        },
      }}
    />
  )
}
