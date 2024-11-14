<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";

interface Product {
  id: number;
  brand: string;
}

const list = ref(null);
const itemList = ref<Product[]>([]);
const userShow = 10;

const fetchItems = async (skip = 0): Promise<Product[]> => {
  const res = await fetch(
    `https://dummyjson.com/products/?limit=${userShow}&skip=${skip}`,
  );
  const json = await res.json();
  return json.products as Product[];
};

itemList.value = await fetchItems();

const getOnScroll = async () => {
  const newItems = await fetchItems(itemList.value.length);
  if (newItems.length > 0) {
    itemList.value.push(...newItems);
  }
};

useInfiniteScroll(list, async () => await getOnScroll(), {
  distance: 10,
});
</script>

<template>
  <div
    ref="list"
    class="hide-scrollbar flex h-[400px] flex-col gap-5 overflow-y-scroll"
  >
    <span v-for="(item, index) in itemList" :key="item.id">
      {{ item.brand }}
    </span>
  </div>
</template>
