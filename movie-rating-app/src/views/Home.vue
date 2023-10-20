<script setup lang="ts">
import { items } from "@/assets/movies.json";
import { computed, ref, watch } from "vue";
import type { Movie } from "@/types/movie-types";
import MovieCard from "@/components/MovieCard.vue";
import PostMovieModal from "@/components/Modal.vue";
import MovieForm from "@/components/Forms/MovieForm.vue";

const emit = defineEmits(["avgRatingChanged"]);

const movies = ref<Movie[]>(items as Movie[]);
const selectedMovie = ref<Movie | undefined>();
const postMovieVisible = ref(false);

const reviewedMovies = computed(() =>
  movies.value.filter((movie) => movie.rated).reverse()
);

const topMovies = computed(() => {
  return movies.value.filter((movie) => movie.rating >= 0);
});

const ratingChanged = (movie: Movie, newRating: number) => {
  const targetIndex = movies.value.findIndex((m) => m.name === movie.name);
  if (targetIndex !== -1) {
    const targetMovie = movies.value[targetIndex];
    const newMovie = { ...targetMovie, rated: true, rating: newRating };
    movies.value.splice(targetIndex, 1, newMovie);
  }
};

const togglePostMovie = (newval: boolean) => {
  postMovieVisible.value = newval;
};

const handleNewMovie = (newMovie: Movie) => {
  movies.value.push(newMovie);
  if (newMovie.rating > 0) {
    ratingChanged(newMovie, newMovie.rating);
  }
  postMovieVisible.value = false;
};

//function to edit existing movie:
const handleMovieUpdate = (updatedMovie: Movie) => {
  const targetIndex = movies.value.findIndex(
    (movie) => movie.name === updatedMovie.name
  );
  selectedMovie.value = movies.value[targetIndex];
  postMovieVisible.value = true;
};

const updateMovie = (updatedMovie: Movie) => {
  //update the old movie with the new movie values
  const targetIndex = movies.value.findIndex(
    (movie) => movie.name === selectedMovie.value?.name
  );
  movies.value.splice(targetIndex, 1, updatedMovie);
  postMovieVisible.value = false;
};

//function to remove movie from movie list
const handleMovieDelete = (movie: Movie) => {
  const targetIndex = movies.value.findIndex((m) => m.name === movie.name);
  if (targetIndex !== -1) {
    movies.value.splice(targetIndex, 1);
  }
};

const myAvgRating = computed(() => {
  const ratedMovies = movies.value.filter((movie) => movie.rated);
  const totalRating = ratedMovies.reduce((acc, movie) => {
    return acc + movie.rating;
  }, 0);
  const avgRating = totalRating / ratedMovies.length;
  if (avgRating % 1 !== 0) {
    return avgRating.toFixed(1);
  } else {
    return avgRating;
  }
});

watch(
  () => reviewedMovies.value,
  () => {
    emit("avgRatingChanged", myAvgRating.value);
  }
);
</script>
<template>
  <div class="">
    <h2 class="font-bold text-4xl m-4 mb-2">Popular</h2>
    <h4 class="font-normal text-lg m-4 mt-2 underline hover:cursor-pointer">
      View all ({{ movies.length }})
    </h4>
    <div
      class="flex flex-row movies overflow-x-scroll no-scrollbar scrollbar-draggable pt-2 overflow-y-hidden"
    >
      <div v-for="movie in topMovies">
        <MovieCard
          :movie="movie"
          @rating-changed="(newRating) => ratingChanged(movie, newRating)"
          @movie-updated="handleMovieUpdate"
          @movie-deleted="handleMovieDelete"
        />
      </div>
    </div>
  </div>
  <div class="my-12">
    <h2 class="font-bold text-4xl m-4 mb-2">Recently reviewed</h2>

    <div
      class="flex flex-row movies overflow-x-scroll no-scrollbar scrollbar-draggable pt-2 overflow-y-hidden"
    >
      <div id="create-new" @click="postMovieVisible = true">
        <div
          class="w-[75vw] h-[55vh] md:w-[45vw] md:h-[85vh] xl:w-[25vw] xl:h-[44vh] relative mx-3 border rounded-lg p-2 shadow-xl border-dashed items-center justify-center flex flex-col hover:cursor-pointer bg-gray-800"
        >
          <p class="text-2xl text-white">Add New</p>
        </div>
      </div>
      <div v-for="movie in reviewedMovies">
        <MovieCard
          :movie="movie"
          @rating-changed="(newRating) => ratingChanged(movie, newRating)"
          @movie-updated="handleMovieUpdate"
          @movie-deleted="handleMovieDelete"
        />
      </div>
    </div>
  </div>

  <PostMovieModal
    @visible-changed="togglePostMovie"
    :visible="postMovieVisible"
    header="Add New Movie"
  >
    <MovieForm
      @new-movie="handleNewMovie"
      @movie-updated="updateMovie"
      :movieToUpdate="selectedMovie"
    />
  </PostMovieModal>
</template>
