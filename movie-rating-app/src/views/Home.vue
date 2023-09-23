<script setup lang="ts">
import { items } from "@/assets/movies.json";
import { ref } from "vue";
import type { Movie } from "@/types/movie-types";
import MovieCard from "@/components/MovieCard.vue";

const movies = ref<Movie[]>(items as Movie[]);
</script>
<template>
  <h2 class="font-bold text-4xl m-4 mb-2">Popular</h2>
  <h4 class="font-normal text-lg m-4 mt-2 underline hover:cursor-pointer">
    View all...
  </h4>
  <div
    class="flex flex-row movies overflow-x-scroll no-scrollbar scrollbar-draggable pt-2"
  >
    <div v-for="movie in movies" class="">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>
