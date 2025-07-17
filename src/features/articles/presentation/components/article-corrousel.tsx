import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import '@/app/layout/styles/corrousell.css'
import { Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const ArticleCorrousel = ({ photos }: { photos: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <Box
      className="embla"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {photos.map((photo) => (
            <div className="embla__slide" key={photo}>
              <img
                src={photo}
                alt="article"
                style={{ height: '500px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button
          className="embla__prev"
          onClick={scrollPrev}
          sx={{
            color: 'black',
          }}
        >
          <ArrowBackIcon /> Back
        </Button>
        <Button
          className="embla__next"
          onClick={scrollNext}
          sx={{
            color: 'black',
          }}
        >
          Next <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  )
}
