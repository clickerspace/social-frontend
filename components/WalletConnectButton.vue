<script setup lang="ts">
import { TonConnectUI } from "@tonconnect/ui";

const { tonconnect } = useTonConnect();

const connect = async () => {
  await tonconnect.value?.openModal();
};
</script>
<template>
  <UButton
    @click="connect()"
    variant="solid"
    :ui="{
      color: {
        primary: {
          solid:
            'shadow-sm text-white dark:text-white bg-green-main hover:bg-green-light disabled:bg-green-dark dark:bg-green-main dark:hover:bg-green-light dark:disabled:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-light dark:focus-visible:outline-green-light hover:text-green-main hover:dark:text-green-main',
        },
      },
    }"
    size="md"
    class="group font-roboto text-base"
    block
  >
    <UIcon name="solar:wallet-outline" size="24" />
    {{ $t("connect_wallet") }}</UButton
  >
</template>
