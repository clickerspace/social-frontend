<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
import { initUtils } from "@telegram-apps/sdk";
const emit = defineEmits(["update:key"]);
const { products: marketItems } = storeToRefs(userStore());
const utils = initUtils();
const clicked = ref(false);
const handleClick = async (productId: string) => {
  if (!clicked.value) {
    clicked.value = true;
  }
  const result = await userStore().createTransaction(productId);
  // send data to aeon v2
  const url = "https://sbx-crypto-payment-api.aeon.xyz/open/api/tg/payment/V2";
  const url2 = "https://crypto-payment-api.aeon.xyz/open/api/tg/payment/V2";
  const resultAeon = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.transactionDataAeon),
  });
  if (!resultAeon.ok) {
    console.error("Error sending data to Aeon V2");
    return;
  }
  const data = await resultAeon.json();
  if (data.msg === "success") {
    utils.openLink(data.model.webUrl, {
      tryInstantView: true,
      tryBrowser: true,
    });
  }

  setTimeout(() => {
    clicked.value = false;
  }, 500);
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
      @click="handleClick(item?.id)"
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
