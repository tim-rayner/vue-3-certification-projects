<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
  },
  severity: {
    type: String,
    default: "primary",
  },
});

enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

const buttonSizeClasses = {
  [ButtonSize.sm]: "px-2 py-1 text-sm",
  [ButtonSize.md]: "px-4 py-2 text-md",
  [ButtonSize.lg]: "px-6 py-3 text-lg",
};

const size = computed(() => {
  //pair passed in size with enum value
  return ButtonSize[props.size as keyof typeof ButtonSize];
});
</script>

<template>
  <button :class="`btn btn-${severity} ${buttonSizeClasses[size]} my-1`">
    {{ label }}
  </button>
</template>
