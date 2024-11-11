<script setup lang="ts">
import { TabMenuItems } from "~/utils/constants/tabMenu";
import type { TabsProvider } from "~/types";
import { defineAsyncComponentWithRetry } from "~/utils/helpers/defineAsyncComponentWithRetry";

type ComponentMap = {
  story: Component | string;
  tasks: Component | string;
  friends: Component | string;
};
const comps = shallowRef<ComponentMap>({
  story: defineAsyncComponentWithRetry(
    () => import("~/components/Story/index.vue"),
  ),
  tasks: defineAsyncComponentWithRetry(
    () => import("~/components/Tasks/index.vue"),
  ),
  friends: defineAsyncComponentWithRetry(
    () => import("~/components/Friends/index.vue"),
  ),
});

const { tabNumber, updateTabNumber } = inject("tabsProvider") as TabsProvider;

const loading = ref(Array(TabMenuItems?.length).fill(true));
const calculateAndApplyScale = () => {
  const width = window.innerWidth;
  let scaleFactor;
  const targetDivRef = window.document.querySelector(
    ".targetlist-scale",
  ) as HTMLElement | null;

  if (width < 410) {
    scaleFactor = width / 410;
  } else if (width <= 820) {
    // Example: Scale linearly between 410px and 820px widths
    scaleFactor = 1 + ((width - 410) / (820 - 410)) * (1.5 - 1); // Scales up to 1.5x between 410px and 820px
  } else {
    scaleFactor = 1.5; // Maximum scale factor
  }

  if (targetDivRef) {
    targetDivRef.style.transform = `scale(${scaleFactor})`;
    targetDivRef.style.transformOrigin = "bottom left";
    targetDivRef.style.width = `${100 / scaleFactor}%`;

    // Adjust the height similarly if needed
  }
};
const recordComponentInitialLoad = ref(Array(TabMenuItems?.length).fill(false));

watch(
  () => tabNumber.value,
  (newTabNumber) => {
    if (recordComponentInitialLoad.value[newTabNumber] === false) {
      recordComponentInitialLoad.value[newTabNumber] = true;
    }
  },
);

onMounted(() => {
  // this is instead of default index so we can change the bg image
  updateTabNumber(2);
  recordComponentInitialLoad.value[tabNumber.value] = true;
  calculateAndApplyScale(); // Initial scale calculation
  window.addEventListener("resize", calculateAndApplyScale);
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateAndApplyScale);
});

const onComponentMounted = (index: number) => {
  loading.value[index] = false;
};
// Optional: Recalculate scale when the component updates
watchEffect(calculateAndApplyScale);
</script>
<template>
  <!-- if you want the change tab and content position only in this tab use :ui in UTabs -->
  <!-- TODO check if +1px needed causes scroll appearing in desktop but mobile is fine and fixes collapse-->

  <div
    class="flex h-[calc(100dvh+1px)] w-full select-none flex-col overflow-hidden bg-cover bg-left-top bg-no-repeat"
  >
    <UTabs
      v-model="tabNumber"
      :ui="{
        wrapper: 'flex flex-col-reverse tab-menu w-full space-y-0 grow ',
        container: `hide-scrollbar scrollable-element  scroll-smooth h-full `,
        base: 'h-full',
        list: {
          height:
            'min-h-[50px] max-h-[92px] h-[24vw] targetlist-scale shadow-top relative',
          background: ` bg-no-repeat bg-cover  bg-transparent dark:bg-transparent  shrink-0 !z-40 -mt-6 relative -bottom-[2px]  `,
          tab: {
            padding: 'px-0 ',
            icon: 'hidden',
          },
          marker: {
            background: '!bg-opacity-0',
          },
        },
      }"
      :items="TabMenuItems"
    >
      <template #default="{ item, index, selected }">
        <div
          class="!dark:bg-transparent z-40 mt-1 flex aspect-square h-[76px] w-full grow-0 items-center justify-center !bg-transparent bg-contain bg-center bg-no-repeat duration-300"
        >
          <img
            :src="item.icon"
            :alt="item.label"
            class="mb-1 size-[38px]"
            :class="selected ? 'scale-110' : ''"
          />
        </div>
      </template>
      <template #item="{ item, selected, index }">
        <div v-show="!loading[index]" class="h-full w-full">
          <component
            v-if="recordComponentInitialLoad[index]"
            :is="comps[item.label as keyof ComponentMap]"
            @mounted="onComponentMounted(index)"
          />
        </div>
        <Loading v-show="loading[index]" />
      </template>
    </UTabs>
  </div>
</template>
