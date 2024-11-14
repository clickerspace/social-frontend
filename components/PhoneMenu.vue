<script setup lang="ts">
import { TabMenuItems } from "~/utils/constants/tabMenu";
import { PhoneMenuItems } from "~/utils/constants/phoneMainMenu";

const emit = defineEmits(["activeIndex", "update:isOpen"]);
</script>
<template>
  <div
    class="flex h-full w-full select-none flex-col items-center justify-between overflow-hidden"
  >
    <div class="grid w-full grid-cols-4 gap-5 p-7">
      <NuxtLink
        v-for="(item, i) in PhoneMenuItems"
        :key="item.label"
        :to="item.to"
        @click="
          !item.to
            ? emit('activeIndex', { component: item.component, index: i })
            : ''
        "
        class="flex cursor-pointer flex-col items-center duration-300 hover:scale-110"
      >
        <img :src="item.icon" :alt="item.label" class="h-full w-full" />
        <span class="line-clamp-1 text-[10px] capitalize">
          {{
            item.label.length > 6 ? item.label.slice(0, 6) + "..." : item.label
          }}
        </span>
      </NuxtLink>
    </div>
    <div>
      <div
        class="flex items-center gap-5 rounded-[24px] bg-[#f5f5f530] px-4 py-2 backdrop-blur-xl dark:bg-[#f5f5f530]"
      >
        <span
          v-for="(item, i) in TabMenuItems"
          v-show="item.label !== 'menu'"
          :key="item.label"
          @click="emit('activeIndex', { component: item.component, index: i })"
          class="cursor-pointer duration-300 hover:scale-125"
        >
          <img :src="item.icon" :alt="item.label" class="size-[55px]" />
        </span>
      </div>
      <div
        class="flex w-full justify-center py-3"
        @click="
          () => {
            emit('update:isOpen');
          }
        "
      >
        <button
          class="flex h-2 w-48 items-center justify-center gap-2 rounded-[10px] bg-[#99999970] backdrop-blur-sm"
        ></button>
      </div>
    </div>
  </div>
</template>
