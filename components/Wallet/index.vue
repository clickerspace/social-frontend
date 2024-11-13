<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Wallet" @update:key="emit('update:key')">
    <WalletConnectButton />
  </PhoneLayout>
</template>
