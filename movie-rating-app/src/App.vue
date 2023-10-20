<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Home from "./views/Home.vue";
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
// import { StarIcon } from "@heroicons/vue/24/solid";
const avgRating = ref<number>(0);
const onRatingAvgChanged = (rating: number) => {
  avgRating.value = rating;
};
</script>

<template>
  <Navbar :avgRating="avgRating" />
  <div class="layout overflow-x-hidden">
    <Home @avg-rating-changed="onRatingAvgChanged" />
  </div>
</template>

<style></style>
