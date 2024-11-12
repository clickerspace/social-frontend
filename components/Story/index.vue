<script setup lang="ts">
import { userStore } from "~/store/user";

const emit = defineEmits(["mounted"]);
onMounted(() => {
  nextTick(() => {
    emit("mounted");
  });
});
const bg = ref('bg-[url("@/assets/img/game-bg.png")]');
const story = ref();
const { DISABLED_BACKEND } = useRuntimeConfig().public;
const applySelectionAndContinueStory = async (selection: string) => {
  if (DISABLED_BACKEND) {
    story.value = {
      key: "Story",
      brief: "This is a story",
      options: ["Option 1", "Option 2"],
      next: "This is the next story",
    };
    return;
  }
  story.value = await userStore().continueStory(story.value, selection);
  console.log(story.value);
};
onMounted(async () => {
  if (DISABLED_BACKEND) {
    return;
  }
  story.value = await userStore().getStory();
});
</script>
<template>
  <div
    class="flex h-[calc(100dvh+1px)] w-full select-none items-end bg-cover bg-center bg-no-repeat"
    :class="bg"
  >
    <div
      class="hide-scrollbar flex max-h-[80%] w-full flex-col gap-5 bg-gradient-to-t from-[#6ec1eb70] from-10% via-[#37679280] via-80% to-[#323c6600] p-5"
    >
      <h1 class="font-bold text-white dark:text-white">{{ story?.key }}</h1>
      <p class="overflow-y-auto">
        {{ story?.next || story?.brief }}
      </p>
      <div v-for="options in story?.options">
        <button
          class="flex w-full items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
          @click="applySelectionAndContinueStory(options)"
        >
          <span class="">{{ options }}</span>
          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
      </div>
      <div class="flex w-full items-center justify-center gap-5">
        <button
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border"
          :class="
            true
              ? 'border-[#999999] text-[#999999]'
              : 'border-white text-white dark:border-white dark:text-white'
          "
        >
          <UIcon name="material-symbols:arrow-back-ios" size="20" />
          <span>BACK</span>
        </button>
        <button
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
        >
          <span class="">NEXT</span>
          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.linear-bg {
  opacity: 0.96;
  background: linear-gradient(180deg, #6ec1eb 4%, #376792 14.5%, #323c66 54.1%);
  filter: blur(50px);
}
</style>
