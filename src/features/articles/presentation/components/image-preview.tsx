import { Box, Card, CardContent, Typography } from '@mui/material'

export const ImagePreview = ({ photos }: { photos: string[] }) => {
  return (
    <>
      <Typography variant="body1">Images</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          my: 2,
        }}
      >
        {photos.map((photo, index) => (
          <Card key={`${photo}-${index}`} sx={{ width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <img
                src={photo}
                alt="article"
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />

              <Typography variant="body1">{`Imagen ${index + 1}`}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  )
}
