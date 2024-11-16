<script setup lang="ts">
import { ref, computed } from "vue";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import { modalStore } from "~/store/modalStore";
import { userStore } from "~/store/user";
import { splideCharacterData } from "~/utils/helpers/characterImgs";

const splideOptions = computed(() => ({
  pagination: false,
}));
const currentIndex = ref(0);
const onNext = () => {
  if (currentIndex.value < splideData.length - 1) {
    currentIndex.value++;
  }
};
const onPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
const splideData = splideCharacterData;

const selectCharacter = (key: string) => {
  // save to user data and store
  console.log("object :>> ", key);
  userStore().setSelectedCharacter(key);
  modalStore().setTutorialModal(true);
  modalStore().setCharacterSelectModal(false);
};
</script>

<template>
  <div
    class="flex h-[100dvh] w-full flex-col items-center justify-around gap-5 bg-[url('@/assets/img/character-select-bg.png')] bg-cover bg-center bg-no-repeat py-5"
  >
    <img
      src="/icons/social-clicker-logo.svg"
      alt="social-clicker-logo"
      class="w-48"
    />
    <Splide :has-track="false" :options="splideOptions">
      <SplideTrack>
        <SplideSlide v-for="(item, index) in splideData" :key="item.name">
          <div class="flex w-full flex-col items-center gap-5">
            <div class="h-80 max-h-80">
              <img
                :src="item.img"
                alt="character image"
                class="max-h-80 w-full object-contain"
              />
            </div>
          </div>
        </SplideSlide>
      </SplideTrack>
      <div class="grid grid-cols-1">
        <div class="flex w-full justify-center">
          <button
            class="z-10 mt-5 flex h-12 w-56 items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
            @click="selectCharacter(splideData[currentIndex].key)"
          >
            <span>SELECT</span>
          </button>
        </div>
      </div>
      <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          <UIcon name="material-symbols:arrow-back-ios" size="20" />
        </button>
        <button class="splide__arrow splide__arrow--next">
          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
      </div>
    </Splide>
  </div>
</template>
