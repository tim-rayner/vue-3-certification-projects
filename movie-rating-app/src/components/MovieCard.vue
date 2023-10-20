<script setup lang="ts">
import type { Movie } from "@/types/movie-types";
import { VueFlip } from "vue-flip";
import { ComputedRef, computed } from "vue";
import Button from "primevue/button";
import Pill from "./Pill.vue";
import Rating from "./Rating.vue";

const emit = defineEmits(["ratingChanged", "movieUpdated", "movieDeleted"]);

const props = defineProps<{
  movie: Movie;
}>();

const purchase = () => {
  window.open("https://www.odeon.co.uk/", "_blank");
};

const watchTrailer = () => {
  window.open(props.movie.trailer, "_blank");
};

const shortenDescription = (lngDescription: string) => {
  return lngDescription.substring(0, 100) + "...";
};

const genres: ComputedRef<Array<string>> = computed(() => {
  return props.movie.genres;
});

const updateRating = (newRating: number) => {
  emit("ratingChanged", newRating);
};
</script>

<template>
  <div
    class="w-[75vw] h-[55vh] md:w-[45vw] md:h-[85vh] xl:w-[25vw] xl:h-[44vh] relative mx-3"
  >
    <VueFlip
      width="100%"
      height="100%"
      :active-hover="true"
      class="hover:cursor-pointer w-auto rounded-lg"
    >
      <!-- FRONT -->
      <template v-slot:front>
        <div class="content rounded-lg p-2 h-full relative shadow-xl">
          <div
            class="overlay absolute b-0 top-0 left-0 right-0 w-full h-full rounded-lg bg-black z-20 opacity-60"
          ></div>
          <div
            class="poster absolute b-0 top-0 left-0 right-0 w-full h-full rounded-lg bg-black z-10"
          >
            <img
              class="w-full h-full object-cover rounded-lg"
              :src="movie.image"
              alt="poster"
            />
          </div>

          <div class="content z-50 relative">
            <div class="title text-4xl font-semibold text-white">
              {{ movie.name }}
            </div>
            <Rating :rating="movie.rating" :functional="false" />
            <div class="flex flex-row">
              <div
                class="genres text-white text-sm my-2"
                v-for="genre in genres"
              >
                <Pill :label="genre" severity="primary" />
              </div>
            </div>
            <div class="description text-white text-sm">
              {{ shortenDescription(movie.description) }}
            </div>
          </div>
        </div>
      </template>
      <!-- BACK -->
      <template v-slot:back>
        <div
          class="content rounded-lg p-2 h-full relative shadow-xl bg-gray-800"
        >
          <div
            class="overlay absolute b-0 top-0 left-0 right-0 w-full h-full rounded-lg bg-black z-20 opacity-60"
          ></div>
          <div class="content z-50 relative">
            <div class="header flex">
              <div class="title text-4xl font-semibold text-white">
                {{ movie.name }}
              </div>
              <div class="flex ml-auto">
                <Button
                  @click="emit('movieUpdated', movie)"
                  icon="fa-solid fa-pen"
                  severity="warning"
                  rounded
                  outlined
                  aria-label="edit"
                  class="mx-1"
                />
                <Button
                  @click="emit('movieDeleted', movie)"
                  icon="fa fa-trash"
                  severity="danger"
                  rounded
                  aria-label="delete"
                  class="mx-1"
                />
              </div>
            </div>

            <Rating :rating="movie.rating" @update-rating="updateRating" />
            <div class="flex flex-row">
              <div
                class="genres text-white text-sm my-2"
                v-for="genre in genres"
              >
                <Pill :label="genre" severity="primary" />
              </div>
            </div>
            <div class="description text-white text-lg">
              {{ movie.description }}
            </div>
            <div class="purchase-btn-wrapper flex flex-col">
              <Button
                v-if="movie.inTheaters"
                @click="purchase"
                label="Book Tickets"
                severity="primary"
                class="m-1"
              />
              <Button
                @click="watchTrailer"
                label="Watch Trailer"
                severity="secondary"
                class="m-1"
              />
            </div>
          </div></div
      ></template>
    </VueFlip>
  </div>
</template>
<style scoped lang="scss"></style>
