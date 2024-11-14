<script setup lang="ts">
import { useLocalTime } from "~/utils/helpers/useLocalTime";
import { storeToRefs } from "#build/imports";
import { userStore } from "~/store/user";
import { modalStore } from "~/store/modalStore";

const { energy, socialPoints } = storeToRefs(userStore());
const localTime = useLocalTime();
</script>
<template>
  <div class="flex w-full items-center justify-between px-6 pt-2">
    <div class="flex items-center justify-center text-sm">
      {{ localTime }}
    </div>
    <div class="flex items-center gap-1">
      <div class="flex h-4 items-center rounded-[5px] p-[1px]">
        <!-- <div
          class="relative z-10 flex h-full w-full items-center justify-center rounded-[5px] border border-white bg-transparent pl-[18px] pr-1 dark:border-white"
        >
          <span class="text-[10px]">
            {{ sp }}
          </span>
          <div
            class="absolute left-0 flex size-4 items-center justify-center rounded-full border border-white bg-white dark:border-white dark:bg-white"
          >
            <span class="text-[10px] text-social-blue-200">$</span>
          </div>
        </div> -->
        <!-- <span
          class="-ml-[4px] flex h-4 items-center rounded-r-[5px] border border-white bg-white pl-[2px] pr-[1px] text-[10px] font-semibold text-social-blue-200 dark:border-white dark:bg-white"
          >+</span
        > -->
      </div>

      <div
        class="flex h-4 cursor-pointer items-center rounded-[5px] bg-transparent p-[1px] dark:bg-transparent"
        @click="modalStore().openMenuModal('market')"
      >
        <div
          class="relative flex h-full w-full items-center justify-center rounded-[5px] border bg-transparent pl-3 pr-1"
          :class="
            energy <= 0
              ? 'border-social-red-100'
              : 'border-white dark:border-white'
          "
        >
          <div class="flex gap-[1px]">
            <div
              class="h-2 w-[1px]"
              :class="{
                'bg-white dark:bg-white': i < (energy / 100) * 10,
                'bg-social-blue-400': i >= (energy / 100) * 10,
              }"
              v-for="(_, i) in 10"
              :key="i"
            ></div>
          </div>

          <div
            class="absolute -left-[10px] flex size-8 items-center justify-center"
          >
            <img
              :src="
                energy === 0
                  ? '/icons/energy-icon-red.svg'
                  : '/icons/energy-icon-white.svg'
              "
              alt="energy"
              class="size-5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
