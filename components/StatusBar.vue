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
        size="20"
        class="text-social-blue-100"
      />
    </div>
    <div class="flex items-center gap-3">
      <div
        class="flex h-6 cursor-pointer items-center rounded-[5px] bg-social-yellow-100 p-[1px]"
        @click="modalStore().openMenuModal('market')"
      >
        <div
          class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-9 pr-2"
        >
          <span class="text-xs text-social-yellow-100">
            {{ socialPoints }}
          </span>
          <div
            class="absolute left-0 flex size-8 items-center justify-center rounded-full border border-social-blue-200 bg-social-yellow-100"
          >
            <span class="font-semibold text-social-blue-200">SP</span>
          </div>
        </div>
        <span class="px-[1px] text-sm font-semibold text-social-blue-200"
          >+</span
        >
      </div>
      <UChip
        :text="energy"
        size="xl"
        :ui="{
          base: '!ring-[1px] !ring-social-yellow-100 !text-white',
          background: '!bg-social-blue-200',
        }"
      >
        <div
          class="flex h-6 items-center rounded-[5px] p-[1px]"
          :class="energy <= 0 ? 'bg-social-red-100' : 'bg-social-yellow-100'"
        >
          <div
            class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-6 pr-2"
          >
            <div class="flex gap-1">
              <div
                class="h-4 w-[2px]"
                :class="{
                  'bg-social-yellow-100': i < (energy / 100) * 10,
                  'bg-social-blue-400': i >= (energy / 100) * 10,
                }"
                v-for="(_, i) in 10"
                :key="i"
              ></div>
            </div>
            >

            <div
              class="absolute -left-1 flex size-8 items-center justify-center"
            >
              <img
                :src="
                  energy === 0
                    ? '/icons/energy-icon-red.svg'
                    : '/icons/energy-icon.svg'
                "
                alt="energy"
                class="size-8"
              />
            </div>
          </div>
        </div>
      </UChip>
    </div>
  </div>
</template>
