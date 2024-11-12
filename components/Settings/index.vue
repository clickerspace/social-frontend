<script setup lang="ts">
const emit = defineEmits(["update:key"]);

const credistModal = ref(false);
const startCredits = () => {
  credistModal.value = !credistModal.value;
};
</script>
<template>
  <div class="relative flex h-full w-full flex-col gap-2 px-5 pt-5">
    <ModalsCredits v-model:is-open="credistModal" />

    <h1 class="text-[#D4D4D4]">Settings</h1>
    <button class="settings-button h-10">Tutorial</button>
    <button class="settings-button h-10" @click="startCredits()">
      Credits
    </button>
    <button class="settings-button h-10">Watch Story</button>
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
<style>
.settings-button {
  border-radius: 6px;
  border: 1px solid #702f9b;
  background: radial-gradient(
    169.72% 89.02% at 80.91% -10.53%,
    rgba(175, 119, 184, 0.5) 0%,
    rgba(66, 0, 124, 0.5) 100%
  );
  backdrop-filter: blur(10px);
}
</style>
