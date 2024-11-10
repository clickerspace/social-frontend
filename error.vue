<script setup lang="ts">
import type { NuxtError } from "#app";
const { RETURN_URL } = useRuntimeConfig().public;

const props = defineProps({
  error: Object as () => NuxtError,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <h1>{{ error?.statusCode }}</h1>
    <h3>{{ error?.message }}</h3>
    <UButton @click="handleError">{{ $t("retry") }}</UButton>
    <!-- <UButton
      :to="RETURN_URL"
      :label="'Telegram'"
      icon="mdi:telegram"
      color="blue"
    ></UButton> -->
  </NuxtLayout>
</template>
