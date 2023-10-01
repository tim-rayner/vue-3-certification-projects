<script setup lang="ts">
import { Genre } from "@/enums/movie-enums";
import { Movie } from "@/types/movie-types";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputSwitch from "primevue/inputswitch";

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

const newMovie: Movie = {
  name: "",
  description: "",
  image: "",
  rating: 0,
  genres: [] as Genre[],
  inTheaters: false,
  trailer: "",
  rated: false,
};

const errors: Object = {};
</script>

<template>
  <form>
    <!--TITLE-->
    <div class="flex flex-col gap-2">
      <label for="title"> Title</label>
      <InputText
        id="title"
        v-model="newMovie.name"
        aria-describedby="title-help"
      />
      <small id="title-help"> {{ errors.title }}</small>
    </div>
    <!--DESCRIPTION-->
    <div class="flex flex-col gap-2">
      <label for="description">Description</label>
      <Textarea
        id="description"
        v-model="newMovie.description"
        rows="5"
        cols="30"
      />
      <small id="description-help"> {{ errors.description }}</small>
    </div>
    <!--Image-->
    <div class="flex flex-col gap-2">
      <label for="image">Image</label>
      <InputText
        id="image"
        v-model="newMovie.image"
        aria-describedby="image-help"
      />
      <small id="image-help"> {{ errors.image }}</small>
    </div>
    <!--Trailer -->
    <div class="flex flex-col gap-2">
      <label for="trailer">Trailer link</label>
      <InputText
        id="trailer"
        v-model="newMovie.trailer"
        aria-describedby="trailer-help"
      />
      <small id="image-help"> {{ errors.trailer }}</small>
    </div>
    <!--Genres-->
    <div class="flex flex-col gap-2">
      <label for="genres">Genres</label>
      <InputText
        id="genres"
        v-model="newMovie.genres"
        aria-describedby="genres-help"
      />
      <small id="genres-help"> {{ errors.genres }}</small>
    </div>
    <!--IN THEATRES -->
    <div class="flex flex-col gap-2">
      <label for="genres">In Theatres</label>
      <InputSwitch v-model="newMovie.inTheaters" />
    </div>
    <!--RATING-->
    <div class="flex flex-col gap-2">
      <label for="rating">Rating</label>
      <InputText
        id="rating"
        type="number"
        v-model="newMovie.rating"
        aria-describedby="rating-help"
      />
      <small id="rating-help"> {{ errors.rating }}</small>
    </div>
  </form>
</template>
