<script setup lang="ts">
const emit = defineEmits(["update:key"]);
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";

const { cryptoToken } = storeToRefs(userStore());
</script>
<template>
  <PhoneLayout title="Wallet" @update:key="emit('update:key')">
    <WalletState />
    <div class="radial-bg flex flex-col gap-1 p-2">
      <span class="text-sm font-semibold">Your $CLKR</span>
      <div class="flex items-center">
        <img src="/icons/clicker.svg" alt="clicker" class="size-8" />
        <span>{{ cryptoToken ?? "0" }}</span>
      </div>
    </div>
  </PhoneLayout>
</template>
