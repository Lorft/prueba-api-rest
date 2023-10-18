import { z } from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().positive(),
  poster: z.string().url({
    messsage: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Drama', 'Comedy', 'Action', 'Romance', 'Horror', 'Sci-Fi', 'Thriller', 'Adventure', 'Crime']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array'
    }
  ),
  rate: z.number().min(0).max(10).default(5)
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
