<script setup lang="ts">
import { defineAsyncComponentWithRetry } from "~/utils/helpers/defineAsyncComponentWithRetry";
import { modalStore } from "~/store/modalStore";
import { storeToRefs } from "#build/imports";

const { isModalOpen, activeKey } = storeToRefs(modalStore());
type ComponentMap = {
  contacts: Component | string;
  tasks: Component | string;
  settings: Component | string;
  requests: Component | string;
  menu: Component | string;
  wallet: Component | string;
  maps: Component | string;
  market: Component | string;
  clock: Component | string;
  test: Component | string;
};
const comps = shallowRef<ComponentMap>({
  contacts: defineAsyncComponentWithRetry(
    () => import("~/components/Contacts/index.vue"),
  ),
  tasks: defineAsyncComponentWithRetry(
    () => import("~/components/Tasks/index.vue"),
  ),
  settings: defineAsyncComponentWithRetry(
    () => import("~/components/Settings/index.vue"),
  ),
  requests: defineAsyncComponentWithRetry(
    () => import("~/components/Requests/index.vue"),
  ),
  menu: defineAsyncComponentWithRetry(
    () => import("~/components/PhoneMenu.vue"),
  ),
  wallet: defineAsyncComponentWithRetry(
    () => import("~/components/Wallet/index.vue"),
  ),
  maps: defineAsyncComponentWithRetry(
    () => import("~/components/Maps/index.vue"),
  ),
  market: defineAsyncComponentWithRetry(
    () => import("~/components/Market/index.vue"),
  ),
  clock: defineAsyncComponentWithRetry(() => import("~/components/Clock.vue")),
  test: defineAsyncComponentWithRetry(() => import("~/components/Test.vue")),
});
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
onMounted(() => {
  calculateAndApplyScale();
  window.addEventListener("resize", calculateAndApplyScale);
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateAndApplyScale);
});

// const activeKey = ref<keyof ComponentMap>("menu");
const activeComp = (key: keyof ComponentMap) => {
  modalStore().changeActiveKey(key);
  // activeKey.value = key;
};
const isOpen = defineModel<boolean>("isOpen");
const closeModal = () => {
  modalStore().closeMenuModal();
  setTimeout(() => {
    modalStore().changeActiveKey("menu");
    // activeKey.value = "menu";
  }, 500);
};
const bg = ref('bg-[url("@/assets/img/modal-phone-bg.png")]');
</script>
<template>
  <UModal
    v-model="isModalOpen"
    fullscreen
    @close="closeModal"
    :ui="{
      background: '!bg-opacity-0',
      inner: 'hide-scrollbar overflow-x-hidden w-max-screen select-none',

      transition: {
        enter: 'ease-out duration-500',
        enterFrom: 'opacity-0 translate-y-10',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'ease-in duration-500',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 translate-y-10',
      },
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enter: 'ease-out duration-500',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-500',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },
    }"
  >
    <div
      class="relative h-full w-full rounded-t-[42px] border-x-[10px] border-t-[10px] border-black shadow-xl"
    >
      <div
        class="absolute left-1/2 top-0 z-50 h-[18px] w-[148px] translate-x-[-50%] rounded-b-[1rem] bg-black"
      ></div>
      <div
        class="absolute left-[-105px] top-[124px] z-50 h-[46px] w-[4px] rounded-l-lg bg-black"
      ></div>
      <div
        class="absolute left-[-105px] top-[178px] z-50 h-[46px] w-[4px] rounded-l-lg bg-black"
      ></div>
      <div
        class="absolute right-[-105px] top-[142px] z-50 h-[64px] w-[4px] rounded-r-lg bg-black"
      ></div>
      <StatusBarPhone class="absolute left-0 top-0 z-20" />
      <div
        class="hide-scrollbar relative h-full w-full overflow-y-scroll rounded-t-[32px] bg-cover bg-center bg-no-repeat pt-6"
        :class="
          activeKey === 'menu' ? bg : 'bg-[#19043DCC]/80 backdrop-blur-[35px]'
        "
      >
        <Transition>
          <div class="relative h-full w-full">
            <component
              :is="comps[activeKey as keyof ComponentMap]"
              @update:is-open="() => closeModal()"
              @update:key="
                () => {
                  modalStore().changeActiveKey('menu');
                }
              "
              @active-comp="
                (e: any) => {
                  activeComp(e);
                }
              "
            />
          </div>
        </Transition>
      </div>
    </div>
  </UModal>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
