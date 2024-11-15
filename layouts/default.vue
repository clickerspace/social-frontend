<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
import { initInitData } from "@telegram-apps/sdk";
import { initMiniApp } from "@telegram-apps/sdk";

const [miniApp] = initMiniApp();
const initDataApp = initInitData();

const { loading, gameLoading } = storeToRefs(userStore());

const loadPage = ref(false);
const loadingHere = ref(true);

onMounted(() => {
  try {
    miniApp.setBgColor("#273649");
    miniApp.setHeaderColor("#273649");
    miniApp.ready();
  } catch (e) {
    console.error(e);
  }

  window.Telegram = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: initDataApp?.user?.id,
          languageCode: initDataApp?.user?.languageCode,
        },
      },
    },
  };
  // starts loading page while loading screen is up
  setTimeout(() => {
    loadPage.value = true;
  }, 500);
});
</script>
<template>
  <transition name="fade">
    <div
      v-if="loading || gameLoading"
      class="bg-primary-800 absolute inset-0 z-50 flex h-[calc(100dvh+1px)] flex-col items-center justify-around bg-cover bg-center bg-no-repeat"
    >
      <Loading />
    </div>
  </transition>
  <div
    class="flex h-[calc(100dvh+1px)] w-full select-none flex-col overflow-hidden"
  >
    <slot v-if="loadPage" />
  </div>
</template>
