<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Market" @update:key="emit('update:key')"
    >market</PhoneLayout
  >
</template>
