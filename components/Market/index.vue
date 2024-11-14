<script setup lang="ts">
const emit = defineEmits(["update:key"]);
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
const { products: marketItems } = storeToRefs(userStore());

const clicked = ref(false);
const handleClick = () => {
  if (!clicked.value) {
    clicked.value = true;
  }
};
onMounted(async () => {
  await userStore().getProducts();
});
</script>
<template>
  <PhoneLayout title="Market" @update:key="emit('update:key')">
    <div
      class="flex w-full cursor-pointer select-none items-center justify-between px-2 py-3"
      :class="clicked ? 'radial-bg-disabled' : 'radial-bg'"
      v-for="item in marketItems"
      :key="item?.name"
      @click="handleClick()"
    >
      <div class="flex items-center gap-2">
        <UIcon :name="item?.icon" size="42" class="text-social-purple-100" />
        <div class="flex flex-col gap-1">
          <span class="font-sm font-semibold">{{ item?.name }}</span>
          <span class="text-xs font-light">{{ item?.product }}</span>
        </div>
      </div>
      <div class="text-lg font-black">${{ item?.price }}</div>
    </div>
  </PhoneLayout>
</template>
