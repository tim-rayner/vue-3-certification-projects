<script setup lang="ts">
import { items } from "@/assets/movies.json";
import { ref } from "vue";
import type { Movie } from "@/types/movie-types";
import MovieCard from "@/components/MovieCard.vue";

const movies = ref<Movie[]>(items as Movie[]);
</script>
<template>
  <div class="flex movies my-44">
    <div v-for="movie in movies" class="">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>
