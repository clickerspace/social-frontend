<script setup lang="ts">
const emit = defineEmits(["update:key"]);
export interface Props {
  title?: string;
}
const { title } = defineProps<Props>();
</script>
<template>
  <div class="relative flex h-full w-full flex-col gap-2 px-5 pt-5">
    <h1 class="capitalize text-[#D4D4D4]">{{ title }}</h1>
    <slot />
    <div
      class="absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 justify-center py-3"
      @click="
        () => {
          emit('update:key');
        }
      "
    >
      <button
        class="flex h-2 w-48 items-center justify-center gap-2 rounded-[10px] bg-[#99999970] backdrop-blur-sm"
      ></button>
    </div>
  </div>
</template>
