<script setup lang="ts">
import { modalStore } from "~/store/modalStore";
const { characterSelectModal } = storeToRefs(modalStore());
</script>
<template>
  <UModal
    v-model="characterSelectModal"
    :ui="{
      background: '!bg-opacity-0',
      inner: 'hide-scrollbar',
      base: 'flex items-center justify-center',

      transition: {
        enter: 'ease-out duration-500',
        enterFrom: 'opacity-0 translate-y-10',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'ease-in duration-500',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 translate-y-10',
      },
      overlay: {
        transition: {
          enter: 'ease-out duration-500',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-500',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },
    }"
    fullscreen
  >
    <CharacterSelect />
  </UModal>
</template>
