<script setup lang="ts">
import { useLocalTime } from "~/utils/helpers/useLocalTime";

const localTime = useLocalTime();
</script>
<template>
  <PhoneLayout>
    <div class="flex h-full w-full items-center justify-center text-4xl">
      {{ localTime }}
    </div>
  </PhoneLayout>
</template>
