<script setup lang="ts">
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import { modalStore } from "~/store/modalStore";

const splideOptions = {};

const splide = ref();

const splideData = [
  {
    img: "/img/slider1.png",
    title: "MENUS",
    description:
      "Complete tasks to gain SP and Power. Add friends from the Contacts section to earn more SP and Power, and request help from your friends through the Messages section.",
  },
  {
    img: "/img/slider2.png",
    title: "POWER AND SOCIAL POINTS",
    description:
      "Your character uses energy to progress through the story. The choices you make earn you Social Points (SP). Power can be obtained by asking for help from friends or purchasing it from the market.",
  },
  {
    img: "/img/slider3.png",
    title: "MARKET",
    description:
      "Users can purchase Energy Packs to refill their energy, SP Packages to earn Social Points (SP), and click on the Ad Pack to watch ads and gain both energy and SP.",
  },
  {
    img: "/img/slider4.png",
    title: "STORY",
    description:
      "As long as you have energy, you will interact with the people around you and have conversations. Your choices during these interactions can earn or cost you Social Points (SP). Once you reach 100 SP, the game rewards you with 1 token.",
  },
];
const currentIndex = ref(0);

const onNext = () => {
  if (currentIndex.value < splideData.length - 1) {
    currentIndex.value++;
    splide.value.go(currentIndex.value);
  } else {
    modalStore().setTutorialModal(false);
  }
};

const onPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    splide.value.go(currentIndex.value);
  }
};
</script>
<template>
  <Splide ref="splide" :has-track="false" :options="splideOptions">
    <SplideTrack>
      <SplideSlide v-for="item in splideData" :key="item.description">
        <div
          class="grid h-[100dvh] grid-cols-1 bg-[url('@/assets/img/tutorial-bg.png')] bg-cover bg-center bg-no-repeat py-5"
        >
          <div class="flex w-full flex-col items-center gap-5">
            <img
              src="/icons/social-clicker-logo.svg"
              alt="social-clicker-logo"
              class="w-48"
            />
            <div class="h-56 w-56">
              <img
                :src="item.img"
                alt="social-clicker-logo"
                class="h-full w-full object-contain"
              />
            </div>
            <div class="flex w-full flex-col items-center gap-5">
              <h1 class="">{{ item.title }}</h1>
              <p class="w-72 text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </SplideSlide>
    </SplideTrack>
    <div class="splide__pagination" />
    <div class="splide__arrows">
      <div @click.stop.prevent="onPrev">
        <button
          :disabled="currentIndex === 0"
          class="splide__arrow splide__arrow--prev"
        >
          <UIcon name="material-symbols:arrow-back-ios" size="20" />
          <span>BACK</span>
        </button>
      </div>
      <div @click.stop.prevent="onNext">
        <button
          v-if="currentIndex < splideData.length - 1"
          class="splide__arrow splide__arrow--next"
        >
          <span>NEXT</span>

          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
        <button v-else class="splide__arrow splide__arrow--next">
          <span>START</span>
          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
      </div>
    </div>
  </Splide>
  <button
    class="absolute right-4 top-2 flex flex-col items-center rounded-md border border-white p-1 dark:border-white"
    @click="modalStore().setTutorialModal(false)"
  >
    <UIcon name="bx:bxs-chevrons-right" size="32" />
    <span class="text-xs">CLOSE</span>
  </button>
</template>
<style>
.splide__pagination__page {
  @apply h-[2px] w-2 rounded-none hover:bg-social-blue-600;
}
.splide__pagination__page.is-active {
  @apply w-4 bg-social-blue-600;
}
</style>
<style scoped>
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
