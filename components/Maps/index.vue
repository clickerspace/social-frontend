<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
const { location } = storeToRefs(userStore());
const emit = defineEmits(["update:key"]);

const marketItems = [
  {
    name: "Dorm",
    key: "dorm_rooms", // DO NOT CHANGE KEYS ARE CHECKED AT BACKEND
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Cafe",
    key: "cafe",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Market",
    key: "market",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Campus",
    key: "school_campus_yard",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
];
const clicked = ref(false);
const handleClick = async (key: string) => {
  if (!clicked.value) {
    clicked.value = true;
  }
  location.value = key;
  await userStore().getStory(key);
};
</script>
<template>
  <PhoneLayout title="Maps" @update:key="emit('update:key')">
    <div
      class="flex w-full cursor-pointer select-none items-center justify-between px-2 py-3"
      :class="clicked ? 'radial-bg-disabled' : 'radial-bg'"
      v-for="item in marketItems"
      :key="item.name"
      @click="handleClick(item.key)"
    >
      <div class="flex items-center gap-2">
        <UIcon :name="item.icon" size="42" class="text-social-purple-100" />
        <div class="flex flex-col gap-1">
          <span class="font-sm font-semibold">{{ item.name }}</span>
        </div>
      </div>
      <div class="text-sm font-light">{{ item.daysAgo }} days ago</div>
    </div>
  </PhoneLayout>
</template>
