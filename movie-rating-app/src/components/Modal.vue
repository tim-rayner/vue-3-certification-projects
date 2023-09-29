<script setup lang="ts">
import Dialog from "primevue/dialog";

const emit = defineEmits(["visibleChanged"]);

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();

const test = () => {
  console.log("test 1 works");
  emit("visibleChanged", false);
};
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="props.visible"
      modals
      header="Header"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
      :draggable="true"
      @hide="test"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  </div>
</template>
