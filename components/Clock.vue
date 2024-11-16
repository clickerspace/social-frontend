<script setup lang="ts">
import { useLocalTime } from "~/utils/helpers/useLocalTime";
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";

const { localTime } = storeToRefs(userStore());
</script>
<template>
  <PhoneLayout>
    <div class="flex h-full w-full items-center justify-center text-4xl">
      {{ localTime }}
    </div>
  </PhoneLayout>
</template>
