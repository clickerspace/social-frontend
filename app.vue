<script setup lang="ts">
let { fxController, isInitialized } = fxHandler();
onUnmounted(() => {
  if (isInitialized) {
    fxController?.destroy();
    isInitialized = false;
  }
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
