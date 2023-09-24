<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <span :class="`rounded-xl pill pill-${severity} mr-1 p-1`"> {{ label }}</span>
</template>
