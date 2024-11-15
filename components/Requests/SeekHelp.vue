<script setup lang="ts">
import { modalStore } from "~/store/modalStore";
</script>
<template>
  <div class="radial-bg flex w-full flex-col p-3">
    <div
      class="flex w-full flex-col gap-3 text-sm font-semibold leading-[normal] text-white dark:text-white"
    >
      <div class="flex w-full items-center justify-between">
        <span class="w-28 whitespace-nowrap"> Need a Hand?</span>
        <UIcon
          name="ic:sharp-question-mark"
          size="24"
          class="cursor-pointer text-social-purple-100"
        />
      </div>
      <button
        class="flex w-full items-center justify-center rounded-md border-[1px] border-[#BDBDBD] border-[solid] bg-[radial-gradient(169.72%_89.02%_at_80.91%_-10.53%,_rgba(255,_255,_255,_0.50)_0%,_rgba(175,_175,_175,_0.50)_100%)] px-2 py-1 py-2 font-semibold"
        @click="modalStore().changeActiveKey('contacts')"
      >
        Request Help
      </button>
    </div>
  </div>
</template>
