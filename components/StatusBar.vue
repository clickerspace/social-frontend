<script setup lang="ts">
const sp = ref(-65485);
const energy = ref(15);
</script>
<template>
  <div class="flex h-12 w-full items-center justify-between px-5">
    <div
      class="flex items-center justify-center rounded-lg bg-social-yellow-100 p-1"
    >
      <UIcon
        name="hugeicons:smart-phone-01"
        size="20"
        class="text-social-blue-100"
      />
    </div>
    <div class="flex items-center gap-3">
      <div
        class="flex h-6 items-center rounded-[5px] bg-social-yellow-100 p-[1px]"
      >
        <div
          class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-9 pr-2"
        >
          <span class="text-xs text-social-yellow-100">
            {{ sp }}
          </span>
          <div
            class="absolute left-0 flex size-8 items-center justify-center rounded-full border border-social-blue-200 bg-social-yellow-100"
          >
            <span class="font-semibold text-social-blue-200">$</span>
          </div>
        </div>
        <span class="px-[1px] text-sm font-semibold text-social-blue-200"
          >+</span
        >
      </div>
      <UChip
        :show="energy > 10"
        :text="energy > 99 ? '99+' : energy"
        size="xl"
        :ui="{
          base: '!ring-[1px] !ring-social-yellow-100 !text-white',
          background: '!bg-social-blue-200',
        }"
      >
        <div
          class="flex h-6 items-center rounded-[5px] bg-social-yellow-100 p-[1px]"
        >
          <div
            class="relative flex h-full w-full items-center justify-center rounded-[5px] bg-social-blue-200 pl-6 pr-2"
          >
            <div class="flex gap-1">
              <div
                class="h-4 w-[2px]"
                :class="{
                  'bg-social-yellow-100': i < energy,
                  'bg-slate-500': i >= energy,
                }"
                v-for="(item, i) in 10"
                :key="i"
              ></div>
            </div>

            <div
              class="absolute -left-1 flex size-8 items-center justify-center"
            >
              <img
                src="@/assets/img/icons/energy_icon.svg"
                alt="energy"
                class="size-6"
              />
            </div>
          </div>
        </div>
      </UChip>
    </div>
  </div>
</template>
