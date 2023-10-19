import * as yup from "yup";

const titleRules = yup.string().required().min(3).max(30);
const descriptionRules = yup.string().required().min(3).max(100);
const ratingRules = yup.number().required().min(1).max(5);
const trailerRules = yup.string().required();
const genreRules = yup.array().min(1).required();
const inTheatersRules = yup.boolean().required();
const imageRules = yup.string().required();

export const addMovieSchema = yup.object({
  name: titleRules,
  description: descriptionRules,
  rating: ratingRules,
  image: imageRules,
  trailer: trailerRules,
  genres: genreRules,
  inTheaters: inTheatersRules,
});
