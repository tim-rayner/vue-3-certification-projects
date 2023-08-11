<script setup lang="ts">
import type { Movie } from "@/types/movie-types";
import { StarIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import type { Ref } from "vue";

const props = defineProps<{
  movie: Movie;
}>();

const movie: Ref<Movie> = ref(props.movie);
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   rating: number;
//   genres: Genre[];
//   inTheaters: boolean;

const stars = computed(() => {
  const numStars = Math.floor(props.movie.rating);
  return Array(numStars).fill("");
});

const purchase = () => {
  console.log("purchase");
};
</script>

<template>
  <!-- <div class="card">
    <h2>{{ movie.name }}</h2>
    <p>{{ movie.description }}</p>
    <div class="ratings">
      <span v-for="star in stars">
        <StarIcon class="star" />
      </span>
    </div>
  </div> -->
  <div
    class="flip-card bg-transparent w-[25vw] h-[65vh] hover:cursor-pointer mx-2"
  >
    <div class="flip-card-inner relative w-full h-full transition-transform">
      <!-- FRONTSIDE -->
      <div
        class="flip-card-front box-shadow-md absolute flex flex-col justify-center w-full h-full backface-hidden border border-solid border-coral rounded-lg"
      >
        <div class="relative h-full">
          <img
            :src="movie.image"
            alt=""
            class="bg-image absolute top-0 left-0 right-0 h-full w-full object-cover rounded-lg z-10"
          />
          <div
            class="overlay absolute top-0 left-0 right-0 h-full w-full rounded-lg content-[''] bg-black z-20 opacity-20"
          ></div>
          <div class="content z-40 relative w-full h-full">
            <div class="ratings flex text-center items-center w-fit m-2">
              <span v-for="star in stars">
                <StarIcon class="star" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- BACKSIDE-->
      <div
        class="flip-card-back box-shadow-md absolute flex flex-col w-full h-full backface-hidden border border-solid border-coral rounded-lg"
      >
        <div class="ratings flex text-center items-center w-fit m-2">
          <span v-for="star in stars">
            <StarIcon class="star" />
          </span>
        </div>
        <div class="content mx-3 z-50">
          <h3 class="text-2xl">{{ movie.name }}</h3>
          <p class="text-lg">{{ movie.description }}</p>
          <button
            v-if="movie.inTheaters"
            @click="purchase()"
            class="button p-3 bg-purple-600 rounded-lg mt-3"
          >
            BOOK TICKETS
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.star {
  color: rgba(255, 217, 0, 0.986);
  width: 30px;
}
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background: linear-gradient(
    120deg,
    bisque 60%,
    rgb(255, 231, 222) 88%,
    rgb(255, 211, 195) 40%,
    rgba(255, 127, 80, 0.603) 48%
  );
  color: coral;
}

.flip-card-back {
  background: linear-gradient(
    120deg,
    rgb(255, 174, 145) 30%,
    coral 88%,
    bisque 40%,
    rgb(255, 185, 160) 78%
  );
  color: white;
  transform: rotateY(180deg);
}
</style>
