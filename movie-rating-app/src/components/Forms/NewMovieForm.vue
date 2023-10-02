<script setup lang="ts">
import { Genre } from "@/enums/movie-enums";
import { Movie } from "@/types/movie-types";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputSwitch from "primevue/inputswitch";
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { addMovieSchema } from "@/validation/create-rating-validation";
import Button from "primevue/button";
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

const { values, errors, defineInputBinds, validate } = useForm({
  validationSchema: addMovieSchema,
});

const nameInput = defineInputBinds("name");
const descriptionInput = defineInputBinds("description");
const imageInput = defineInputBinds("image");
const ratingInput = defineInputBinds("rating");
const genresInput = defineInputBinds("genres");
const inTheatresInput = defineInputBinds("inTheaters");
const trailerInput = defineInputBinds("trailer");

const onSubmit = async () => {
  const valid = await validate();
  if (valid.valid) console.log("submitting");
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
      <Textarea id="description" v-bind="descriptionInput" rows="5" cols="30" />
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
      <InputText
        id="genres"
        v-bind="genresInput"
        aria-describedby="genres-help"
      />
      <small id="genres-help" class="p-error"> {{ errors.genres }}</small>
    </div>
    <!--IN THEATRES -->
    <div class="flex flex-col gap-2">
      <label for="genres">In Theatres </label>
      <InputSwitch v-bind="inTheatresInput" />
    </div>

    <!--RATING-->
    <div class="flex flex-col gap-2">
      <label for="rating">Rating</label>
      <InputText
        id="rating"
        type="number"
        max="5"
        min="0"
        v-bind="ratingInput"
        aria-describedby="rating-help"
      />
      <small id="rating-help" class="p-error"> {{ errors.rating }}</small>
    </div>

    <!-- Submit -->
    <Button type="submit" label="Submit" />
  </form>
</template>
