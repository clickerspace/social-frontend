<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Wallet" @update:key="emit('update:key')">
    <WalletState />
  </PhoneLayout>
</template>
