<script setup lang="ts">
import { items } from "@/assets/movies.json";
import { ref } from "vue";
import type { Movie } from "@/types/movie-types";

const movies = ref<Movie[]>(items as Movie[]);
</script>
<template>
  <div v-for="movie in movies">
    <h2>{{ movie.name }}</h2>
    <p>{{ movie.description }}</p>
    <p>{{ movie.rating }}</p>
  </div>
</template>
