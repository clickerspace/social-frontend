<script setup lang="ts">
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";

const splideOptions = computed(() => ({
  type: "loop",
  rewind: true,
}));
const splideData = [
  {
    img: "/avatar/avatar1.png",
    title: "MENUS",
    description:
      "Complete tasks to gain SP and Power. Add friends from the Contacts section to earn more SP and Power, and request help from your friends through the Messages section.",
  },
  {
    img: "/avatar/avatar1.png",
    title: "POWER AND SOCIAL POINTS",
    description:
      "Your character uses energy to progress through the story. The choices you make earn you Social Points (SP). Power can be obtained by asking for help from friends or purchasing it from the market.",
  },
  {
    img: "/avatar/avatar1.png",
    title: "MARKET",
    description:
      "Users can purchase Energy Packs to refill their energy, SP Packages to earn Social Points (SP), and click on the Ad Pack to watch ads and gain both energy and SP.",
  },
  {
    img: "/avatar/avatar1.png",
    title: "STORY",
    description:
      "As long as you have energy, you will interact with the people around you and have conversations. Your choices during these interactions can earn or cost you Social Points (SP). Once you reach 100 SP, the game rewards you with 1 token.",
  },
];
const splideOptionsRef = ref<object>(splideOptions);
</script>
<template>
  <Splide :has-track="false" :options="splideOptionsRef">
    <SplideTrack>
      <SplideSlide v-for="item in splideData" :key="item.description">
        <div
          class="grid h-[100dvh] grid-cols-1 bg-social-blue-600 bg-gradient-to-t from-[#31456f] to-social-blue-600 py-5"
        >
          <div class="flex w-full flex-col items-center gap-5">
            <img
              src="/icons/social-clicker-logo.svg"
              alt="social-clicker-logo"
              class="w-48"
            />
            <div class="w-36">
              <img
                :src="item.img"
                alt="social-clicker-logo"
                class="h-full w-full object-contain"
              />
            </div>
            <h1 class="">{{ item.title }}</h1>
            <p class="w-72 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </SplideSlide>
    </SplideTrack>
    <div class="splide__pagination" />
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <UIcon name="material-symbols:arrow-back-ios" size="20" />
        <span>BACK</span>
      </button>
      <button class="splide__arrow splide__arrow--next">
        <span>NEXT</span>
        <UIcon name="material-symbols:arrow-forward-ios" size="20" />
      </button>
    </div>
  </Splide>
  <button class="absolute right-2 top-2">
    <UIcon name="bx:bxs-chevrons-right" size="32" />
  </button>
</template>
<style>
.splide__pagination__page {
  @apply h-[2px] w-2 rounded-none hover:bg-social-blue-600;
}
.splide__pagination__page.is-active {
  @apply w-4 bg-social-blue-600;
}
.splide__pagination {
  bottom: 4rem;
}
.splide__arrow--next {
  position: absolute;
  bottom: 35px;
  @apply flex h-12 w-36 items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300;
}
.splide__arrow--prev {
  border: 1px solid white;
  @apply flex h-12 w-36 items-center justify-center gap-2 rounded-[10px] border;
}
.splide__arrows {
  position: relative;
  bottom: 35px;
}
</style>
