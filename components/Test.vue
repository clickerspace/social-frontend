<script setup lang="ts">
import { cFetch } from "~/utils/helpers/cFetch";
import { userStore } from "~/store/user";

const getEnergy = async () => {
  const response = await cFetch(`/backend/test/give-energy`, {
    method: "GET",
  });
  const data = await response.json();
  userStore().assignUserData(data?.user);
};
</script>
<template>
  <PhoneLayout>
    <div class="flex h-full w-full items-center justify-center text-4xl">
      <UButton @click="getEnergy" class="bg-social-blue-300 text-black"
        >Get Energy</UButton
      >
    </div>
  </PhoneLayout>
</template>
