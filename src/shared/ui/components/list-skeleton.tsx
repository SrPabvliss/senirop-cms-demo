import { Box, Skeleton, Stack } from '@mui/material'

export const LoadingListSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" width={400} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
      </Stack>

      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="10%" />
        </Stack>

        {Array.from({ length: 5 }).map((_, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{
              p: 2,
              borderBottom: index < 4 ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="15%" />
            <Skeleton variant="circular" width={40} height={20} />
            <Skeleton variant="circular" width={24} height={24} />
          </Stack>
        ))}
      </Box>
    </Box>
  )
}
