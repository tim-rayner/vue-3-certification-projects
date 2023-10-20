<script setup lang="ts">
import Dialog from "primevue/dialog";

interface Props {
  visible: boolean;
  header: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["visibleChanged"]);

const hideHandler = (value: boolean) => {
  if (!value) {
    emit("visibleChanged", value);
  }
};
</script>

<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    :header="header"
    :style="{ width: '50vw' }"
    @update:visible="hideHandler"
  >
    <slot />
  </Dialog>
</template>
