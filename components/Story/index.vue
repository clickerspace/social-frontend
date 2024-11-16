<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
import { modalStore } from "~/store/modalStore";
import { locations } from "~/utils/constants/locations";
import getKeyAndGiveRandomRelatedImg from "~/utils/helpers/gameBgImgs";
import type { LocationKey } from "~/utils/helpers/gameBgImgs";
import getKeyAndGiveRandomRelatedCharacterImg, {
  type CharacterKeys,
} from "~/utils/helpers/characterImgs";
const { story, location, gameLoading, showTutorial } = storeToRefs(userStore());
const { tutorialModal } = storeToRefs(modalStore());
const emit = defineEmits(["mounted"]);
onMounted(() => {
  nextTick(() => {
    emit("mounted");
  });
});

const { DISABLED_BACKEND } = useRuntimeConfig().public;

const storySplitted = ref([""]);
const splitTextIntoMaxCharsArray = (text: string, maxChars: number) => {
  const lines: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + maxChars;

    // Ensure endIndex does not exceed text length
    if (endIndex >= text.length) {
      lines.push(text.slice(startIndex).trim());
      break;
    }

    // Look for the nearest period before or after maxChars
    const nextDotIndex = text.indexOf(".", endIndex);
    const prevDotIndex = text.lastIndexOf(".", endIndex);

    if (
      prevDotIndex > startIndex &&
      (nextDotIndex === -1 ||
        endIndex - prevDotIndex <= nextDotIndex - endIndex)
    ) {
      // If there's a period before endIndex and it's closer than the one after
      endIndex = prevDotIndex + 1;
    } else if (nextDotIndex !== -1) {
      // Otherwise, take the next period after endIndex
      endIndex = nextDotIndex + 1;
    }

    // Add the trimmed chunk to the lines array
    lines.push(text.slice(startIndex, endIndex).trim());

    // Move startIndex to the next position after the period
    startIndex = endIndex;
  }

  return lines;
};

const CHAR_COUNT = 200;
const loadingStory = ref(false);
const applySelectionAndContinueStory = async (selection: string) => {
  loadingStory.value = true;
  story.value = await userStore().continueStory(
    story.value.brief,
    story.value.next,
    selection,
  );

  storySplitted.value = splitTextIntoMaxCharsArray(
    story.value.brief,
    CHAR_COUNT,
  );
  storySplitted.value = [
    ...storySplitted.value,
    ...splitTextIntoMaxCharsArray(story.value?.next || "", CHAR_COUNT),
  ];

  showOptions.value = false;
  activeIndex.value = 0;
  console.log(story.value);
  loadingStory.value = false;
};

const showNext = ref(false);
const showOptions = ref(false);
const moveToNextAndShowOptions = async (value: boolean) => {
  if (value) {
    activeIndex.value = Math.min(
      activeIndex.value + 1,
      storySplitted.value.length - 1,
    );
    if (activeIndex.value === storySplitted.value.length - 1) {
      showOptions.value = true;
    }
  } else {
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
    if (activeIndex.value <= storySplitted.value.length - 1) {
      showOptions.value = false;
    }
  }
};

onMounted(async () => {
  await userStore().getStory();

  gameLoading.value = false;

  storySplitted.value = splitTextIntoMaxCharsArray(
    story.value.brief,
    CHAR_COUNT,
  );
  storySplitted.value = [
    ...storySplitted.value,
    ...splitTextIntoMaxCharsArray(story.value.next, CHAR_COUNT),
  ];
  if (showTutorial.value) {
    modalStore().setSplashModal(true);
  }
});
const activeIndex = ref(0);
const isOpen = ref(false);
</script>
<template>
  <div
    v-if="!gameLoading"
    class="flex h-[calc(100dvh+1px)] w-full select-none items-end"
  >
    <img
      :src="getKeyAndGiveRandomRelatedImg(location as LocationKey)"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
    <ModalsNoEnergy v-model:is-open="isOpen" />
    <ModalsTutorial />
    <ModalsSplash />
    <ModalsCharacterSelect />
    <img
      :src="
        getKeyAndGiveRandomRelatedCharacterImg(
          userStore().selectedCharacter as CharacterKeys,
        )
      "
      class="absolute -left-10 bottom-0 z-10 h-[75%] w-auto object-contain"
    />
    <img
      v-for="(otherCharacter, i) in userStore().otherCharacters"
      alt="other characters"
      :src="
        getKeyAndGiveRandomRelatedCharacterImg(otherCharacter as CharacterKeys)
      "
      :key="i"
      :class="[
        'absolute bottom-0 z-10 h-[75%] w-auto object-contain',
        {
          '-right-10': i === 0,
          'right-[10%]': i === 1,
          'right-[30%]': i === 2,
          'right-[50%]': i === 3,
        },
      ]"
    />
    <div
      class="hide-scrollbar z-10 flex max-h-[80%] w-full flex-col gap-5 bg-gradient-to-t from-[#6ec1eb70] from-10% via-[#37679280] via-80% to-[#323c6600] p-5"
    >
      <h1 v-if="!showOptions" class="font-bold text-white dark:text-white">
        {{ locations.find((loc) => loc.key === location)?.name }}
      </h1>

      <button
        class="flex w-fit items-center justify-center gap-[3px] rounded-[10px] bg-white p-2.5 text-[#4891FF]"
        @click="moveToNextAndShowOptions(false)"
        v-else
      >
        <UIcon
          class="flex-shrink-0"
          name="material-symbols:arrow-back-ios "
          size="20"
        />
        BACK
        <!-- <UIcon class="flex-shrink-0" name="hugeicons:advertisement" size="20" /> -->
      </button>
      <p class="overflow-y-auto">
        {{ storySplitted[activeIndex] }}
      </p>

      <button
        v-if="showOptions && !loadingStory"
        v-for="options in story?.options"
        class="flex flex-shrink-0 items-center justify-center rounded-[10px] border-[1px] border-solid border-white p-2.5 font-inter text-base font-medium text-white"
        @click="applySelectionAndContinueStory(options)"
      >
        {{ options }}
      </button>
      <div
        v-else-if="loadingStory"
        class="my-5 flex items-center justify-center"
      >
        <UIcon
          name="eos-icons:three-dots-loading"
          size="64"
          class="text-white dark:text-white"
        />
      </div>

      <div
        v-if="!showOptions"
        class="flex w-full items-center justify-center gap-5"
      >
        <button
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border"
          :class="
            activeIndex === 0
              ? 'border-[#999999] text-[#999999]'
              : 'border-social-blue-300 bg-white text-social-blue-300 dark:text-social-blue-300'
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
