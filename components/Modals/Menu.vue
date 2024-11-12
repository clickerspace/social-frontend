<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen");
const bg = ref('bg-[url("@/assets/img/modal-phone-bg.png")]');
</script>
<template>
  <UModal
    v-model="isOpen"
    fullscreen
    :ui="{
      background: '!bg-opacity-0',
      inner: 'hide-scrollbar',

      transition: {
        enter: 'ease-out duration-500',
        enterFrom: 'opacity-0 translate-y-10',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'ease-in duration-500',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 translate-y-10',
      },
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
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
  >
    <div class="flex w-full justify-center py-3">
      <button
        class="flex h-2 w-48 items-center justify-center gap-2 rounded-[10px] bg-[#99999950] backdrop-blur-sm"
        @click="isOpen = false"
      ></button>
    </div>
    <div
      class="relative h-full w-full rounded-t-[42px] border-x-[10px] border-t-[10px] border-black shadow-xl"
    >
      <div
        class="absolute left-1/2 top-0 z-50 h-[18px] w-[148px] translate-x-[-50%] rounded-b-[1rem] bg-black"
      ></div>
      <div
        class="absolute left-[-105px] top-[124px] z-50 h-[46px] w-[4px] rounded-l-lg bg-black"
      ></div>
      <div
        class="absolute left-[-105px] top-[178px] z-50 h-[46px] w-[4px] rounded-l-lg bg-black"
      ></div>
      <div
        class="absolute right-[-105px] top-[142px] z-50 h-[64px] w-[4px] rounded-r-lg bg-black"
      ></div>
      <div
        class="hide-scrollbar relative h-full w-full overflow-y-scroll rounded-t-[32px] bg-cover bg-center bg-no-repeat pt-6"
        :class="bg"
      >
        <TabMenu />
      </div>
    </div>
  </UModal>
</template>
