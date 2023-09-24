<script setup lang="ts">
import { items } from "@/assets/movies.json";
import { computed, ref } from "vue";
import type { Movie } from "@/types/movie-types";
import MovieCard from "@/components/MovieCard.vue";

const movies = ref<Movie[]>(items as Movie[]);

const reviewedMovies = movies.value
  .filter(
    (movie) =>
      movie.name === "The Dark Knight" ||
      movie.name === "Tenet" ||
      movie.name === "The Godfather"
  )
  .reverse();

const topMovies = computed(() => {
  return movies.value.filter((movie) => movie.rating >= 4);
});
</script>
<template>
  <div class="">
    <h2 class="font-bold text-4xl m-4 mb-2">Popular</h2>
    <h4 class="font-normal text-lg m-4 mt-2 underline hover:cursor-pointer">
      View all...
    </h4>
    <div
      class="flex flex-row movies overflow-x-scroll no-scrollbar scrollbar-draggable pt-2"
    >
      <div v-for="movie in topMovies" class="">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
  <div class="my-">
    <h2 class="font-bold text-4xl m-4 mb-2">Recently reviewed</h2>

    <div
      class="flex flex-row movies overflow-x-scroll no-scrollbar scrollbar-draggable pt-2"
    >
      <div id="create-new">
        <div
          class="w-[25vw] h-[35vh] relative mx-3 border rounded-lg p-2 shadow-xl border-dashed items-center justify-center flex flex-col hover:cursor-pointer bg-gray-800"
        >
          <p class="text-2xl text-white">Add New</p>
        </div>
      </div>
      <div v-for="movie in reviewedMovies" class="">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>
