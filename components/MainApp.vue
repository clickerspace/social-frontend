<script setup lang="ts">
import { userStore } from "~/store/user";
import type { TabsProvider } from "~/types";
import { initClosingBehavior } from "@telegram-apps/sdk";

const [closingBehavior] = initClosingBehavior();
const tabNumber = ref(0);

const updateTabNumber = (index: number) => {
  tabNumber.value = index;
};
provide("tabsProvider", { tabNumber, updateTabNumber } as TabsProvider);
const { setLoading } = userStore();

const sentinel = ref<HTMLElement>();

onMounted(async () => {
  // this is watching for sentinel to prevent collapse we need extra pixel on body to prevet collapse so when this is visible it goes invisible again
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Sentinel is visible, scroll down 1px to prevent collapse

          window.scrollTo(0, 1);
        }
      });
    },
    { threshold: [1] },
  );
  observer.observe(sentinel.value as HTMLElement);

  closingBehavior.enableConfirmation();
  onUnmounted(() => {
    observer.disconnect();
  });
});

onBeforeMount(() => {
  //when login comes set it true
  setLoading(false);
});
</script>
<template>
  <div class="relative overflow-hidden">
    <div
      ref="sentinel"
      class="z-20 -mb-[1px] h-[1px] w-full bg-transparent"
    ></div>
    <div class="mobile-body relative flex w-full flex-col overflow-hidden">
      <ClientOnly>
        <StatusBar class="absolute" />
        <Story />
      </ClientOnly>
    </div>
  </div>
</template>
