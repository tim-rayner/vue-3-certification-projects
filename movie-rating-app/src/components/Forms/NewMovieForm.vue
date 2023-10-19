<script setup lang="ts">
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputSwitch from "primevue/inputswitch";
import Chips from "primevue/chips";
import { useForm } from "vee-validate";
import { addMovieSchema } from "@/validation/create-rating-validation";
import Button from "primevue/button";
import Rating from "@/components/Rating.vue";
import { ref, watch } from "vue";
/**
 * @TODO add the following form items
 *  - Title
 *  - Description
 *  - Initial Rating
 *  - Image URL
 *  - Trailer URL
 *  - Release Date
 *  - Genre
 */

/**
 * @OTHERTODOS add the following nice to haves
 *  - add form validation
 *  - add CSV bulk upload
 *  - embed trailer in iframe
 */

const emit = defineEmits(["newMovie"]);

const { values, errors, defineInputBinds, validate, setFieldValue } = useForm({
  validationSchema: addMovieSchema,
  initialValues: {
    name: "",
    description: "",
    image: "",
    rating: 0,
    trailer: "",
    genres: [],
    inTheaters: false,
  },
});

const nameInput = defineInputBinds("name");
const descriptionInput = defineInputBinds("description");
const imageInput = defineInputBinds("image");
const ratingInput = defineInputBinds("rating");
const trailerInput = defineInputBinds("trailer");

const inTheatresVal = ref(false);
const genresVal = ref([]);

watch(
  () => inTheatresVal.value,
  (val) => {
    setFieldValue("inTheaters", val);
  }
);

watch(
  () => genresVal.value,
  (val) => {
    setFieldValue("genres", val);
  }
);

const updateRating = (rating: number) => {
  setFieldValue("rating", rating);
};

const onSubmit = async () => {
  const valid = await validate();
  console.log(values);
  if (valid.valid) emit("newMovie", values);
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!--TITLE-->
    <div class="flex flex-col gap-2">
      <label for="title"> Title</label>
      <InputText id="title" v-bind="nameInput" aria-describedby="title-help" />
      <small id="title-help" class="p-error"> {{ errors.name }}</small>
    </div>
    <!--DESCRIPTION-->
    <div class="flex flex-col gap-2">
      <label for="description">Description</label>
      <Textarea id="description" v-bind="descriptionInput" rows="3" cols="30" />
      <small id="description-help" class="p-error">
        {{ errors.description }}</small
      >
    </div>
    <!--Image-->
    <div class="flex flex-col gap-2">
      <label for="image">Image</label>
      <InputText id="image" v-bind="imageInput" aria-describedby="image-help" />
      <small id="image-help" class="p-error"> {{ errors.image }}</small>
    </div>
    <!--Trailer -->
    <div class="flex flex-col gap-2">
      <label for="trailer">Trailer link</label>
      <InputText
        id="trailer"
        v-bind="trailerInput"
        aria-describedby="trailer-help"
      />
      <small id="image-help" class="p-error"> {{ errors.trailer }}</small>
    </div>
    <!--Genres-->
    <div class="flex flex-col gap-2">
      <label for="genres">Genres</label>
      <small> input relevant genres seperated with commars</small>
      <div class="card p-fluid">
        <Chips v-model="genresVal" separator="," />
      </div>
      <small id="genres-help" class="p-error"> {{ errors.genres }}</small>
    </div>
    <!--IN THEATRES -->
    <div class="flex flex-col gap-2">
      <label for="genres">In Theatres </label>
      <InputSwitch v-model="inTheatresVal" />
    </div>

    <!--RATING-->
    <div class="flex flex-col gap-2">
      <label for="rating">Rating</label>
      <Rating
        :rating="ratingInput.value"
        :functional="true"
        @update-rating="updateRating"
      />
      <small id="rating-help" class="p-error"> {{ errors.rating }}</small>
    </div>

    <!-- Submit -->
    <Button type="submit" label="Submit" />
  </form>
</template>
