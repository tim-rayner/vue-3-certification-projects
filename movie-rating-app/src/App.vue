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
const mobileMenuToggled = ref(false);

const onRatingAvgChanged = (rating: number) => {
  avgRating.value = rating;
};
</script>

<template>
  <Navbar
    :avgRating="avgRating"
    @mobileMenuToggled="(val: boolean) => (mobileMenuToggled = val)"
  />

  <div
    class="layout overflow-x-hidden mt-16"
    :class="{ ' mt-72 md:mt-16': mobileMenuToggled }"
  >
    <Home @avg-rating-changed="onRatingAvgChanged" /> {{ mobileMenuToggled }}
  </div>
</template>

<style></style>
