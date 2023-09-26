<script setup lang="ts">
import type { Movie } from "@/types/movie-types";
import { VueFlip } from "vue-flip";
import { ComputedRef, defineEmits, computed } from "vue";
import Button from "@/components/Button.vue";
import Pill from "./Pill.vue";
import Rating from "./Rating.vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["ratingChanged"]);

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
  <div class="w-[25vw] h-[35vh] relative mx-3">
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
          <div class="absolute bottom-[10%] right-[15%]">
            <div class="">
              <StarIcon
                class="h-20 w-20 mr-1 z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                :class="{
                  'text-yellow-500': movie.rating >= 1,
                  'text-gray-500': movie.rating < 1,
                }"
              />
              <p
                class="text-black z-50 text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {{ movie.rating === 0 ? "-" : movie.rating }}
              </p>
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
            <div class="title text-4xl font-semibold text-white">
              {{ movie.name }}
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
                size="md"
                label="Book Tickets"
                severity="primary"
                @click="purchase"
                v-if="movie.inTheaters"
              />
              <Button
                @click="watchTrailer"
                size="md"
                label="Watch Trailer"
                severity="secondary"
              />
            </div>
          </div></div
      ></template>
    </VueFlip>
  </div>
</template>
<style scoped lang="scss"></style>
