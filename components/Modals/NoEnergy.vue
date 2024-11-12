<script setup lang="ts">
import { modalStore } from "~/store/modalStore";

const isOpen = defineModel<boolean>("isOpen");

const handleClick = (activeKey: string) => {
  isOpen.value = false;
  modalStore().openMenuModal(activeKey);
};
</script>
<template>
  <UModal
    v-model="isOpen"
    :ui="{
      background: '!bg-opacity-0',
      inner: 'hide-scrollbar',
      base: 'flex items-center justify-center px-10',

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
    <div
      class="relative flex flex-col items-center justify-center gap-5 rounded-[32px] border border-social-red-100 bg-social-blue-500 p-7"
    >
      <UIcon
        name="material-symbols-light:close-rounded"
        size="50"
        class="absolute -top-12 right-2 cursor-pointer text-social-red-100"
        @click="isOpen = false"
      />
      <img src="@/assets/img/noenergy-modal.svg" alt="noenergy" />
      <h1 class="text-center text-3xl font-bold">Your energy is really low</h1>
      <p class="text-center text-lg">
        You need to find something to recharge your energy. You can buy
        something or ask for help from your friends.
      </p>
      <button
        class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-white bg-white text-social-blue-500 dark:border-white"
        @click="handleClick('market')"
      >
        <span>Browse the market</span>
      </button>
      <button
        class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-white bg-transparent text-white dark:border-white dark:text-white"
        @click="handleClick('contacts')"
      >
        <span>Ask your friend for a favor</span>
      </button>
    </div>
  </UModal>
</template>
