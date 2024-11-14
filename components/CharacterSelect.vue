<script setup lang="ts">
import { ref, computed } from "vue";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";

const splideOptions = computed(() => ({
  type: "loop",
  rewind: true,
  pagination: false,
}));

const splideData = [
  {
    img: "/character/character1.png",
    characterId: "1",
  },
  {
    img: "/avatar/avatar1.png",
    characterId: "2",
  },
  {
    img: "/character/character1.png",
    characterId: "3",
  },
  {
    img: "/character/character1.png",
    characterId: "4",
  },
];

const selectCharacter = (id: string) => {
  console.log("object :>> ", id);
};
</script>

<template>
  <div
    class="flex h-[100dvh] w-full flex-col items-center gap-5 bg-social-blue-600 bg-gradient-to-t from-[#31456f] to-social-blue-600 py-5"
  >
    <img
      src="/icons/social-clicker-logo.svg"
      alt="social-clicker-logo"
      class="w-48"
    />
    <Splide :has-track="false" :options="splideOptions">
      <SplideTrack>
        <SplideSlide
          v-for="(item, index) in splideData"
          :key="item.characterId"
        >
          <div class="flex w-full flex-col items-center gap-5">
            <div class="h-80 max-h-80">
              <img
                :src="item.img"
                alt="character image"
                class="max-h-80 w-full object-contain"
              />
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="flex w-full justify-center">
              <button
                class="z-10 mt-5 flex h-12 w-56 items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
                @click="selectCharacter(item.characterId)"
              >
                <span>SELECT</span>
              </button>
            </div>
          </div>
        </SplideSlide>
      </SplideTrack>
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
