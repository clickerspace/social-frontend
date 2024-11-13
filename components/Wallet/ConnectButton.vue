<script setup lang="ts">
import { TonConnectUI } from "@tonconnect/ui";

const { tonconnect } = useTonConnect();

const connect = async () => {
  await tonconnect.value?.openModal();
};
</script>
<template>
  <button
    @click="connect()"
    class="radial-bg flex h-12 items-center justify-center gap-2"
  >
    <UIcon name="solar:wallet-outline" size="24" />
    <span>Connect Wallet</span>
  </button>
</template>
