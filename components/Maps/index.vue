<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Maps" @update:key="emit('update:key')">map</PhoneLayout>
</template>
