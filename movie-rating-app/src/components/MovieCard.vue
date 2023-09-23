<script setup lang="ts">
import type { Movie } from "@/types/movie-types";
import { StarIcon } from "@heroicons/vue/24/solid";
import { VueFlip } from "vue-flip";
import { computed, ref } from "vue";

const props = defineProps<{
  movie: Movie;
}>();

const movie = ref<Movie>(props.movie);

const stars = computed(() => {
  const numStars = Math.floor(props.movie.rating);
  return Array(numStars).fill("");
});

const purchase = () => {
  window.open("https://www.odeon.co.uk/", "_blank");
};

const watchTrailer = () => {
  window.open(movie.value.trailer, "_blank");
};

const shortenDescription = (lngDescription: string) => {
  return lngDescription.substring(0, 100) + "...";
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
            <div class="stars-wrapper flex flex-row my-1">
              <div class="star" v-for="star in stars">
                <StarIcon class="h-6 w-6 mr-1 text-yellow-400" :key="star" />
              </div>
            </div>
            <div class="description text-white text-lg">
              {{ shortenDescription(movie.description) }}
            </div>
          </div>
        </div>
      </template>
      <!-- BACK -->
      <template v-slot:back>
        <div class="content rounded-lg p-2 h-full relative shadow-xl">
          <div
            class="overlay absolute b-0 top-0 left-0 right-0 w-full h-full rounded-lg bg-black z-20 opacity-60"
          ></div>
          <div class="content z-50 relative">
            <div class="title text-4xl font-semibold text-white">
              {{ movie.name }}
            </div>
            <div class="stars-wrapper flex flex-row my-1">
              <div class="star" v-for="star in stars">
                <StarIcon class="h-6 w-6 mr-1 text-yellow-400" :key="star" />
              </div>
            </div>
            <div class="description text-white text-lg">
              {{ movie.description }}
            </div>
            <div class="purchase-btn-wrapper flex flex-row">
              <button
                class="purchase-btn bg-yellow-400 text-black rounded-lg px-4 py-2 mt-2"
                @click="purchase"
                v-if="movie.inTheaters"
              >
                Book Tickets
              </button>
              <button
                class="purchase-btn bg-orange-400 text-black rounded-lg px-4 py-2 mt-2"
                @click="watchTrailer"
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div></template
      >
    </VueFlip>
  </div>
</template>
<style scoped lang="scss"></style>
