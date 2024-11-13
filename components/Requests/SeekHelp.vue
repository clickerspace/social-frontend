<script setup lang="ts">
import { modalStore } from "~/store/modalStore";
</script>
<template>
  <div class="radial-bg flex w-full flex-col p-3">
    <div class="flex w-full flex-col gap-3 text-white dark:text-white">
      <div class="flex w-full items-center justify-between">
        <span class="w-28 whitespace-nowrap"> Need a Hand?</span>
        <UIcon
          name="ic:sharp-question-mark"
          size="24"
          class="cursor-pointer text-social-purple-100"
        />
      </div>
      <button
        class="flex w-full items-center justify-center rounded-md border border-white bg-[#BDBDBD] px-2 py-1 dark:border-white"
        @click="modalStore().changeActiveKey('contacts')"
      >
        Request Help
      </button>
    </div>
  </div>
</template>
