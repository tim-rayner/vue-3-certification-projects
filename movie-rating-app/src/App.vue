<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Home from "./views/Home.vue";
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
// import { StarIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <Navbar />
  <div class="layout overflow-x-hidden">
    <Home />
  </div>
</template>

<style></style>
