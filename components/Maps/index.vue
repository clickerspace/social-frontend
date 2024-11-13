<script setup lang="ts">
const emit = defineEmits(["update:key"]);
const marketItems = [
  {
    name: "Dorm",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Cafe",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Market",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
  {
    name: "Campus",
    icon: "ic:baseline-location-on",
    daysAgo: "2",
  },
];
const clicked = ref(false);
const handleClick = () => {
  if (!clicked.value) {
    clicked.value = true;
  }
};
</script>
<template>
  <PhoneLayout title="Maps" @update:key="emit('update:key')">
    <div
      class="flex w-full cursor-pointer select-none items-center justify-between px-2 py-3"
      :class="clicked ? 'radial-bg-disabled' : 'radial-bg'"
      v-for="item in marketItems"
      :key="item.name"
      @click="handleClick()"
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
