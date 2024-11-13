<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
import { modalStore } from "~/store/modalStore";
const { story } = storeToRefs(userStore());
const emit = defineEmits(["mounted"]);
onMounted(() => {
  nextTick(() => {
    emit("mounted");
  });
});
const bg = ref('bg-[url("@/assets/img/game-bg.png")]');

const { DISABLED_BACKEND } = useRuntimeConfig().public;
const applySelectionAndContinueStory = async (selection: string) => {
  story.value = await userStore().continueStory(
    story.value.brief,
    story.value.next,
    selection,
  );
  console.log(story.value);
  showOptions.value = false;
  showNext.value = false;
  console.log(story.value);
};
const showNext = ref(false);
const showOptions = ref(false);
const moveToNextAndShowOptions = async (value: boolean) => {
  showNext.value = value;
  showOptions.value = value;
};

onMounted(async () => {
  await userStore().getStory();
});
const isOpen = ref(false);
</script>
<template>
  <div
    class="flex h-[calc(100dvh+1px)] w-full select-none items-end bg-cover bg-center bg-no-repeat"
    :class="bg"
  >
    <ModalsNoEnergy v-model:is-open="isOpen" />
    <div
      class="hide-scrollbar flex max-h-[80%] w-full flex-col gap-5 bg-gradient-to-t from-[#6ec1eb70] from-10% via-[#37679280] via-80% to-[#323c6600] p-5"
    >
      <h1 class="font-bold text-white dark:text-white">{{ story?.key }}</h1>
      <p class="overflow-y-auto">
        {{ showNext ? story?.next : story?.brief }}
      </p>
      <div v-if="showOptions" v-for="options in story?.options">
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
          @click="
            story?.next
              ? moveToNextAndShowOptions(false)
              : modalStore().openMenuModal('menu')
          "
        >
          <UIcon
            v-if="story?.next"
            name="material-symbols:arrow-back-ios"
            size="20"
          />
          <span>{{ story.next ? "BACK" : "CHECK PHONE" }}</span>
        </button>
        <button
          v-if="story?.next"
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
          @click="moveToNextAndShowOptions(true)"
        >
          <span>NEXT</span>
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
