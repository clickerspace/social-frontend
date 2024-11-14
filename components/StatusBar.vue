<script setup lang="ts">
import { modalStore } from "~/store/modalStore";
import { storeToRefs } from "#build/imports";
import { userStore } from "~/store/user";
const { energy, socialPoints } = storeToRefs(userStore());
const { isModalOpen } = storeToRefs(modalStore());
console.log(socialPoints.value);
</script>
<template>
  <div class="flex h-12 w-full items-center justify-between px-5">
    <ModalsMenu v-model:isOpen="isModalOpen" />
    <div
      class="flex cursor-pointer items-center justify-center rounded-lg bg-social-yellow-100 p-1"
      @click="modalStore().openMenuModal('menu')"
    >
      <UIcon
        name="hugeicons:smart-phone-01"
        size="28"
        class="text-social-blue-100"
      />
    </div>
    <div class="flex items-center gap-3">
      <div
        class="box-shadow-yellow flex h-6 cursor-pointer items-center rounded-[5px] bg-social-yellow-100 p-[1px]"
        @click="modalStore().openMenuModal('market')"
      >
        <div
          class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-8 pr-2"
        >
          <span class="text-xs text-social-yellow-100">
            {{ socialPoints }}
          </span>
          <div
            class="absolute -left-1 flex size-8 items-center justify-center rounded-full"
          >
            <span class="font-semibold text-social-blue-200"
              ><img
                src="
                  /icons/sp-icon-bar.svg
                "
                alt="energy"
                class="size-8"
            /></span>
          </div>
        </div>
        <span
          class="-translate-y-[1px] px-[1px] text-sm font-semibold text-social-blue-200"
          >+</span
        >
      </div>

      <div
        class="flex h-6 cursor-pointer items-center rounded-[5px] p-[1px]"
        :class="
          energy <= 0
            ? 'box-shadow-red bg-social-red-100'
            : 'box-shadow-green bg-social-green-100'
        "
        @click="modalStore().openMenuModal('market')"
      >
        <div
          class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-8 pr-2"
        >
          <div class="flex gap-[2px]">
            <div
              class="h-4 w-[3px]"
              :class="{
                'bg-social-green-100': i < (energy / 100) * 10,
                'bg-social-blue-400': i >= (energy / 100) * 10,
              }"
              v-for="(_, i) in 10"
              :key="i"
            ></div>
          </div>

          <div class="absolute -left-1 flex size-8 items-center justify-center">
            <img
              :src="
                energy === 0
                  ? '/icons/energy-icon-bar-red.svg'
                  : '/icons/energy-icon-bar.svg'
              "
              alt="energy"
              class="size-8"
            />
          </div>
        </div>
        <span class="px-[1px] text-xs font-semibold text-social-blue-200">{{
          energy
        }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box-shadow-green {
  box-shadow:
    0px -0.3px 0px 0px #4dff68 inset,
    0px 0.3px 0px 0px #cdffb6 inset,
    0px 0.5px 0px 0px #0a8974,
    0px 1px 0px 0px #0a8974;
}
.box-shadow-red {
  box-shadow:
    0px -0.3px 0px 0px #ff6b6b inset,
    0px 0.3px 0px 0px #ffb6b6 inset,
    0px 0.5px 0px 0px #8a2020,
    0px 1px 0px 0px #8a2020;
}
.box-shadow-yellow {
  box-shadow:
    0px -0.3px 0px 0px #ffcc4d inset,
    0px 0.3px 0px 0px #ffe8b6 inset,
    0px 0.5px 0px 0px #f4900c,
    0px 1px 0px 0px #f4900c;
}
</style>
